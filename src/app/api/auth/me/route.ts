import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Не авторизован' }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { id: true, login: true, name: true },
  });

  if (!user) {
    return NextResponse.json({ error: 'Пользователь не найден' }, { status: 401 });
  }

  return NextResponse.json({ user });
}
