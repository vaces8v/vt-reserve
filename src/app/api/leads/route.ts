import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { sendLeadNotification } from '@/lib/mail';

// POST - create lead (public)
export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, message } = await req.json();

    if (!name || !email) {
      return NextResponse.json({ error: 'Имя и email обязательны' }, { status: 400 });
    }

    const lead = await prisma.lead.create({
      data: { name, email, phone: phone || '', message: message || '' },
    });

    // Send email notification (non-blocking)
    sendLeadNotification({ name, email, phone: phone || '', message: message || '' }).catch((err) =>
      console.error('[Mail] Failed to send notification:', err)
    );

    return NextResponse.json({ success: true, id: lead.id });
  } catch {
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
  }
}

// GET - list leads (admin only)
export async function GET(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Не авторизован' }, { status: 401 });
  }

  const url = new URL(req.url);
  const page = parseInt(url.searchParams.get('page') || '1');
  const limit = parseInt(url.searchParams.get('limit') || '20');
  const status = url.searchParams.get('status');
  const search = url.searchParams.get('search');

  const where: Record<string, unknown> = {};
  if (status && status !== 'ALL') {
    where.status = status;
  }
  if (search) {
    where.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { email: { contains: search, mode: 'insensitive' } },
      { phone: { contains: search, mode: 'insensitive' } },
      { message: { contains: search, mode: 'insensitive' } },
    ];
  }

  const [leads, total] = await Promise.all([
    prisma.lead.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.lead.count({ where }),
  ]);

  return NextResponse.json({ leads, total, page, limit, pages: Math.ceil(total / limit) });
}
