import React, { useState } from 'react';
import { Lock, Mail, Eye, EyeOff, ArrowLeft, ShieldCheck, Loader2, AlertCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useSiteContent } from '../../context/SiteContentContext';

interface AdminLoginProps {
  onLoginSuccess: () => void;
  onBackToSite: () => void;
}

export default function AdminLogin({ onLoginSuccess, onBackToSite }: AdminLoginProps) {
  const { content } = useSiteContent();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!email.trim() || !password) {
      setErrorMsg('Mohon masukkan Email dan Password akun Admin Supabase Anda.');
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password
      });

      if (error || !data.session) {
        const msg = error?.message || '';
        if (msg.toLowerCase().includes('invalid login credentials')) {
          setErrorMsg('Email atau Password salah. Pastikan menggunakan akun yang sudah Anda buat di Supabase Authentication.');
        } else if (msg.toLowerCase().includes('email not confirmed')) {
          setErrorMsg('Email belum dikonfirmasi di Supabase. Silakan cek email atau aktifkan Auto-Confirm di Supabase Auth.');
        } else {
          setErrorMsg(error?.message || 'Gagal masuk. Periksa kembali Email dan Password Anda.');
        }
        return;
      }

      onLoginSuccess();
    } catch (err: any) {
      setErrorMsg(err?.message || 'Terjadi kesalahan jaringan saat menghubungi Supabase.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-sky-50 flex flex-col justify-center items-center p-4 sm:p-6 text-slate-900">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-emerald-100 overflow-hidden">
        {/* Bright Friendly Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-7 text-white text-center relative">
          <button
            type="button"
            onClick={onBackToSite}
            className="absolute top-4 left-4 inline-flex items-center gap-1.5 bg-white/20 hover:bg-white/30 text-white text-xs font-bold px-3 py-1.5 rounded-full transition-all cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Ke Website</span>
          </button>

          {content.brand.logoUrl ? (
            <img
              src={content.brand.logoUrl}
              alt="Logo"
              className="w-16 h-16 rounded-2xl object-cover mx-auto border-2 border-white shadow-md mb-3 bg-white"
            />
          ) : (
            <div className="w-16 h-16 rounded-2xl bg-white/20 border-2 border-white/50 mx-auto mb-3 flex items-center justify-center">
              <Lock className="w-7 h-7 text-white" />
            </div>
          )}
          <h1 className="font-display font-black text-2xl tracking-tight uppercase">
            Login Admin Dashboard
          </h1>
          <p className="text-xs text-emerald-50 font-medium mt-1">
            {content.brand.brandFirstName} {content.brand.brandSecondName} {content.brand.brandSubtitle}
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleLogin} className="p-6 sm:p-8 space-y-5 text-left">
          <div className="bg-emerald-50/80 border border-emerald-200/80 rounded-2xl p-3.5 flex items-start gap-2.5">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <p className="text-xs text-emerald-950 leading-relaxed font-medium">
              Silakan masuk menggunakan <strong>Email &amp; Password</strong> akun yang sudah Anda buat di <strong>Supabase Authentication</strong>.
            </p>
          </div>

          {errorMsg && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-2xl p-3.5 flex items-start gap-2.5 text-xs font-semibold">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider">
              Email Akun Admin
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@email.com"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-sm font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:outline-none transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type={showPass ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan password Anda"
                className="w-full pl-10 pr-11 py-3 rounded-xl bg-slate-50 border border-slate-300 text-sm font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:outline-none transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-700 cursor-pointer p-0.5"
                title={showPass ? 'Sembunyikan Password' : 'Lihat Password'}
              >
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white font-display font-black text-sm uppercase tracking-wider py-3.5 rounded-2xl shadow-lg shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Memverifikasi Akun...</span>
              </>
            ) : (
              <span>Masuk ke Dashboard Admin ➔</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

