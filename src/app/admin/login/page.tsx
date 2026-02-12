'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, User, ArrowRight, AlertCircle, Eye, EyeOff, Shield } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Ошибка авторизации');
        return;
      }

      router.push('/admin');
    } catch {
      setError('Ошибка соединения с сервером');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden bg-[#0a0a0a]">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#DC2626]/8 via-transparent to-[#DC2626]/5" />
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#DC2626]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-[#DC2626]/8 rounded-full blur-[100px]" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div
        className={`w-full max-w-[420px] relative z-10 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
      >
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-white text-2xl font-bold tracking-tight">ВТ-Резерв</h1>
          <p className="text-gray-500 text-sm mt-1.5">Панель управления</p>
        </div>

        {/* Card */}
        <div className="bg-[#141414] border border-white/[0.06] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] backdrop-blur-xl overflow-hidden">
          <div className="p-8">
            <div className="flex items-center gap-2 mb-6">
              <Shield size={18} className="text-[#DC2626]" />
              <span className="text-gray-400 text-sm font-medium">Авторизация</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="flex items-center gap-2.5 p-3.5 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm animate-[shake_0.3s_ease-in-out]">
                  <AlertCircle size={18} className="shrink-0" />
                  {error}
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2.5">Логин</label>
                <div className="relative group">
                  <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-[#DC2626] transition-colors" />
                  <input
                    type="text"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    placeholder="admin"
                    autoComplete="username"
                    className="w-full pl-12 pr-4 py-3.5 bg-white/[0.04] border border-white/[0.08] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#DC2626]/30 focus:border-[#DC2626]/50 focus:bg-white/[0.06] transition-all text-white placeholder:text-gray-600 text-sm"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2.5">Пароль</label>
                <div className="relative group">
                  <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-[#DC2626] transition-colors" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    className="w-full pl-12 pr-12 py-3.5 bg-white/[0.04] border border-white/[0.08] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#DC2626]/30 focus:border-[#DC2626]/50 focus:bg-white/[0.06] transition-all text-white placeholder:text-gray-600 text-sm"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-400 transition-colors"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#DC2626] to-[#b91c1c] text-white py-3.5 rounded-xl font-semibold text-sm hover:from-[#ef4444] hover:to-[#DC2626] transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-[0_4px_20px_rgba(220,38,38,0.3)] hover:shadow-[0_6px_28px_rgba(220,38,38,0.4)] active:scale-[0.98]"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Войти в систему
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Footer */}
          <div className="px-8 py-4 bg-white/[0.02] border-t border-white/[0.04]">
            <p className="text-gray-600 text-xs text-center">
              Защищённое соединение • JWT авторизация
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
