import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

// PATCH - update lead status/note (admin only)
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Не авторизован' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await req.json();
    const { status, note } = body;

    const data: Record<string, unknown> = {};
    if (status) data.status = status;
    if (note !== undefined) data.note = note;

    const lead = await prisma.lead.update({ where: { id }, data });
    return NextResponse.json({ lead });
  } catch {
    return NextResponse.json({ error: 'Заявка не найдена' }, { status: 404 });
  }
}

// DELETE - delete lead (admin only)
export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Не авторизован' }, { status: 401 });
  }

  try {
    const { id } = await params;
    await prisma.lead.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Заявка не найдена' }, { status: 404 });
  }
}
