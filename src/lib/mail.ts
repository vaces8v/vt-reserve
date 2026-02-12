import nodemailer from 'nodemailer';
import { prisma } from './prisma';

async function getMailSettings() {
  const settings = await prisma.settings.findMany({
    where: {
      key: {
        in: [
          'smtp_host',
          'smtp_port',
          'smtp_user',
          'smtp_pass',
          'smtp_from',
          'notification_email',
        ],
      },
    },
  });

  const map: Record<string, string> = {};
  settings.forEach((s: { key: string; value: string }) => (map[s.key] = s.value));
  return map;
}

export async function sendLeadNotification(lead: {
  name: string;
  email: string;
  phone: string;
  message: string;
}) {
  const settings = await getMailSettings();

  const { smtp_host, smtp_port, smtp_user, smtp_pass, smtp_from, notification_email } = settings;

  if (!smtp_host || !smtp_user || !smtp_pass || !notification_email) {
    console.log('[Mail] SMTP not configured, skipping notification');
    return;
  }

  const port = parseInt(smtp_port || '587');
  const isSecure = port === 465;

  console.log(`[Mail] Connecting to ${smtp_host}:${port} (secure=${isSecure}) as ${smtp_user}`);

  const transporter = nodemailer.createTransport({
    host: smtp_host,
    port,
    secure: isSecure,
    auth: {
      user: smtp_user,
      pass: smtp_pass,
    },
    ...((smtp_host.includes('yandex') || smtp_host.includes('mail.ru')) && {
      tls: { rejectUnauthorized: false },
    }),
  });

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #DC2626; color: white; padding: 20px; text-align: center;">
        <h1 style="margin: 0; font-size: 24px;">Новая заявка на сайте</h1>
      </div>
      <div style="padding: 24px; background: #f9f9f9;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #333; width: 120px;">Имя:</td>
            <td style="padding: 8px 0; color: #555;">${lead.name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #333;">Email:</td>
            <td style="padding: 8px 0; color: #555;">${lead.email}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #333;">Телефон:</td>
            <td style="padding: 8px 0; color: #555;">${lead.phone || '—'}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #333; vertical-align: top;">Сообщение:</td>
            <td style="padding: 8px 0; color: #555;">${lead.message || '—'}</td>
          </tr>
        </table>
      </div>
      <div style="padding: 16px; text-align: center; color: #999; font-size: 12px;">
        ВТ-Резерв • Автоматическое уведомление
      </div>
    </div>
  `;

  // Yandex & Mail.ru require From address to match the authenticated user
  let fromAddress = smtp_from || smtp_user;
  if (smtp_host.includes('yandex') || smtp_host.includes('mail.ru')) {
    const nameMatch = smtp_from?.match(/^(.+?)\s*<.*>$/);
    fromAddress = nameMatch ? `${nameMatch[1]} <${smtp_user}>` : smtp_user;
  }

  console.log(`[Mail] Sending from: ${fromAddress} to: ${notification_email}`);

  await transporter.sendMail({
    from: fromAddress,
    to: notification_email,
    subject: `Новая заявка от ${lead.name}`,
    html,
  });
}
