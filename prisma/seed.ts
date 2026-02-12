import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create default admin user
  const hashedPassword = await bcrypt.hash('admin123', 12);

  await prisma.user.upsert({
    where: { login: 'admin' },
    update: {},
    create: {
      login: 'admin',
      password: hashedPassword,
      name: 'Администратор',
    },
  });

  // Create default settings
  const defaults: Record<string, string> = {
    notification_email: 'vtreserve0@gmail.com',
    smtp_host: '',
    smtp_port: '587',
    smtp_user: '',
    smtp_pass: '',
    smtp_from: '',
  };

  for (const [key, value] of Object.entries(defaults)) {
    await prisma.settings.upsert({
      where: { key },
      update: {},
      create: { key, value },
    });
  }

  console.log('✅ Seed completed: admin/admin123');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
