import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Не авторизован' }, { status: 401 });
  }

  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const weekStart = new Date(todayStart);
  weekStart.setDate(weekStart.getDate() - 7);
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

  const [total, newCount, inProgress, completed, rejected, today, week, month, recentLeads] =
    await Promise.all([
      prisma.lead.count(),
      prisma.lead.count({ where: { status: 'NEW' } }),
      prisma.lead.count({ where: { status: 'IN_PROGRESS' } }),
      prisma.lead.count({ where: { status: 'COMPLETED' } }),
      prisma.lead.count({ where: { status: 'REJECTED' } }),
      prisma.lead.count({ where: { createdAt: { gte: todayStart } } }),
      prisma.lead.count({ where: { createdAt: { gte: weekStart } } }),
      prisma.lead.count({ where: { createdAt: { gte: monthStart } } }),
      prisma.lead.findMany({ orderBy: { createdAt: 'desc' }, take: 5 }),
    ]);

  // Last 30 days chart data
  const thirtyDaysAgo = new Date(todayStart);
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const dailyLeads = await prisma.lead.groupBy({
    by: ['createdAt'],
    where: { createdAt: { gte: thirtyDaysAgo } },
    _count: true,
  });

  // Aggregate by day
  const chartData: Record<string, number> = {};
  for (let i = 0; i < 30; i++) {
    const d = new Date(todayStart);
    d.setDate(d.getDate() - (29 - i));
    chartData[d.toISOString().split('T')[0]] = 0;
  }
  dailyLeads.forEach((entry) => {
    const day = new Date(entry.createdAt).toISOString().split('T')[0];
    if (chartData[day] !== undefined) {
      chartData[day] += entry._count;
    }
  });

  const chart = Object.entries(chartData).map(([date, count]) => ({ date, count }));

  return NextResponse.json({
    total,
    new: newCount,
    inProgress,
    completed,
    rejected,
    today,
    week,
    month,
    chart,
    recentLeads,
  });
}
