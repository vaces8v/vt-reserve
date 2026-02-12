'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  BarChart3, Users, Clock, CheckCircle, XCircle, TrendingUp,
  Search, Filter, Trash2, MessageSquare, Mail, Phone,
  Settings, LogOut, ChevronLeft, ChevronRight, RefreshCw,
  Inbox, Calendar, Eye, Zap, ArrowUpRight, X, Copy, Check,
  AlertTriangle, ExternalLink, Shield, Bell,
} from 'lucide-react';
import { Drawer } from 'vaul';

type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: 'NEW' | 'IN_PROGRESS' | 'COMPLETED' | 'REJECTED';
  note: string;
  createdAt: string;
};

type Stats = {
  total: number;
  new: number;
  inProgress: number;
  completed: number;
  rejected: number;
  today: number;
  week: number;
  month: number;
  chart: { date: string; count: number }[];
  recentLeads: Lead[];
};

const STATUS_MAP: Record<string, { label: string; color: string; bg: string; dot: string; icon: typeof Inbox }> = {
  NEW: { label: 'Новая', color: 'text-blue-600', bg: 'bg-blue-50 border-blue-200', dot: 'bg-blue-500', icon: Zap },
  IN_PROGRESS: { label: 'В работе', color: 'text-amber-600', bg: 'bg-amber-50 border-amber-200', dot: 'bg-amber-500', icon: Clock },
  COMPLETED: { label: 'Завершена', color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-200', dot: 'bg-emerald-500', icon: CheckCircle },
  REJECTED: { label: 'Отклонена', color: 'text-red-500', bg: 'bg-red-50 border-red-200', dot: 'bg-red-500', icon: XCircle },
};

type Tab = 'dashboard' | 'leads' | 'settings';

export default function AdminPage() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>('dashboard');
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [headerVisible, setHeaderVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    fetch('/api/auth/me')
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => { setUser(d.user); setLoading(false); })
      .catch(() => router.push('/admin/login'));
  }, [router]);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setHeaderVisible(y < 10 || y < lastScrollY.current);
      lastScrollY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-[#DC2626]/30 border-t-[#DC2626] rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  const navItems = [
    { id: 'dashboard' as Tab, icon: BarChart3, label: 'Дашборд' },
    { id: 'leads' as Tab, icon: Inbox, label: 'Заявки' },
    { id: 'settings' as Tab, icon: Settings, label: 'Настройки' },
  ];

  return (
    <div className="min-h-screen bg-[#f8f8f8]">
      {/* Mobile header — auto-hides on scroll */}
      <header className={`md:hidden fixed top-0 left-0 right-0 h-12 bg-[#0c0c0c] border-b border-white/[0.06] flex items-center justify-center px-4 z-40 transition-transform ${headerVisible ? 'duration-300 translate-y-0' : 'duration-150 -translate-y-full'}`}>
        <span className="text-white font-bold text-sm">ВТ-Резерв</span>
      </header>

      {/* Desktop sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 bottom-0 w-[260px] bg-[#0c0c0c] text-white flex-col z-30 border-r border-white/[0.04]">
        {/* Logo */}
        <div className="p-5 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#DC2626] to-[#991b1b] rounded-xl flex items-center justify-center shadow-[0_4px_16px_rgba(220,38,38,0.3)]">
              <span className="text-white font-black text-lg">ВТ</span>
            </div>
            <div>
              <div className="font-bold text-[13px] text-white">ВТ-Резерв</div>
              <div className="text-[11px] text-gray-500 font-medium">Панель управления</div>
            </div>
          </div>
        </div>

        {/* Nav section label */}
        <div className="px-5 pt-3 pb-2">
          <span className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.15em]">Меню</span>
        </div>

        <nav className="flex-1 px-3 space-y-0.5">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200 ${tab === item.id
                ? 'bg-gradient-to-r from-[#DC2626] to-[#b91c1c] text-white shadow-[0_2px_12px_rgba(220,38,38,0.25)]'
                : 'text-gray-500 hover:text-white hover:bg-white/[0.04]'
                }`}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </nav>

        {/* User footer */}
        <div className="p-4 m-3 mt-0 bg-white/[0.03] rounded-xl border border-white/[0.05]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg flex items-center justify-center text-white text-xs font-bold">
              {user?.name?.charAt(0) || 'A'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-semibold text-white truncate">{user?.name}</div>
              <div className="text-[11px] text-gray-500">Администратор</div>
            </div>
            <button onClick={handleLogout} className="p-2 text-gray-600 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all" title="Выйти">
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-200 flex items-center justify-around z-40">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setTab(item.id)}
            className={`flex flex-col items-center gap-1 px-4 py-1.5 rounded-xl transition-all ${tab === item.id ? 'text-[#DC2626]' : 'text-gray-400'}`}
          >
            <item.icon size={20} />
            <span className="text-[10px] font-semibold">{item.label}</span>
          </button>
        ))}
        <button
          onClick={handleLogout}
          className="flex flex-col items-center gap-1 px-4 py-1.5 rounded-xl text-gray-400 transition-all"
        >
          <LogOut size={20} />
          <span className="text-[10px] font-semibold">Выход</span>
        </button>
      </nav>

      {/* Main content */}
      <main className="md:ml-[260px] pt-14 md:pt-0 pb-20 md:pb-0 p-4 md:p-8 min-h-screen">
        {tab === 'dashboard' && <Dashboard />}
        {tab === 'leads' && <LeadsPanel />}
        {tab === 'settings' && <SettingsPanel />}
      </main>
    </div>
  );
}

/* ==================== DASHBOARD ==================== */
function Dashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/stats')
      .then((r) => r.json())
      .then(setStats)
      .finally(() => setLoading(false));
  }, []);

  if (loading || !stats) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-[#DC2626]/30 border-t-[#DC2626] rounded-full animate-spin" />
      </div>
    );
  }

  const maxChart = Math.max(...stats.chart.map((c) => c.count), 1);

  const statCards = [
    { label: 'Всего заявок', value: stats.total, icon: Users, gradient: 'from-gray-500 to-gray-700', lightBg: 'bg-gray-50' },
    { label: 'Новые', value: stats.new, icon: Zap, gradient: 'from-blue-500 to-blue-700', lightBg: 'bg-blue-50' },
    { label: 'В работе', value: stats.inProgress, icon: Clock, gradient: 'from-amber-500 to-amber-700', lightBg: 'bg-amber-50' },
    { label: 'Завершены', value: stats.completed, icon: CheckCircle, gradient: 'from-emerald-500 to-emerald-700', lightBg: 'bg-emerald-50' },
  ];

  return (
    <div className="space-y-8 max-w-[1200px]">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Дашборд</h1>
        <p className="text-gray-400 text-sm mt-1">Аналитика и обзор заявок</p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {statCards.map((card) => (
          <div key={card.label} className="group bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center shadow-sm`}>
                <card.icon size={20} className="text-white" />
              </div>
              <ArrowUpRight size={16} className="text-gray-300 group-hover:text-gray-400 transition-colors" />
            </div>
            <div className="text-3xl font-bold text-gray-900 tracking-tight">{card.value}</div>
            <div className="text-sm text-gray-400 mt-1 font-medium">{card.label}</div>
          </div>
        ))}
      </div>

      {/* Period + Chart row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Period stats */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-sm font-semibold text-gray-900 mb-5 flex items-center gap-2">
            <Calendar size={16} className="text-[#DC2626]" />
            По периодам
          </h3>
          <div className="space-y-4">
            {[
              { label: 'Сегодня', value: stats.today, color: 'bg-[#DC2626]' },
              { label: 'За неделю', value: stats.week, color: 'bg-amber-500' },
              { label: 'За месяц', value: stats.month, color: 'bg-emerald-500' },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${item.color}`} />
                  <span className="text-sm text-gray-600">{item.label}</span>
                </div>
                <span className="text-lg font-bold text-gray-900">{item.value}</span>
              </div>
            ))}
          </div>

          {/* Conversion mini */}
          <div className="mt-6 pt-5 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">Отклонено</span>
              <span className="text-sm font-semibold text-red-500">{stats.rejected}</span>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
              <TrendingUp size={16} className="text-[#DC2626]" />
              Заявки за 30 дней
            </h3>
            <span className="text-xs text-gray-400 bg-gray-50 px-2.5 py-1 rounded-md font-medium">
              Макс: {maxChart}/день
            </span>
          </div>
          <div className="flex items-end gap-[3px] h-44">
            {stats.chart.map((day, i) => (
              <div key={day.date} className="flex-1 flex flex-col items-center justify-end h-full group relative">
                <div className="absolute -top-8 bg-[#1a1a1a] text-white text-[11px] px-2.5 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap pointer-events-none z-10 shadow-lg">
                  {new Date(day.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })}
                  <span className="font-bold ml-1">{day.count}</span>
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#1a1a1a] rotate-45" />
                </div>
                <div
                  className={`w-full rounded-md transition-all duration-200 cursor-pointer ${day.count > 0
                    ? 'bg-gradient-to-t from-[#DC2626] to-[#ef4444] hover:from-[#ef4444] hover:to-[#f87171] shadow-sm'
                    : 'bg-gray-100'
                    }`}
                  style={{
                    height: day.count > 0 ? `${Math.max((day.count / maxChart) * 100, 8)}%` : '4px',
                    opacity: day.count > 0 ? 0.6 + (i / stats.chart.length) * 0.4 : 1,
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent leads */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
            <Inbox size={16} className="text-[#DC2626]" />
            Последние заявки
          </h3>
        </div>
        <div className="divide-y divide-gray-50">
          {stats.recentLeads.map((lead) => (
            <div key={lead.id} className="flex items-center justify-between px-4 md:px-6 py-4 hover:bg-gray-50/50 transition-colors gap-3">
              <div className="flex items-center gap-3 md:gap-4 min-w-0">
                <div className="w-9 h-9 md:w-10 md:h-10 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center text-gray-600 font-bold text-xs md:text-sm shrink-0">
                  {lead.name.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <div className="font-semibold text-gray-900 text-sm truncate">{lead.name}</div>
                  <div className="text-gray-400 text-xs mt-0.5 truncate">{lead.email}</div>
                </div>
              </div>
              <div className="flex items-center gap-2 md:gap-4 shrink-0">
                <span className={`inline-flex items-center gap-1.5 text-[10px] md:text-xs px-2 md:px-2.5 py-1 rounded-lg border font-medium ${STATUS_MAP[lead.status].bg} ${STATUS_MAP[lead.status].color}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${STATUS_MAP[lead.status].dot}`} />
                  <span className="hidden sm:inline">{STATUS_MAP[lead.status].label}</span>
                </span>
                <span className="text-gray-300 text-xs font-medium hidden sm:block">
                  {new Date(lead.createdAt).toLocaleDateString('ru-RU')}
                </span>
              </div>
            </div>
          ))}
          {stats.recentLeads.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-gray-300">
              <Inbox size={40} className="mb-3" />
              <p className="text-sm font-medium">Заявок пока нет</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ==================== LEADS ==================== */
function LeadsPanel() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selected, setSelected] = useState<Lead | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({ page: String(page), limit: '15' });
    if (statusFilter !== 'ALL') params.set('status', statusFilter);
    if (search) params.set('search', search);

    const res = await fetch(`/api/leads?${params}`);
    const data = await res.json();
    setLeads(data.leads || []);
    setPages(data.pages || 1);
    setTotal(data.total || 0);
    setLoading(false);
  }, [page, statusFilter, search]);

  useEffect(() => { fetchLeads(); }, [fetchLeads, refreshKey]);

  const updateLead = async (id: string, data: Record<string, string>) => {
    await fetch(`/api/leads/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    setRefreshKey((k) => k + 1);
    if (selected?.id === id) {
      setSelected((prev) => prev ? { ...prev, ...data } : null);
    }
  };

  const deleteLead = async (id: string) => {
    if (!confirm('Удалить заявку? Это действие нельзя отменить.')) return;
    await fetch(`/api/leads/${id}`, { method: 'DELETE' });
    setSelected(null);
    setRefreshKey((k) => k + 1);
  };

  const statusTabs = [
    { key: 'ALL', label: 'Все', count: total },
    { key: 'NEW', label: 'Новые' },
    { key: 'IN_PROGRESS', label: 'В работе' },
    { key: 'COMPLETED', label: 'Завершены' },
    { key: 'REJECTED', label: 'Отклонены' },
  ];

  return (
    <div className="space-y-6 max-w-[1400px]">
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">Заявки</h1>
          <p className="text-gray-400 text-xs md:text-sm mt-1">Управление входящими заявками</p>
        </div>
        <button
          onClick={() => setRefreshKey((k) => k + 1)}
          className="flex items-center gap-2 px-3 md:px-4 py-2 md:py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm shrink-0"
        >
          <RefreshCw size={15} />
          <span className="hidden sm:inline">Обновить</span>
        </button>
      </div>

      {/* Status tabs */}
      <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide">
        <div className="flex items-center gap-1 bg-white p-1.5 rounded-xl border border-gray-100 shadow-sm w-fit">
          {statusTabs.map((t) => (
            <button
              key={t.key}
              onClick={() => { setStatusFilter(t.key); setPage(1); }}
              className={`px-3 md:px-4 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${statusFilter === t.key
                ? 'bg-[#1a1a1a] text-white shadow-sm'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
            >
              {t.label}
              {t.count !== undefined && <span className="ml-1.5 text-[10px] opacity-60">{t.count}</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
        <input
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          placeholder="Поиск по имени, email, телефону..."
          className="w-full max-w-lg pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#DC2626]/15 focus:border-[#DC2626]/30 text-gray-800 shadow-sm placeholder:text-gray-300"
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Table (desktop) / Cards (mobile) */}
        <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center h-80">
              <div className="w-7 h-7 border-2 border-[#DC2626]/30 border-t-[#DC2626] rounded-full animate-spin" />
            </div>
          ) : leads.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-80 text-gray-300">
              <Inbox size={48} strokeWidth={1.5} className="mb-4" />
              <p className="font-medium text-sm">Заявок не найдено</p>
              <p className="text-xs mt-1">Попробуйте изменить фильтры</p>
            </div>
          ) : (
            <>
              {/* Desktop table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left px-5 py-3.5 font-semibold text-[11px] text-gray-400 uppercase tracking-wider">Клиент</th>
                      <th className="text-left px-5 py-3.5 font-semibold text-[11px] text-gray-400 uppercase tracking-wider">Контакты</th>
                      <th className="text-left px-5 py-3.5 font-semibold text-[11px] text-gray-400 uppercase tracking-wider">Статус</th>
                      <th className="text-left px-5 py-3.5 font-semibold text-[11px] text-gray-400 uppercase tracking-wider">Дата</th>
                      <th className="w-14"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {leads.map((lead) => (
                      <tr
                        key={lead.id}
                        onClick={() => setSelected(lead)}
                        className={`cursor-pointer transition-all duration-150 ${selected?.id === lead.id
                          ? 'bg-[#DC2626]/[0.03] border-l-2 border-l-[#DC2626]'
                          : 'hover:bg-gray-50/70 border-l-2 border-l-transparent'
                          }`}
                      >
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center text-gray-600 font-bold text-xs">
                              {lead.name.charAt(0).toUpperCase()}
                            </div>
                            <span className="font-semibold text-gray-900 text-[13px]">{lead.name}</span>
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <div className="text-gray-600 flex items-center gap-1.5 text-[13px]"><Mail size={13} className="text-gray-300" />{lead.email}</div>
                          {lead.phone && <div className="text-gray-400 flex items-center gap-1.5 mt-1 text-xs"><Phone size={12} className="text-gray-300" />{lead.phone}</div>}
                        </td>
                        <td className="px-5 py-4">
                          <span className={`inline-flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-lg border font-semibold ${STATUS_MAP[lead.status].bg} ${STATUS_MAP[lead.status].color}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${STATUS_MAP[lead.status].dot}`} />
                            {STATUS_MAP[lead.status].label}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-gray-400 text-xs">
                          <div className="font-medium">{new Date(lead.createdAt).toLocaleDateString('ru-RU')}</div>
                          <div className="mt-0.5">{new Date(lead.createdAt).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}</div>
                        </td>
                        <td className="px-3 py-4">
                          <button onClick={(e) => { e.stopPropagation(); setSelected(lead); }} className="p-2 text-gray-300 hover:text-[#DC2626] hover:bg-[#DC2626]/5 rounded-lg transition-all">
                            <Eye size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile cards */}
              <div className="md:hidden divide-y divide-gray-100">
                {leads.map((lead) => (
                  <div
                    key={lead.id}
                    onClick={() => setSelected(lead)}
                    className={`p-4 cursor-pointer transition-all ${selected?.id === lead.id ? 'bg-[#DC2626]/[0.03] border-l-2 border-l-[#DC2626]' : 'border-l-2 border-l-transparent active:bg-gray-50'}`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center text-gray-600 font-bold text-sm shrink-0">
                          {lead.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <div className="font-semibold text-gray-900 text-sm truncate">{lead.name}</div>
                          <div className="text-gray-400 text-xs mt-0.5 truncate">{lead.email}</div>
                        </div>
                      </div>
                      <span className={`inline-flex items-center gap-1.5 text-[10px] px-2 py-1 rounded-lg border font-semibold shrink-0 ${STATUS_MAP[lead.status].bg} ${STATUS_MAP[lead.status].color}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${STATUS_MAP[lead.status].dot}`} />
                        {STATUS_MAP[lead.status].label}
                      </span>
                    </div>
                    {lead.message && (
                      <p className="text-xs text-gray-400 mt-2 line-clamp-2 pl-[52px]">{lead.message}</p>
                    )}
                    <div className="flex items-center justify-between mt-2 pl-[52px]">
                      <span className="text-[11px] text-gray-300">{new Date(lead.createdAt).toLocaleString('ru-RU', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</span>
                      {lead.phone && <span className="text-[11px] text-gray-400 flex items-center gap-1"><Phone size={11} />{lead.phone}</span>}
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between px-4 md:px-5 py-3.5 border-t border-gray-100 bg-gray-50/50">
                <span className="text-xs text-gray-400 font-medium">Стр. {page}/{pages} • {total}</span>
                <div className="flex gap-1">
                  <button disabled={page <= 1} onClick={() => setPage(page - 1)} className="p-2 rounded-lg hover:bg-white disabled:opacity-20 transition-all border border-transparent hover:border-gray-200">
                    <ChevronLeft size={16} />
                  </button>
                  <button disabled={page >= pages} onClick={() => setPage(page + 1)} className="p-2 rounded-lg hover:bg-white disabled:opacity-20 transition-all border border-transparent hover:border-gray-200">
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Desktop detail panel */}
        {selected && (
          <div className="hidden lg:block w-[380px] shrink-0 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden h-fit sticky top-8">
            <LeadDetail lead={selected} onClose={() => setSelected(null)} onUpdate={updateLead} onDelete={deleteLead} />
          </div>
        )}

        {/* Mobile bottom sheet via vaul */}
        <Drawer.Root open={!!selected} onOpenChange={(open) => { if (!open) setSelected(null); }}>
          <Drawer.Portal>
            <Drawer.Overlay className="fixed inset-0 bg-black/40 z-50 lg:hidden" />
            <Drawer.Content className="fixed bottom-0 left-0 right-0 z-50 lg:hidden outline-none">
              <div className="bg-white rounded-t-2xl max-h-[85vh] overflow-y-auto">
                <div className="flex justify-center pt-3 pb-1">
                  <div className="w-10 h-1 rounded-full bg-gray-300" />
                </div>
                {selected && (
                  <LeadDetail lead={selected} onClose={() => setSelected(null)} onUpdate={updateLead} onDelete={deleteLead} />
                )}
              </div>
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      </div>
    </div>
  );
}

function LeadDetail({ lead, onClose, onUpdate, onDelete }: { lead: Lead; onClose: () => void; onUpdate: (id: string, data: Record<string, string>) => void; onDelete: (id: string) => void }) {
  return (
    <>
      <div className="px-5 py-4 bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-white font-bold text-sm">
            {lead.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="text-white font-semibold text-sm">{lead.name}</div>
            <div className="text-gray-400 text-xs">{new Date(lead.createdAt).toLocaleString('ru-RU')}</div>
          </div>
        </div>
        <button onClick={onClose} className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all hidden lg:block">
          <X size={16} />
        </button>
      </div>

      <div className="p-5 space-y-5">
        <div className="space-y-3">
          <a href={`mailto:${lead.email}`} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group">
            <Mail size={16} className="text-gray-400 group-hover:text-[#DC2626] transition-colors" />
            <span className="text-sm text-gray-700 font-medium truncate">{lead.email}</span>
          </a>
          {lead.phone && (
            <a href={`tel:${lead.phone}`} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group">
              <Phone size={16} className="text-gray-400 group-hover:text-[#DC2626] transition-colors" />
              <span className="text-sm text-gray-700 font-medium">{lead.phone}</span>
            </a>
          )}
        </div>

        {lead.message && (
          <div>
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em] mb-2">Сообщение</div>
            <div className="text-sm text-gray-600 bg-gray-50 p-4 rounded-xl leading-relaxed flex items-start gap-2.5">
              <MessageSquare size={15} className="text-gray-300 mt-0.5 shrink-0" />
              {lead.message}
            </div>
          </div>
        )}

        <div>
          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em] mb-3">Статус</div>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(STATUS_MAP).map(([key, val]) => {
              const Icon = val.icon;
              return (
                <button
                  key={key}
                  onClick={() => onUpdate(lead.id, { status: key })}
                  className={`flex items-center gap-2 text-xs px-3 py-2.5 rounded-xl border transition-all duration-200 ${lead.status === key
                    ? `${val.bg} ${val.color} font-bold shadow-sm`
                    : 'border-gray-150 text-gray-400 hover:border-gray-250 hover:text-gray-600 bg-white'
                    }`}
                >
                  <Icon size={14} />
                  {val.label}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em] mb-2">Заметка</div>
          <textarea
            key={lead.id}
            defaultValue={lead.note}
            onBlur={(e) => onUpdate(lead.id, { note: e.target.value })}
            placeholder="Добавьте заметку..."
            className="w-full p-3.5 bg-gray-50 border-0 rounded-xl text-sm resize-none h-24 focus:outline-none focus:ring-2 focus:ring-[#DC2626]/15 text-gray-700 placeholder:text-gray-300"
          />
        </div>

        <button
          onClick={() => onDelete(lead.id)}
          className="w-full flex items-center justify-center gap-2 text-red-400 hover:text-red-500 hover:bg-red-50 py-2.5 rounded-xl text-xs font-medium transition-all border border-transparent hover:border-red-100"
        >
          <Trash2 size={14} />
          Удалить заявку
        </button>
      </div>
    </>
  );
}

/* ==================== SETTINGS ==================== */
function SettingsPanel() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [openGuide, setOpenGuide] = useState<'gmail' | 'yandex' | 'mailru' | null>(null);

  useEffect(() => {
    fetch('/api/settings')
      .then((r) => r.json())
      .then((d) => { setSettings(d.settings || {}); setLoading(false); });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    await fetch('/api/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const applyPreset = (preset: 'gmail' | 'yandex' | 'mailru') => {
    if (preset === 'gmail') {
      setSettings((s) => ({ ...s, smtp_host: 'smtp.gmail.com', smtp_port: '587' }));
    } else if (preset === 'yandex') {
      setSettings((s) => ({ ...s, smtp_host: 'smtp.yandex.ru', smtp_port: '465' }));
    } else {
      setSettings((s) => ({ ...s, smtp_host: 'smtp.mail.ru', smtp_port: '465' }));
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-[#DC2626]/30 border-t-[#DC2626] rounded-full animate-spin" />
      </div>
    );
  }

  const fields = [
    { key: 'notification_email', label: 'Email для уведомлений', placeholder: 'admin@example.com', type: 'email', desc: 'На этот адрес будут приходить уведомления о новых заявках' },
    { key: 'smtp_host', label: 'SMTP Хост', placeholder: 'smtp.gmail.com', type: 'text', desc: '' },
    { key: 'smtp_port', label: 'SMTP Порт', placeholder: '587', type: 'text', desc: '' },
    { key: 'smtp_user', label: 'SMTP Логин', placeholder: 'your-email@gmail.com', type: 'text', desc: '' },
    { key: 'smtp_pass', label: 'SMTP Пароль', placeholder: '••••••••', type: 'password', desc: 'Используйте пароль приложения, а не основной пароль' },
    { key: 'smtp_from', label: 'Имя отправителя (From)', placeholder: 'ВТ-Резерв <noreply@vt-reserve.ru>', type: 'text', desc: '' },
  ];

  return (
    <div className="max-w-3xl space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Настройки</h1>
        <p className="text-gray-400 text-sm mt-1">Конфигурация уведомлений и SMTP</p>
      </div>

      {/* Quick presets */}
      <div className="flex flex-wrap gap-2 md:gap-3">
        <button
          onClick={() => applyPreset('gmail')}
          className="flex items-center gap-2.5 px-5 py-3 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:border-[#DC2626]/30 hover:shadow-sm transition-all"
        >
          <div className="w-6 h-6 bg-red-100 rounded-md flex items-center justify-center text-red-600 text-[10px] font-black">G</div>
          Применить Gmail
        </button>
        <button
          onClick={() => applyPreset('yandex')}
          className="flex items-center gap-2.5 px-5 py-3 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:border-[#DC2626]/30 hover:shadow-sm transition-all"
        >
          <div className="w-6 h-6 bg-amber-100 rounded-md flex items-center justify-center text-amber-600 text-[10px] font-black">Я</div>
          Применить Яндекс
        </button>
        <button
          onClick={() => applyPreset('mailru')}
          className="flex items-center gap-2.5 px-5 py-3 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:border-[#DC2626]/30 hover:shadow-sm transition-all"
        >
          <div className="w-6 h-6 bg-blue-100 rounded-md flex items-center justify-center text-blue-600 text-[10px] font-black">M</div>
          Применить Mail.ru
        </button>
      </div>

      {/* SMTP Form */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 flex items-center gap-3">
          <div className="w-9 h-9 bg-[#DC2626]/10 rounded-xl flex items-center justify-center">
            <Bell size={18} className="text-[#DC2626]" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 text-sm">Email-уведомления</h3>
            <p className="text-gray-400 text-xs mt-0.5">Настройте SMTP для отправки уведомлений при новых заявках</p>
          </div>
        </div>

        <div className="p-6 space-y-5">
          {fields.map((f) => (
            <div key={f.key}>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">{f.label}</label>
              <input
                type={f.type}
                value={settings[f.key] || ''}
                onChange={(e) => setSettings((s) => ({ ...s, [f.key]: e.target.value }))}
                placeholder={f.placeholder}
                className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#DC2626]/15 focus:bg-white focus:shadow-sm transition-all text-gray-800 placeholder:text-gray-300"
              />
              {f.desc && <p className="text-[11px] text-gray-400 mt-1.5 ml-1">{f.desc}</p>}
            </div>
          ))}
        </div>

        <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100 flex items-center gap-3">
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2.5 bg-gradient-to-r from-[#DC2626] to-[#b91c1c] text-white rounded-xl font-semibold text-sm hover:from-[#ef4444] hover:to-[#DC2626] transition-all disabled:opacity-40 shadow-[0_2px_12px_rgba(220,38,38,0.2)]"
          >
            {saving ? 'Сохранение...' : 'Сохранить настройки'}
          </button>
          {saved && (
            <span className="text-emerald-600 text-sm flex items-center gap-1.5 font-medium animate-[fadeIn_0.3s_ease-in]">
              <CheckCircle size={16} />
              Сохранено!
            </span>
          )}
        </div>
      </div>

      {/* Gmail Guide */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <button
          onClick={() => setOpenGuide(openGuide === 'gmail' ? null : 'gmail')}
          className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50/50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center">
              <span className="text-red-600 font-black text-sm">G</span>
            </div>
            <div className="text-left">
              <h4 className="font-semibold text-gray-900 text-sm">Gmail SMTP (бесплатно)</h4>
              <p className="text-gray-400 text-xs mt-0.5">До 500 писем/день для обычных аккаунтов</p>
            </div>
          </div>
          <ChevronRight size={18} className={`text-gray-300 transition-transform ${openGuide === 'gmail' ? 'rotate-90' : ''}`} />
        </button>

        {openGuide === 'gmail' && (
          <div className="px-6 pb-6 border-t border-gray-100 pt-5 space-y-4">
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3">
              <AlertTriangle size={18} className="text-amber-600 shrink-0 mt-0.5" />
              <div className="text-amber-800 text-sm">
                <span className="font-semibold">Важно:</span> Для работы SMTP нужен <strong>пароль приложения</strong>, а не обычный пароль от Gmail. Обычный не подойдёт.
              </div>
            </div>

            <h5 className="font-semibold text-gray-900 text-sm">Пошаговая инструкция:</h5>
            <ol className="space-y-3 text-sm text-gray-600">
              <li className="flex gap-3">
                <span className="w-6 h-6 bg-[#DC2626] text-white rounded-lg flex items-center justify-center text-xs font-bold shrink-0">1</span>
                <div>Включите <strong>двухфакторную аутентификацию</strong> в настройках Google аккаунта</div>
              </li>
              <li className="flex gap-3">
                <span className="w-6 h-6 bg-[#DC2626] text-white rounded-lg flex items-center justify-center text-xs font-bold shrink-0">2</span>
                <div>
                  Перейдите на страницу{' '}
                  <a href="https://myaccount.google.com/apppasswords" target="_blank" rel="noopener noreferrer" className="text-[#DC2626] font-medium hover:underline inline-flex items-center gap-0.5">
                    App Passwords <ExternalLink size={12} />
                  </a>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="w-6 h-6 bg-[#DC2626] text-white rounded-lg flex items-center justify-center text-xs font-bold shrink-0">3</span>
                <div>Создайте новый пароль приложения (название любое, например «VT-Reserve»)</div>
              </li>
              <li className="flex gap-3">
                <span className="w-6 h-6 bg-[#DC2626] text-white rounded-lg flex items-center justify-center text-xs font-bold shrink-0">4</span>
                <div>Скопируйте сгенерированный <strong>16-символьный пароль</strong></div>
              </li>
            </ol>

            <div className="bg-gray-50 rounded-xl p-4 space-y-2">
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Параметры для Gmail</div>
              <SmtpParam label="SMTP Хост" value="smtp.gmail.com" />
              <SmtpParam label="SMTP Порт" value="587" />
              <SmtpParam label="SMTP Логин" value="ваш-email@gmail.com" />
              <SmtpParam label="SMTP Пароль" value="xxxx xxxx xxxx xxxx (App Password)" />
            </div>
          </div>
        )}
      </div>

      {/* Yandex Guide */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <button
          onClick={() => setOpenGuide(openGuide === 'yandex' ? null : 'yandex')}
          className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50/50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center">
              <span className="text-amber-600 font-black text-sm">Я</span>
            </div>
            <div className="text-left">
              <h4 className="font-semibold text-gray-900 text-sm">Яндекс SMTP (бесплатно)</h4>
              <p className="text-gray-400 text-xs mt-0.5">До 500 писем/день для Яндекс Почты</p>
            </div>
          </div>
          <ChevronRight size={18} className={`text-gray-300 transition-transform ${openGuide === 'yandex' ? 'rotate-90' : ''}`} />
        </button>

        {openGuide === 'yandex' && (
          <div className="px-6 pb-6 border-t border-gray-100 pt-5 space-y-4">
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex gap-3">
              <Shield size={18} className="text-red-600 shrink-0 mt-0.5" />
              <div className="text-red-800 text-sm">
                <strong>⚠️ Важно! Без этого шага будет ошибка «does not have access rights».</strong><br />
                Сначала включите IMAP/SMTP в Яндекс Почте:{' '}
                <a href="https://mail.yandex.ru/#setup/client" target="_blank" rel="noopener noreferrer" className="font-medium underline inline-flex items-center gap-0.5">
                  Настройки → Все настройки → Почтовые программы <ExternalLink size={12} />
                </a>
                <br />
                Поставьте галочку <strong>«С сервера imap.yandex.ru по протоколу IMAP»</strong> и сохраните.
              </div>
            </div>

            <h5 className="font-semibold text-gray-900 text-sm">Пошаговая инструкция:</h5>
            <ol className="space-y-3 text-sm text-gray-600">
              <li className="flex gap-3">
                <span className="w-6 h-6 bg-amber-500 text-white rounded-lg flex items-center justify-center text-xs font-bold shrink-0">1</span>
                <div>
                  Включите IMAP/SMTP:{' '}
                  <a href="https://mail.yandex.ru/#setup/client" target="_blank" rel="noopener noreferrer" className="text-[#DC2626] font-medium hover:underline inline-flex items-center gap-0.5">
                    Почтовые программы <ExternalLink size={12} />
                  </a>
                  {' '}→ галочка «IMAP» → Сохранить
                </div>
              </li>
              <li className="flex gap-3">
                <span className="w-6 h-6 bg-amber-500 text-white rounded-lg flex items-center justify-center text-xs font-bold shrink-0">2</span>
                <div>
                  Перейдите в{' '}
                  <a href="https://id.yandex.ru/security" target="_blank" rel="noopener noreferrer" className="text-[#DC2626] font-medium hover:underline inline-flex items-center gap-0.5">
                    Настройки безопасности <ExternalLink size={12} />
                  </a>
                  {' '}и включите <strong>двухфакторную аутентификацию</strong>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="w-6 h-6 bg-amber-500 text-white rounded-lg flex items-center justify-center text-xs font-bold shrink-0">3</span>
                <div>
                  Создайте{' '}
                  <a href="https://id.yandex.ru/security/app-passwords" target="_blank" rel="noopener noreferrer" className="text-[#DC2626] font-medium hover:underline inline-flex items-center gap-0.5">
                    пароль приложения <ExternalLink size={12} />
                  </a>{' '}
                  с типом <strong>«Почта»</strong>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="w-6 h-6 bg-amber-500 text-white rounded-lg flex items-center justify-center text-xs font-bold shrink-0">4</span>
                <div>Скопируйте пароль и вставьте в поле <strong>SMTP Пароль</strong> выше</div>
              </li>
            </ol>

            <div className="bg-gray-50 rounded-xl p-4 space-y-2">
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Параметры для Яндекс</div>
              <SmtpParam label="SMTP Хост" value="smtp.yandex.ru" />
              <SmtpParam label="SMTP Порт" value="465" />
              <SmtpParam label="SMTP Логин" value="ваш-email@yandex.ru" />
              <SmtpParam label="SMTP Пароль" value="пароль приложения" />
            </div>
          </div>
        )}
      </div>
      {/* Mail.ru Guide */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <button
          onClick={() => setOpenGuide(openGuide === 'mailru' ? null : 'mailru')}
          className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50/50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
              <span className="text-blue-600 font-black text-sm">M</span>
            </div>
            <div className="text-left">
              <h4 className="font-semibold text-gray-900 text-sm">Mail.ru SMTP (бесплатно)</h4>
              <p className="text-gray-400 text-xs mt-0.5">Для почты @mail.ru, @inbox.ru, @list.ru, @bk.ru</p>
            </div>
          </div>
          <ChevronRight size={18} className={`text-gray-300 transition-transform ${openGuide === 'mailru' ? 'rotate-90' : ''}`} />
        </button>

        {openGuide === 'mailru' && (
          <div className="px-6 pb-6 border-t border-gray-100 pt-5 space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex gap-3">
              <Shield size={18} className="text-blue-600 shrink-0 mt-0.5" />
              <div className="text-blue-800 text-sm">
                <strong>Важно!</strong> Для Mail.ru нужен <strong>пароль приложения</strong>. Обычный пароль от почты не подойдёт.
              </div>
            </div>

            <h5 className="font-semibold text-gray-900 text-sm">Пошаговая инструкция:</h5>
            <ol className="space-y-3 text-sm text-gray-600">
              <li className="flex gap-3">
                <span className="w-6 h-6 bg-blue-500 text-white rounded-lg flex items-center justify-center text-xs font-bold shrink-0">1</span>
                <div>
                  Перейдите в{' '}
                  <a href="https://account.mail.ru/user/2-step-auth/passwords/" target="_blank" rel="noopener noreferrer" className="text-[#DC2626] font-medium hover:underline inline-flex items-center gap-0.5">
                    Пароли приложений <ExternalLink size={12} />
                  </a>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="w-6 h-6 bg-blue-500 text-white rounded-lg flex items-center justify-center text-xs font-bold shrink-0">2</span>
                <div>Если двухфакторная аутентификация не включена — включите её на{' '}
                  <a href="https://account.mail.ru/user/2-step-auth/" target="_blank" rel="noopener noreferrer" className="text-[#DC2626] font-medium hover:underline inline-flex items-center gap-0.5">
                    странице безопасности <ExternalLink size={12} />
                  </a>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="w-6 h-6 bg-blue-500 text-white rounded-lg flex items-center justify-center text-xs font-bold shrink-0">3</span>
                <div>Нажмите <strong>«Добавить»</strong> → введите название (например «VT-Reserve») → нажмите <strong>«Создать»</strong></div>
              </li>
              <li className="flex gap-3">
                <span className="w-6 h-6 bg-blue-500 text-white rounded-lg flex items-center justify-center text-xs font-bold shrink-0">4</span>
                <div>Скопируйте сгенерированный пароль и вставьте в поле <strong>SMTP Пароль</strong> выше</div>
              </li>
            </ol>

            <div className="bg-gray-50 rounded-xl p-4 space-y-2">
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Параметры для Mail.ru</div>
              <SmtpParam label="SMTP Хост" value="smtp.mail.ru" />
              <SmtpParam label="SMTP Порт" value="465" />
              <SmtpParam label="SMTP Логин" value="ваш-email@mail.ru" />
              <SmtpParam label="SMTP Пароль" value="пароль приложения" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* Helper: SMTP param row with copy */
function SmtpParam({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);
  const copyValue = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="flex items-center justify-between py-1.5">
      <div>
        <span className="text-xs text-gray-400">{label}:</span>
        <span className="text-sm text-gray-700 font-mono ml-2">{value}</span>
      </div>
      <button onClick={copyValue} className="p-1.5 text-gray-300 hover:text-gray-600 hover:bg-white rounded-md transition-all" title="Копировать">
        {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
      </button>
    </div>
  );
}
