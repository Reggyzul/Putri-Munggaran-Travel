import React, { useState, useEffect } from 'react';
import {
  Home,
  Building2,
  Car as CarIcon,
  Compass,
  Star,
  BookOpen,
  ListChecks,
  HeartPulse,
  Save,
  Eye,
  LogOut,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  CheckCircle2,
  AlertTriangle,
  Copy,
  Check,
  RefreshCw,
  Menu,
  X,
  RotateCcw,
  Sparkles,
  Globe
} from 'lucide-react';
import { useSiteContent } from '../../context/SiteContentContext';
import { supabase, SUPABASE_SETUP_SQL } from '../../lib/supabase';
import ImageField from './ImageField';
import AdminLogin from './AdminLogin';

interface AdminDashboardProps {
  onExitAdmin: () => void;
}

type AdminTab =
  | 'hero'
  | 'brand'
  | 'cars'
  | 'destinations'
  | 'testimonials'
  | 'about'
  | 'steps_footer'
  | 'keepalive';

export default function AdminDashboard({ onExitAdmin }: AdminDashboardProps) {
  const {
    content,
    setContent,
    saveContent,
    resetContent,
    isSaving,
    tableMissing,
    keepAlive,
    triggerManualKeepAlive
  } = useSiteContent();

  const [sessionChecked, setSessionChecked] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<AdminTab>('hero');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [editLang, setEditLang] = useState<'ID' | 'EN'>('ID');
  const [saveBanner, setSaveBanner] = useState<{ type: 'success' | 'info' | 'error'; text: string } | null>(null);
  const [sqlCopied, setSqlCopied] = useState(false);
  const [showSqlModal, setShowSqlModal] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUserEmail(data.session?.user?.email || null);
      setSessionChecked(true);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserEmail(session?.user?.email || null);
      setSessionChecked(true);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  if (!sessionChecked) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-200 text-center space-y-3">
          <RefreshCw className="w-8 h-8 text-emerald-600 animate-spin mx-auto" />
          <p className="font-bold text-slate-700 text-sm">Memeriksa sesi login Admin Supabase...</p>
        </div>
      </div>
    );
  }

  if (!userEmail) {
    return (
      <AdminLogin
        onLoginSuccess={() => {
          supabase.auth.getSession().then(({ data }) => {
            setUserEmail(data.session?.user?.email || 'Admin');
          });
        }}
        onBackToSite={onExitAdmin}
      />
    );
  }

  const handleSaveAll = async () => {
    setSaveBanner(null);
    const res = await saveContent();
    if (res.savedToSupabase) {
      setSaveBanner({
        type: 'success',
        t: undefined,
        text: '✅ Semua perubahan berhasil disimpan ke Supabase & Server! Website langsung terupdate.'
      } as any);
    } else if (res.tableMissing) {
      setSaveBanner({
        type: 'info',
        text: '✅ Perubahan tersimpan di Server Website! Agar tersimpan permanen di tabel Supabase, klik tombol "Setup Tabel Supabase (1x Klik)" di atas.'
      });
      setShowSqlModal(true);
    } else if (res.savedToServer) {
      setSaveBanner({
        type: 'success',
        text: '✅ Perubahan berhasil disimpan dan langsung aktif di website!'
      });
    } else {
      setSaveBanner({
        type: 'error',
        text: `⚠️ Tersimpan lokal di browser. Pesan Supabase: ${res.error || 'Periksa tabel Supabase'}`
      });
    }
    setTimeout(() => setSaveBanner(null), 6000);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUserEmail(null);
  };

  const handleCopySql = () => {
    navigator.clipboard.writeText(SUPABASE_SETUP_SQL);
    setSqlCopied(true);
    setTimeout(() => setSqlCopied(false), 3000);
  };

  const updateTranslation = (lang: 'ID' | 'EN', key: string, val: string) => {
    setContent((prev) => ({
      ...prev,
      translations: {
        ...prev.translations,
        [lang]: {
          ...prev.translations[lang],
          [key]: val
        }
      }
    }));
  };

  const navMenu: { id: AdminTab; label: string; sub: string; icon: React.ReactNode }[] = [
    {
      id: 'hero',
      label: 'Banner Utama & Beranda',
      sub: 'Foto slider, judul & tombol atas',
      icon: <Home className="w-5 h-5" />
    },
    {
      id: 'brand',
      label: 'Logo, Kontak & Peta',
      sub: 'Logo, WA, Alamat, Maps & Sosmed',
      icon: <Building2 className="w-5 h-5" />
    },
    {
      id: 'cars',
      label: 'Armada Kendaraan',
      sub: 'Edit/Tambah foto mobil & fasilitas',
      icon: <CarIcon className="w-5 h-5" />
    },
    {
      id: 'destinations',
      label: 'Destinasi Wisata',
      sub: 'Edit/Tambah foto wisata & info',
      icon: <Compass className="w-5 h-5" />
    },
    {
      id: 'testimonials',
      label: 'Testimoni Pelanggan',
      sub: 'Ulasan, rating & foto pelanggan',
      icon: <Star className="w-5 h-5" />
    },
    {
      id: 'about',
      label: 'Halaman Tentang Kami',
      sub: 'Profil, Visi Misi, Keunggulan & Layanan',
      icon: <BookOpen className="w-5 h-5" />
    },
    {
      id: 'steps_footer',
      label: 'Cara Pesan, Form & Footer',
      sub: '3 Langkah pesan, Form WA & SEO',
      icon: <ListChecks className="w-5 h-5" />
    },
    {
      id: 'keepalive',
      label: 'Status Supabase 24/7',
      sub: 'Anti-Nonaktif 7 Hari & Setup SQL',
      icon: <HeartPulse className="w-5 h-5" />
    }
  ];

  const tCurr = content.translations[editLang];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col font-sans">
      {/* TOP STICKY BAR (Bright, Clean, Mobile Friendly) */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
          {/* Left: Hamburger (Mobile) + Brand Title */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              className="lg:hidden p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 cursor-pointer"
              aria-label="Buka Menu Navigasi"
            >
              {mobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {content.brand.logoUrl ? (
              <img
                src={content.brand.logoUrl}
                alt="Logo"
                className="w-10 h-10 rounded-xl object-cover border border-emerald-500/40 shrink-0"
              />
            ) : (
              <div className="w-10 h-10 rounded-xl bg-emerald-100 border border-emerald-300 shrink-0" />
            )}
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-black text-sm sm:text-base text-slate-900 uppercase tracking-tight">
                  Dashboard Admin
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-extrabold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                  Supabase Aktif
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium truncate max-w-[180px] sm:max-w-xs">
                Login: {userEmail}
              </p>
            </div>
          </div>

          {/* Right: Language Switch, Preview Website, Save Button */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Bahasa Teks yang Diedit */}
            <div className="hidden md:flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold">
              <button
                type="button"
                onClick={() => setEditLang('ID')}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  editLang === 'ID'
                    ? 'bg-white text-emerald-700 shadow-xs font-extrabold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                🇮🇩 Teks Indonesia
              </button>
              <button
                type="button"
                onClick={() => setEditLang('EN')}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  editLang === 'EN'
                    ? 'bg-white text-emerald-700 shadow-xs font-extrabold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                🇬🇧 Teks Inggris
              </button>
            </div>

            <button
              type="button"
              onClick={onExitAdmin}
              className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 transition-all cursor-pointer"
            >
              <Eye className="w-4 h-4 text-emerald-600" />
              <span className="hidden sm:inline">Lihat Website</span>
            </button>

            <button
              type="button"
              onClick={handleSaveAll}
              disabled={isSaving}
              className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white font-display font-black text-xs uppercase tracking-wider px-4 sm:px-5 py-2.5 rounded-xl shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
            >
              {isSaving ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              <span>{isSaving ? 'Menyimpan...' : 'Simpan Perubahan'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* NOTIFICATION BANNER */}
      {saveBanner && (
        <div
          className={`px-4 py-3 text-center text-xs sm:text-sm font-bold border-b ${
            saveBanner.type === 'success'
              ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
              : saveBanner.type === 'info'
              ? 'bg-amber-50 text-amber-900 border-amber-200'
              : 'bg-red-50 text-red-900 border-red-200'
          }`}
        >
          {saveBanner.text}
        </div>
      )}

      {/* TABLE MISSING HELPER ALERT (If user hasn't run SQL in Supabase yet) */}
      {tableMissing && (
        <div className="bg-amber-50 border-b border-amber-200 px-4 py-3">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-start gap-2.5 text-xs text-amber-950">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-extrabold">
                  Langkah Terakhir Setup Database Supabase (Hanya 1 Kali):
                </p>
                <p className="text-amber-800">
                  Tabel <code className="bg-amber-100 px-1.5 py-0.5 rounded font-bold">site_content</code> belum dibuat di akun Supabase Anda. Klik tombol di samping untuk menyalin kode SQL ke Supabase.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowSqlModal(true)}
              className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-xs shrink-0 cursor-pointer"
            >
              Lihat &amp; Salin SQL Setup
            </button>
          </div>
        </div>
      )}

      {/* MAIN BODY WITH LEFT NAVIGATION SIDEBAR */}
      <div className="max-w-[1440px] w-full mx-auto flex-1 flex flex-col lg:flex-row">
        {/* LEFT SIDEBAR NAVIGATION (Desktop Permanent + Mobile Slide-over Drawer) */}
        <aside
          className={`${
            mobileNavOpen ? 'fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs lg:static lg:bg-transparent' : 'hidden lg:block'
          } lg:w-72 xl:w-80 shrink-0 lg:border-r lg:border-slate-200 lg:bg-white`}
          onClick={() => setMobileNavOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-72 sm:w-80 lg:w-full h-full bg-white p-4 sm:p-5 flex flex-col justify-between overflow-y-auto shadow-2xl lg:shadow-none"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between lg:hidden pb-3 border-b border-slate-100">
                <span className="font-display font-black text-sm uppercase text-emerald-700">
                  Menu Navigasi Admin
                </span>
                <button
                  type="button"
                  onClick={() => setMobileNavOpen(false)}
                  className="p-1.5 rounded-lg bg-slate-100 text-slate-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Mobile Language Toggle inside Sidebar */}
              <div className="flex md:hidden items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setEditLang('ID')}
                  className={`flex-1 py-1.5 rounded-lg transition-all ${
                    editLang === 'ID' ? 'bg-white text-emerald-700 shadow-xs font-extrabold' : 'text-slate-600'
                  }`}
                >
                  🇮🇩 Indonesia
                </button>
                <button
                  type="button"
                  onClick={() => setEditLang('EN')}
                  className={`flex-1 py-1.5 rounded-lg transition-all ${
                    editLang === 'EN' ? 'bg-white text-emerald-700 shadow-xs font-extrabold' : 'text-slate-600'
                  }`}
                >
                  🇬🇧 Inggris
                </button>
              </div>

              <div className="space-y-1.5">
                <span className="px-3 text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block">
                  PILIH BAGIAN YANG INGIN DIEDIT
                </span>
                {navMenu.map((item) => {
                  const active = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setActiveTab(item.id);
                        setMobileNavOpen(false);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className={`w-full text-left px-3.5 py-3 rounded-2xl flex items-start gap-3 transition-all cursor-pointer border ${
                        active
                          ? 'bg-emerald-50/90 border-emerald-300 text-emerald-900 shadow-xs'
                          : 'bg-white border-transparent hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <div
                        className={`p-2 rounded-xl shrink-0 ${
                          active ? 'bg-emerald-600 text-white shadow-xs' : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {item.icon}
                      </div>
                      <div className="min-w-0">
                        <p className={`text-xs sm:text-sm font-extrabold truncate ${active ? 'text-emerald-900' : 'text-slate-800'}`}>
                          {item.label}
                        </p>
                        <p className="text-[11px] text-slate-500 truncate mt-0.5">
                          {item.sub}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom Actions in Left Sidebar */}
            <div className="pt-6 mt-6 border-t border-slate-200 space-y-2">
              <button
                type="button"
                onClick={async () => {
                  if (window.confirm('Kembalikan seluruh teks & gambar ke pengaturan awal bawaan?')) {
                    await resetContent();
                    setSaveBanner({
                      type: 'info',
                      text: '🔄 Konten telah dikembalikan ke pengaturan awal.'
                    });
                  }
                }}
                className="w-full flex items-center justify-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-100 py-2.5 px-3 rounded-xl transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset ke Pengaturan Awal</span>
              </button>

              <button
                type="button"
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 text-xs font-bold text-red-600 hover:bg-red-50 py-2.5 px-3 rounded-xl border border-red-200 transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Keluar / Logout Akun</span>
              </button>
            </div>
          </div>
        </aside>

        {/* RIGHT CONTENT WORKSPACE */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8 overflow-y-auto text-left">
          {/* Quick Language Indicator Bar */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <Globe className="w-5 h-5 text-emerald-600 shrink-0" />
              <p className="text-xs sm:text-sm font-bold text-slate-700">
                Sedang mengedit bahasa:{' '}
                <span className="text-emerald-700 font-black">
                  {editLang === 'ID' ? '🇮🇩 Bahasa Indonesia (Utama)' : '🇬🇧 Bahasa Inggris (English)'}
                </span>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setEditLang(editLang === 'ID' ? 'EN' : 'ID')}
                className="text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-xl border border-emerald-200 cursor-pointer"
              >
                Ganti ke {editLang === 'ID' ? '🇬🇧 Bahasa Inggris' : '🇮🇩 Bahasa Indonesia'}
              </button>
            </div>
          </div>

          {/* =================================================================
              TAB 1: BANNER UTAMA (HERO SLIDER) & BERANDA
             ================================================================= */}
          {activeTab === 'hero' && (
            <div className="space-y-8">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-600">
                      BAGIAN 1 • BANNER UTAMA BERANDA
                    </span>
                    <h2 className="font-display font-black text-2xl text-slate-900">
                      Foto Slider &amp; Teks Halaman Utama
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Ubah foto latar belakang yang bergeser otomatis di bagian paling atas website beserta teksnya.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const newSlide = {
                        id: `slide-${Date.now()}`,
                        image: '',
                        title: 'PUTRI MUNGGARAN TRAVEL',
                        subtitle: 'Aman, Nyaman, Sampai Tujuan',
                        descID: 'Layanan perjalanan Door-to-Door terbaik untuk keluarga dan rombongan Anda.',
                        descEN: 'Reliable Door-to-Door travel service for your family and group trips.'
                      };
                      setContent((prev) => ({
                        ...prev,
                        heroSlides: [...prev.heroSlides, newSlide]
                      }));
                    }}
                    className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs cursor-pointer self-start"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Tambah Slide Banner Baru</span>
                  </button>
                </div>

                {/* Tombol CTA Hero */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <div>
                    <label className="block text-xs font-extrabold text-slate-700 mb-1">
                      Teks Tombol Hijau Utama ({editLang})
                    </label>
                    <input
                      type="text"
                      value={editLang === 'ID' ? content.heroCtaPrimaryID : content.heroCtaPrimaryEN}
                      onChange={(e) =>
                        setContent((prev) => ({
                          ...prev,
                          [editLang === 'ID' ? 'heroCtaPrimaryID' : 'heroCtaPrimaryEN']: e.target.value
                        }))
                      }
                      className="w-full bg-white px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-extrabold text-slate-700 mb-1">
                      Teks Tombol Kedua / Lihat Armada ({editLang})
                    </label>
                    <input
                      type="text"
                      value={editLang === 'ID' ? content.heroCtaSecondaryID : content.heroCtaSecondaryEN}
                      onChange={(e) =>
                        setContent((prev) => ({
                          ...prev,
                          [editLang === 'ID' ? 'heroCtaSecondaryID' : 'heroCtaSecondaryEN']: e.target.value
                        }))
                      }
                      className="w-full bg-white px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Daftar Slide */}
                <div className="space-y-6">
                  {content.heroSlides.map((slide, idx) => (
                    <div
                      key={slide.id || idx}
                      className="p-5 sm:p-6 rounded-2xl bg-white border-2 border-slate-200/90 shadow-xs space-y-4"
                    >
                      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                        <span className="inline-flex items-center gap-2 font-display font-black text-sm text-emerald-700 uppercase">
                          <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs flex items-center justify-center">
                            {idx + 1}
                          </span>
                          Slide Banner #{idx + 1}
                        </span>

                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            disabled={idx === 0}
                            onClick={() => {
                              const arr = [...content.heroSlides];
                              [arr[idx - 1], arr[idx]] = [arr[idx], arr[idx - 1]];
                              setContent((prev) => ({ ...prev, heroSlides: arr }));
                            }}
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-700 cursor-pointer"
                            title="Geser ke Atas"
                          >
                            <ArrowUp className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            disabled={idx === content.heroSlides.length - 1}
                            onClick={() => {
                              const arr = [...content.heroSlides];
                              [arr[idx], arr[idx + 1]] = [arr[idx + 1], arr[idx]];
                              setContent((prev) => ({ ...prev, heroSlides: arr }));
                            }}
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-700 cursor-pointer"
                            title="Geser ke Bawah"
                          >
                            <ArrowDown className="w-4 h-4" />
                          </button>
                          {content.heroSlides.length > 1 && (
                            <button
                              type="button"
                              onClick={() => {
                                if (window.confirm(`Hapus Slide Banner #${idx + 1}?`)) {
                                  setContent((prev) => ({
                                    ...prev,
                                    heroSlides: prev.heroSlides.filter((_, i) => i !== idx)
                                  }));
                                }
                              }}
                              className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 cursor-pointer ml-1"
                              title="Hapus Slide"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>

                      <ImageField
                        label={`Foto Latar Slide #${idx + 1}`}
                        helperText="Gambar ini tampil penuh sebagai latar belakang banner utama"
                        value={slide.image}
                        aspect="banner"
                        onChange={(newUrl) => {
                          const arr = [...content.heroSlides];
                          arr[idx] = { ...arr[idx], image: newUrl };
                          setContent((prev) => ({ ...prev, heroSlides: arr }));
                        }}
                      />

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-extrabold text-slate-700 mb-1">
                            Judul Besar Slide #{idx + 1}
                          </label>
                          <input
                            type="text"
                            value={slide.title}
                            onChange={(e) => {
                              const arr = [...content.heroSlides];
                              arr[idx] = { ...arr[idx], title: e.target.value };
                              setContent((prev) => ({ ...prev, heroSlides: arr }));
                            }}
                            className="w-full bg-slate-50 px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-extrabold text-slate-700 mb-1">
                            Sub-Judul Slide #{idx + 1}
                          </label>
                          <input
                            type="text"
                            value={slide.subtitle}
                            onChange={(e) => {
                              const arr = [...content.heroSlides];
                              arr[idx] = { ...arr[idx], subtitle: e.target.value };
                              setContent((prev) => ({ ...prev, heroSlides: arr }));
                            }}
                            className="w-full bg-slate-50 px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-extrabold text-slate-700 mb-1">
                          Deskripsi Slide #{idx + 1} ({editLang === 'ID' ? 'Bahasa Indonesia' : 'Bahasa Inggris'})
                        </label>
                        <textarea
                          rows={2}
                          value={editLang === 'ID' ? slide.descID : slide.descEN}
                          onChange={(e) => {
                            const arr = [...content.heroSlides];
                            if (editLang === 'ID') {
                              arr[idx] = { ...arr[idx], descID: e.target.value };
                            } else {
                              arr[idx] = { ...arr[idx], descEN: e.target.value };
                            }
                            setContent((prev) => ({ ...prev, heroSlides: arr }));
                          }}
                          className="w-full bg-slate-50 p-3 rounded-xl border border-slate-300 text-sm font-medium focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* =================================================================
              TAB 2: IDENTITAS BRAND, LOGO, KONTAK & PETA
             ================================================================= */}
          {activeTab === 'brand' && (
            <div className="space-y-8">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
                <div className="border-b border-slate-100 pb-4">
                  <span className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-600">
                    BAGIAN 2 • IDENTITAS BRAND &amp; KONTAK
                  </span>
                  <h2 className="font-display font-black text-2xl text-slate-900">
                    Logo, Nama Brand, WhatsApp, Alamat &amp; Peta
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Semua perubahan di sini akan otomatis mengupdate Header, Tombol WhatsApp, Halaman Tentang Kami, dan Footer.
                  </p>
                </div>

                {/* Logo & Favicon */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <ImageField
                    label="Logo Utama Website (Header & Footer)"
                    helperText="Muncul di pojok kiri atas navigasi, halaman Tentang Kami, dan Footer"
                    value={content.brand.logoUrl}
                    aspect="square"
                    onChange={(newUrl) =>
                      setContent((prev) => ({
                        ...prev,
                        brand: { ...prev.brand, logoUrl: newUrl }
                      }))
                    }
                  />
                  <ImageField
                    label="Ikon Tab Browser (Favicon)"
                    helperText="Ikon kecil yang tampil di tab atas browser pengunjung"
                    value={content.brand.faviconUrl}
                    aspect="square"
                    onChange={(newUrl) =>
                      setContent((prev) => ({
                        ...prev,
                        brand: { ...prev.brand, faviconUrl: newUrl }
                      }))
                    }
                  />
                </div>

                {/* Nama Brand & Motto */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-xs font-extrabold text-slate-700 mb-1">
                      Nama Brand Kata 1 (Hitam)
                    </label>
                    <input
                      type="text"
                      value={content.brand.brandFirstName}
                      onChange={(e) =>
                        setContent((prev) => ({
                          ...prev,
                          brand: { ...prev.brand, brandFirstName: e.target.value }
                        }))
                      }
                      className="w-full bg-slate-50 px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-extrabold text-slate-700 mb-1">
                      Nama Brand Kata 2 (Hijau)
                    </label>
                    <input
                      type="text"
                      value={content.brand.brandSecondName}
                      onChange={(e) =>
                        setContent((prev) => ({
                          ...prev,
                          brand: { ...prev.brand, brandSecondName: e.target.value }
                        }))
                      }
                      className="w-full bg-slate-50 px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-bold text-emerald-700"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-extrabold text-slate-700 mb-1">
                      Sub-Nama Brand
                    </label>
                    <input
                      type="text"
                      value={content.brand.brandSubtitle}
                      onChange={(e) =>
                        setContent((prev) => ({
                          ...prev,
                          brand: { ...prev.brand, brandSubtitle: e.target.value }
                        }))
                      }
                      className="w-full bg-slate-50 px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-extrabold text-slate-700 mb-1">
                      Motto / Tagline Utama
                    </label>
                    <input
                      type="text"
                      value={content.brand.motto}
                      onChange={(e) => {
                        const val = e.target.value;
                        setContent((prev) => ({
                          ...prev,
                          brand: { ...prev.brand, motto: val },
                          translations: {
                            ...prev.translations,
                            ID: { ...prev.translations.ID, hero_motto: val, footer_motto_text: val },
                            EN: { ...prev.translations.EN, hero_motto: val, footer_motto_text: val }
                          }
                        }));
                      }}
                      className="w-full bg-slate-50 px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold"
                    />
                  </div>
                </div>

                {/* WhatsApp & Sosial Media */}
                <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-4">
                  <h3 className="font-display font-black text-base text-emerald-950 uppercase">
                    Nomor WhatsApp &amp; Media Sosial Resmi
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-extrabold text-slate-700 mb-1">
                        Nomor WhatsApp Sistem (Awali 62 tanpa spasi/strip)
                      </label>
                      <input
                        type="text"
                        value={content.brand.whatsappNumber}
                        onChange={(e) =>
                          setContent((prev) => ({
                            ...prev,
                            brand: { ...prev.brand, whatsappNumber: e.target.value.replace(/[^0-9]/g, '') }
                          }))
                        }
                        placeholder="6281321264200"
                        className="w-full bg-white px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-extrabold text-slate-700 mb-1">
                        Tampilan Nomor WhatsApp di Layar
                      </label>
                      <input
                        type="text"
                        value={content.brand.whatsappDisplay}
                        onChange={(e) =>
                          setContent((prev) => ({
                            ...prev,
                            brand: { ...prev.brand, whatsappDisplay: e.target.value }
                          }))
                        }
                        placeholder="0813-2126-4200"
                        className="w-full bg-white px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-bold"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-extrabold text-slate-700 mb-1">
                        Pesan Otomatis Saat Pengunjung Klik Tombol WA ({editLang})
                      </label>
                      <input
                        type="text"
                        value={
                          editLang === 'ID'
                            ? content.brand.whatsappDefaultMessageID
                            : content.brand.whatsappDefaultMessageEN
                        }
                        onChange={(e) =>
                          setContent((prev) => ({
                            ...prev,
                            brand: {
                              ...prev.brand,
                              [editLang === 'ID' ? 'whatsappDefaultMessageID' : 'whatsappDefaultMessageEN']:
                                e.target.value
                            }
                          }))
                        }
                        className="w-full bg-white px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className="block text-xs font-extrabold text-slate-700 mb-1">
                        Username Instagram
                      </label>
                      <input
                        type="text"
                        value={content.brand.instagramHandle}
                        onChange={(e) =>
                          setContent((prev) => ({
                            ...prev,
                            brand: { ...prev.brand, instagramHandle: e.target.value }
                          }))
                        }
                        className="w-full bg-white px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-extrabold text-slate-700 mb-1">
                        Link URL Instagram
                      </label>
                      <input
                        type="text"
                        value={content.brand.instagramUrl}
                        onChange={(e) =>
                          setContent((prev) => ({
                            ...prev,
                            brand: { ...prev.brand, instagramUrl: e.target.value }
                          }))
                        }
                        className="w-full bg-white px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-extrabold text-slate-700 mb-1">
                        Nama Akun Facebook
                      </label>
                      <input
                        type="text"
                        value={content.brand.facebookName}
                        onChange={(e) =>
                          setContent((prev) => ({
                            ...prev,
                            brand: { ...prev.brand, facebookName: e.target.value }
                          }))
                        }
                        className="w-full bg-white px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-extrabold text-slate-700 mb-1">
                        Link URL Facebook
                      </label>
                      <input
                        type="text"
                        value={content.brand.facebookUrl}
                        onChange={(e) =>
                          setContent((prev) => ({
                            ...prev,
                            brand: { ...prev.brand, facebookUrl: e.target.value }
                          }))
                        }
                        className="w-full bg-white px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium"
                      />
                    </div>
                  </div>
                </div>

                {/* Alamat, Jam Operasional & Google Maps */}
                <div className="space-y-4">
                  <h3 className="font-display font-black text-base text-slate-900 uppercase">
                    Alamat Kantor, Jam Operasional &amp; Titik Google Maps
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-extrabold text-slate-700 mb-1">
                        Alamat Lengkap Kantor / Garasi
                      </label>
                      <input
                        type="text"
                        value={content.brand.officeAddress}
                        onChange={(e) =>
                          setContent((prev) => ({
                            ...prev,
                            brand: { ...prev.brand, officeAddress: e.target.value }
                          }))
                        }
                        className="w-full bg-slate-50 px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-extrabold text-slate-700 mb-1">
                        Plus Code / Titik Koordinat Kantor
                      </label>
                      <input
                        type="text"
                        value={content.brand.officeCoordinates}
                        onChange={(e) =>
                          setContent((prev) => ({
                            ...prev,
                            brand: { ...prev.brand, officeCoordinates: e.target.value }
                          }))
                        }
                        className="w-full bg-slate-50 px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-extrabold text-slate-700 mb-1">
                        Jam Operasional ({editLang})
                      </label>
                      <input
                        type="text"
                        value={
                          editLang === 'ID' ? content.brand.operationalHoursID : content.brand.operationalHoursEN
                        }
                        onChange={(e) =>
                          setContent((prev) => ({
                            ...prev,
                            brand: {
                              ...prev.brand,
                              [editLang === 'ID' ? 'operationalHoursID' : 'operationalHoursEN']: e.target.value
                            }
                          }))
                        }
                        className="w-full bg-slate-50 px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-extrabold text-slate-700 mb-1">
                        Link Tombol "Buka di Google Maps"
                      </label>
                      <input
                        type="text"
                        value={content.brand.googleMapsUrl}
                        onChange={(e) =>
                          setContent((prev) => ({
                            ...prev,
                            brand: { ...prev.brand, googleMapsUrl: e.target.value }
                          }))
                        }
                        className="w-full bg-slate-50 px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-extrabold text-slate-700 mb-1">
                        Link Peta Interaktif (Embed Google Maps)
                      </label>
                      <input
                        type="text"
                        value={content.brand.googleMapsEmbedUrl}
                        onChange={(e) =>
                          setContent((prev) => ({
                            ...prev,
                            brand: { ...prev.brand, googleMapsEmbedUrl: e.target.value }
                          }))
                        }
                        className="w-full bg-slate-50 px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium"
                      />
                    </div>
                  </div>
                </div>

                {/* Teks Menu Navigasi Header */}
                <div className="space-y-3 pt-3 border-t border-slate-100">
                  <h3 className="font-display font-black text-base text-slate-900 uppercase">
                    Teks Menu Navigasi Atas ({editLang})
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                    {[
                      { key: 'nav_home', label: 'Menu Beranda' },
                      { key: 'nav_about', label: 'Menu Tentang Kami' },
                      { key: 'nav_rentals', label: 'Menu Armada' },
                      { key: 'nav_destinations', label: 'Menu Destinasi' },
                      { key: 'nav_contact', label: 'Menu Kontak' }
                    ].map((m) => (
                      <div key={m.key}>
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">
                          {m.label}
                        </label>
                        <input
                          type="text"
                          value={(tCurr as any)[m.key] || ''}
                          onChange={(e) => updateTranslation(editLang, m.key, e.target.value)}
                          className="w-full bg-slate-50 px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =================================================================
              TAB 3: ARMADA KENDARAAN (CARS)
             ================================================================= */}
          {activeTab === 'cars' && (
            <div className="space-y-8">
              {/* Pengaturan Seksi & Banner Halaman Armada */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-600">
                      BAGIAN 3 • PILIHAN ARMADA KENDARAAN
                    </span>
                    <h2 className="font-display font-black text-2xl text-slate-900">
                      Kelola Daftar Mobil &amp; Spesifikasi
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Ubah foto kendaraan, nama mobil, jumlah kursi, deskripsi, dan fasilitas.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      const newCar = {
                        id: `armada-${Date.now()}`,
                        name: 'Armada Baru',
                        category: 'Sewa Mobil',
                        pricePerDay: 0,
                        priceDisplay: 'Hubungi Admin untuk Harga Terbaik',
                        image: '',
                        seats: 7,
                        transmission: 'Manual/Matic' as const,
                        fuel: 'Bensin',
                        includeList: [
                          'AC Dingin & Nyaman',
                          'Kabin Bersih & Terawat',
                          'Pengemudi Berpengalaman'
                        ],
                        description: 'Kendaraan nyaman untuk perjalanan keluarga maupun rombongan.',
                        rating: 5.0,
                        reviewsCount: 100,
                        specifications: [
                          { label: 'Kapasitas', value: '7 Penumpang' },
                          { label: 'Layanan', value: 'Door-to-Door / Private Trip' },
                          { label: 'Karakteristik', value: 'Keluarga & Pribadi' }
                        ]
                      };
                      setContent((prev) => ({
                        ...prev,
                        cars: [...prev.cars, newCar]
                      }));
                    }}
                    className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs cursor-pointer self-start"
                  >
                    <Plus className="w-4 h-4" />
                    <span>+ Tambah Kendaraan Baru</span>
                  </button>
                </div>

                <ImageField
                  label="Foto Banner Atas Halaman Armada"
                  helperText="Gambar latar belakang di bagian atas saat pengunjung membuka menu Armada"
                  value={content.banners.rentalsBannerImage}
                  aspect="banner"
                  onChange={(newUrl) =>
                    setContent((prev) => ({
                      ...prev,
                      banners: { ...prev.banners, rentalsBannerImage: newUrl }
                    }))
                  }
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-extrabold text-slate-700 mb-1">
                      Label Tag Kecil Seksi Armada ({editLang})
                    </label>
                    <input
                      type="text"
                      value={tCurr.cars_tag}
                      onChange={(e) => updateTranslation(editLang, 'cars_tag', e.target.value)}
                      className="w-full bg-slate-50 px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-extrabold text-slate-700 mb-1">
                      Judul Seksi Armada ({editLang})
                    </label>
                    <input
                      type="text"
                      value={tCurr.cars_title}
                      onChange={(e) => updateTranslation(editLang, 'cars_title', e.target.value)}
                      className="w-full bg-slate-50 px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-extrabold text-slate-700 mb-1">
                      Deskripsi Seksi Armada ({editLang})
                    </label>
                    <input
                      type="text"
                      value={tCurr.cars_desc}
                      onChange={(e) => updateTranslation(editLang, 'cars_desc', e.target.value)}
                      className="w-full bg-slate-50 px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-extrabold text-slate-700 mb-1">
                      Catatan Informasi Harga di Bawah Daftar Mobil ({editLang})
                    </label>
                    <textarea
                      rows={2}
                      value={tCurr.cars_note}
                      onChange={(e) => updateTranslation(editLang, 'cars_note', e.target.value)}
                      className="w-full bg-slate-50 p-3 rounded-xl border border-slate-300 text-xs font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* Kartu-Kartu Armada */}
              <div className="space-y-6">
                {content.cars.map((car, idx) => (
                  <div
                    key={car.id || idx}
                    className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200/90 shadow-xs space-y-5"
                  >
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div className="flex items-center gap-2.5">
                        <span className="w-7 h-7 rounded-full bg-emerald-600 text-white font-black text-xs flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <h3 className="font-display font-black text-lg text-slate-900 uppercase">
                          {car.name}
                        </h3>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          disabled={idx === 0}
                          onClick={() => {
                            const arr = [...content.cars];
                            [arr[idx - 1], arr[idx]] = [arr[idx], arr[idx - 1]];
                            setContent((prev) => ({ ...prev, cars: arr }));
                          }}
                          className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-700 cursor-pointer"
                        >
                          <ArrowUp className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          disabled={idx === content.cars.length - 1}
                          onClick={() => {
                            const arr = [...content.cars];
                            [arr[idx], arr[idx + 1]] = [arr[idx + 1], arr[idx]];
                            setContent((prev) => ({ ...prev, cars: arr }));
                          }}
                          className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-700 cursor-pointer"
                        >
                          <ArrowDown className="w-4 h-4" />
                        </button>
                        {content.cars.length > 1 && (
                          <button
                            type="button"
                            onClick={() => {
                              if (window.confirm(`Hapus kendaraan "${car.name}"?`)) {
                                setContent((prev) => ({
                                  ...prev,
                                  cars: prev.cars.filter((_, i) => i !== idx)
                                }));
                              }
                            }}
                            className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 cursor-pointer ml-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>

                    <ImageField
                      label={`Foto Kendaraan: ${car.name}`}
                      helperText="Preview gambar mobil yang tampil di kartu armada"
                      value={car.image}
                      onChange={(newUrl) => {
                        const arr = [...content.cars];
                        arr[idx] = { ...arr[idx], image: newUrl };
                        setContent((prev) => ({ ...prev, cars: arr }));
                      }}
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div>
                        <label className="block text-xs font-extrabold text-slate-700 mb-1">
                          Nama Kendaraan
                        </label>
                        <input
                          type="text"
                          value={car.name}
                          onChange={(e) => {
                            const arr = [...content.cars];
                            arr[idx] = { ...arr[idx], name: e.target.value };
                            setContent((prev) => ({ ...prev, cars: arr }));
                          }}
                          className="w-full bg-slate-50 px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-bold"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-extrabold text-emerald-700 mb-1">
                          Harga / Tarif Sewa Armada
                        </label>
                        <input
                          type="text"
                          value={car.priceDisplay || ''}
                          onChange={(e) => {
                            const arr = [...content.cars];
                            arr[idx] = { ...arr[idx], priceDisplay: e.target.value };
                            setContent((prev) => ({ ...prev, cars: arr }));
                          }}
                          placeholder="Contoh: Rp 600.000 / Hari atau Hubungi Admin"
                          className="w-full bg-emerald-50/70 px-3.5 py-2.5 rounded-xl border border-emerald-300 text-sm font-extrabold text-emerald-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-extrabold text-slate-700 mb-1">
                          Kapasitas Kursi (Angka)
                        </label>
                        <input
                          type="number"
                          value={car.seats}
                          onChange={(e) => {
                            const arr = [...content.cars];
                            arr[idx] = { ...arr[idx], seats: Number(e.target.value) || 7 };
                            setContent((prev) => ({ ...prev, cars: arr }));
                          }}
                          className="w-full bg-slate-50 px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-bold"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-extrabold text-slate-700 mb-1">
                          Label Kategori / Karakteristik Atas
                        </label>
                        <input
                          type="text"
                          value={car.specifications?.[2]?.value || 'Keluarga & Pribadi'}
                          onChange={(e) => {
                            const arr = [...content.cars];
                            const specs = [...(arr[idx].specifications || [])];
                            while (specs.length < 3) {
                              specs.push({ label: 'Info', value: '' });
                            }
                            specs[2] = { ...specs[2], value: e.target.value };
                            arr[idx] = { ...arr[idx], specifications: specs };
                            setContent((prev) => ({ ...prev, cars: arr }));
                          }}
                          className="w-full bg-slate-50 px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-extrabold text-slate-700 mb-1">
                        Deskripsi Singkat Kendaraan
                      </label>
                      <textarea
                        rows={2}
                        value={car.description}
                        onChange={(e) => {
                          const arr = [...content.cars];
                          arr[idx] = { ...arr[idx], description: e.target.value };
                          setContent((prev) => ({ ...prev, cars: arr }));
                        }}
                        className="w-full bg-slate-50 p-3 rounded-xl border border-slate-300 text-sm font-medium"
                      />
                    </div>

                    {/* Daftar Fasilitas / Include List */}
                    <div className="space-y-2.5 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-extrabold text-slate-700 uppercase">
                          Daftar Fasilitas &amp; Keunggulan ({car.name})
                        </label>
                        <button
                          type="button"
                          onClick={() => {
                            const arr = [...content.cars];
                            arr[idx] = {
                              ...arr[idx],
                              includeList: [...arr[idx].includeList, 'Fasilitas Baru']
                            };
                            setContent((prev) => ({ ...prev, cars: arr }));
                          }}
                          className="text-xs font-bold text-emerald-700 bg-emerald-100 hover:bg-emerald-200 px-3 py-1 rounded-lg cursor-pointer"
                        >
                          + Tambah Poin Fasilitas
                        </button>
                      </div>

                      <div className="space-y-2">
                        {car.includeList.map((inc, incIdx) => (
                          <div key={incIdx} className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            <input
                              type="text"
                              value={inc}
                              onChange={(e) => {
                                const arr = [...content.cars];
                                const list = [...arr[idx].includeList];
                                list[incIdx] = e.target.value;
                                arr[idx] = { ...arr[idx], includeList: list };
                                setContent((prev) => ({ ...prev, cars: arr }));
                              }}
                              className="flex-1 bg-white px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-semibold"
                            />
                            {car.includeList.length > 1 && (
                              <button
                                type="button"
                                onClick={() => {
                                  const arr = [...content.cars];
                                  arr[idx] = {
                                    ...arr[idx],
                                    includeList: arr[idx].includeList.filter((_, i) => i !== incIdx)
                                  };
                                  setContent((prev) => ({ ...prev, cars: arr }));
                                }}
                                className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =================================================================
              TAB 4: DESTINASI WISATA (DESTINATIONS)
             ================================================================= */}
          {activeTab === 'destinations' && (
            <div className="space-y-8">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-600">
                      BAGIAN 4 • DESTINASI WISATA PILIHAN
                    </span>
                    <h2 className="font-display font-black text-2xl text-slate-900">
                      Kelola Daftar Destinasi Wisata &amp; Foto
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Semua perubahan foto dan teks destinasi akan langsung tampil di Beranda dan Halaman Destinasi Wisata.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      const newDest = {
                        id: `dest-pantai-${Date.now()}`,
                        category: 'pantai' as const,
                        name: 'Destinasi Wisata Baru',
                        nameEN: 'New Tourist Destination',
                        tagline: 'Pesona Alam & Pantai Eksotis',
                        taglineEN: 'Exotic Nature & Coastal Charm',
                        description: 'Deskripsi keindahan objek wisata pilihan di Pangandaran dan sekitarnya.',
                        descriptionEN: 'Description of this popular tourist attraction in Pangandaran.',
                        image: '',
                        badge: 'Wisata Populer',
                        badgeEN: 'Popular Spot',
                        priceDisplay: 'Hubungi Admin untuk Harga Paket',
                        priceDisplayEN: 'Contact Admin for Package Rate',
                        highlights: ['Pemandangan alam indah', 'Spot foto menarik', 'Akses nyaman bersama kami'],
                        highlightsEN: ['Scenic natural views', 'Great photo spots', 'Comfortable access with us']
                      };
                      setContent((prev) => ({
                        ...prev,
                        destinations: [...prev.destinations, newDest]
                      }));
                    }}
                    className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs cursor-pointer self-start"
                  >
                    <Plus className="w-4 h-4" />
                    <span>+ Tambah Destinasi Baru</span>
                  </button>
                </div>

                <ImageField
                  label="Foto Banner Atas Halaman Destinasi Wisata"
                  helperText="Gambar latar belakang bagian atas pada Halaman Destinasi Wisata"
                  value={content.banners.destinationsBannerImage}
                  aspect="banner"
                  onChange={(newUrl) =>
                    setContent((prev) => ({
                      ...prev,
                      banners: { ...prev.banners, destinationsBannerImage: newUrl }
                    }))
                  }
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-extrabold text-slate-700 mb-1">
                      Label Tag Kecil Seksi Destinasi ({editLang})
                    </label>
                    <input
                      type="text"
                      value={tCurr.dest_tag}
                      onChange={(e) => updateTranslation(editLang, 'dest_tag', e.target.value)}
                      className="w-full bg-slate-50 px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-extrabold text-slate-700 mb-1">
                      Judul Seksi Destinasi di Beranda ({editLang})
                    </label>
                    <input
                      type="text"
                      value={tCurr.dest_title}
                      onChange={(e) => updateTranslation(editLang, 'dest_title', e.target.value)}
                      className="w-full bg-slate-50 px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-extrabold text-slate-700 mb-1">
                      Deskripsi Seksi Destinasi di Beranda ({editLang})
                    </label>
                    <input
                      type="text"
                      value={tCurr.dest_desc}
                      onChange={(e) => updateTranslation(editLang, 'dest_desc', e.target.value)}
                      className="w-full bg-slate-50 px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-extrabold text-slate-700 mb-1">
                      Judul Halaman Destinasi ({editLang})
                    </label>
                    <input
                      type="text"
                      value={
                        editLang === 'ID'
                          ? content.banners.destinationsPageSubtitleID
                          : content.banners.destinationsPageSubtitleEN
                      }
                      onChange={(e) =>
                        setContent((prev) => ({
                          ...prev,
                          banners: {
                            ...prev.banners,
                            [editLang === 'ID' ? 'destinationsPageSubtitleID' : 'destinationsPageSubtitleEN']:
                              e.target.value
                          }
                        }))
                      }
                      className="w-full bg-slate-50 px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-extrabold text-slate-700 mb-1">
                      Judul Callout Bawah Halaman Destinasi ({editLang})
                    </label>
                    <input
                      type="text"
                      value={
                        editLang === 'ID'
                          ? content.banners.destinationsCalloutTitleID
                          : content.banners.destinationsCalloutTitleEN
                      }
                      onChange={(e) =>
                        setContent((prev) => ({
                          ...prev,
                          banners: {
                            ...prev.banners,
                            [editLang === 'ID' ? 'destinationsCalloutTitleID' : 'destinationsCalloutTitleEN']:
                              e.target.value
                          }
                        }))
                      }
                      className="w-full bg-slate-50 px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-extrabold text-slate-700 mb-1">
                      Deskripsi Callout Bawah Halaman Destinasi ({editLang})
                    </label>
                    <input
                      type="text"
                      value={
                        editLang === 'ID'
                          ? content.banners.destinationsCalloutDescID
                          : content.banners.destinationsCalloutDescEN
                      }
                      onChange={(e) =>
                        setContent((prev) => ({
                          ...prev,
                          banners: {
                            ...prev.banners,
                            [editLang === 'ID' ? 'destinationsCalloutDescID' : 'destinationsCalloutDescEN']:
                              e.target.value
                          }
                        }))
                      }
                      className="w-full bg-slate-50 px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* Kartu-Kartu Destinasi */}
              <div className="space-y-6">
                {content.destinations.map((dest, idx) => {
                  const highlightsList = editLang === 'ID' ? dest.highlights : dest.highlightsEN;
                  return (
                    <div
                      key={dest.id || idx}
                      className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200/90 shadow-xs space-y-5"
                    >
                      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                        <div className="flex items-center gap-2.5">
                          <span className="w-7 h-7 rounded-full bg-emerald-600 text-white font-black text-xs flex items-center justify-center">
                            0{idx + 1}
                          </span>
                          <h3 className="font-display font-black text-lg text-slate-900 uppercase">
                            {editLang === 'ID' ? dest.name : dest.nameEN}
                          </h3>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            disabled={idx === 0}
                            onClick={() => {
                              const arr = [...content.destinations];
                              [arr[idx - 1], arr[idx]] = [arr[idx], arr[idx - 1]];
                              setContent((prev) => ({ ...prev, destinations: arr }));
                            }}
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-700 cursor-pointer"
                          >
                            <ArrowUp className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            disabled={idx === content.destinations.length - 1}
                            onClick={() => {
                              const arr = [...content.destinations];
                              [arr[idx], arr[idx + 1]] = [arr[idx + 1], arr[idx]];
                              setContent((prev) => ({ ...prev, destinations: arr }));
                            }}
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-700 cursor-pointer"
                          >
                            <ArrowDown className="w-4 h-4" />
                          </button>
                          {content.destinations.length > 1 && (
                            <button
                              type="button"
                              onClick={() => {
                                if (window.confirm(`Hapus destinasi "${dest.name}"?`)) {
                                  setContent((prev) => ({
                                    ...prev,
                                    destinations: prev.destinations.filter((_, i) => i !== idx)
                                  }));
                                }
                              }}
                              className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 cursor-pointer ml-1"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>

                      <ImageField
                        label={`Foto Destinasi: ${dest.name}`}
                        helperText="Preview gambar destinasi wisata"
                        value={dest.image}
                        onChange={(newUrl) => {
                          const arr = [...content.destinations];
                          arr[idx] = { ...arr[idx], image: newUrl };
                          setContent((prev) => ({ ...prev, destinations: arr }));
                        }}
                      />

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                        <div>
                          <label className="block text-xs font-extrabold text-slate-700 mb-1">
                            Nama Destinasi ({editLang})
                          </label>
                          <input
                            type="text"
                            value={editLang === 'ID' ? dest.name : dest.nameEN}
                            onChange={(e) => {
                              const arr = [...content.destinations];
                              if (editLang === 'ID') {
                                arr[idx] = { ...arr[idx], name: e.target.value };
                              } else {
                                arr[idx] = { ...arr[idx], nameEN: e.target.value };
                              }
                              setContent((prev) => ({ ...prev, destinations: arr }));
                            }}
                            className="w-full bg-slate-50 px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-bold"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-extrabold text-emerald-700 mb-1">
                            Harga Paket / Wisata ({editLang})
                          </label>
                          <input
                            type="text"
                            value={
                              editLang === 'ID'
                                ? dest.priceDisplay || ''
                                : dest.priceDisplayEN || dest.priceDisplay || ''
                            }
                            onChange={(e) => {
                              const arr = [...content.destinations];
                              if (editLang === 'ID') {
                                arr[idx] = {
                                  ...arr[idx],
                                  priceDisplay: e.target.value,
                                  priceDisplayEN: arr[idx].priceDisplayEN || e.target.value
                                };
                              } else {
                                arr[idx] = { ...arr[idx], priceDisplayEN: e.target.value };
                              }
                              setContent((prev) => ({ ...prev, destinations: arr }));
                            }}
                            placeholder="Contoh: Mulai Rp 350.000 / Org"
                            className="w-full bg-emerald-50/70 px-3.5 py-2.5 rounded-xl border border-emerald-300 text-sm font-extrabold text-emerald-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-extrabold text-slate-700 mb-1">
                            Sub-Judul / Tagline ({editLang})
                          </label>
                          <input
                            type="text"
                            value={editLang === 'ID' ? dest.tagline : dest.taglineEN}
                            onChange={(e) => {
                              const arr = [...content.destinations];
                              if (editLang === 'ID') {
                                arr[idx] = { ...arr[idx], tagline: e.target.value };
                              } else {
                                arr[idx] = { ...arr[idx], taglineEN: e.target.value };
                              }
                              setContent((prev) => ({ ...prev, destinations: arr }));
                            }}
                            className="w-full bg-slate-50 px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-extrabold text-slate-700 mb-1">
                            Label Badge Pojok Atas ({editLang})
                          </label>
                          <input
                            type="text"
                            value={editLang === 'ID' ? dest.badge : dest.badgeEN}
                            onChange={(e) => {
                              const arr = [...content.destinations];
                              if (editLang === 'ID') {
                                arr[idx] = { ...arr[idx], badge: e.target.value };
                              } else {
                                arr[idx] = { ...arr[idx], badgeEN: e.target.value };
                              }
                              setContent((prev) => ({ ...prev, destinations: arr }));
                            }}
                            className="w-full bg-slate-50 px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-extrabold text-slate-700 mb-1">
                            Kategori Filter
                          </label>
                          <select
                            value={
                              dest.category ||
                              (dest.id.includes('green-canyon') || dest.id.includes('citumang')
                                ? 'alam'
                                : 'pantai')
                            }
                            onChange={(e) => {
                              const arr = [...content.destinations];
                              arr[idx] = {
                                ...arr[idx],
                                category: e.target.value as 'pantai' | 'alam'
                              };
                              setContent((prev) => ({ ...prev, destinations: arr }));
                            }}
                            className="w-full bg-slate-50 px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-bold"
                          >
                            <option value="pantai">Wisata Pantai</option>
                            <option value="alam">Wisata Alam &amp; Rafting</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-extrabold text-slate-700 mb-1">
                          Deskripsi Destinasi ({editLang})
                        </label>
                        <textarea
                          rows={2}
                          value={editLang === 'ID' ? dest.description : dest.descriptionEN}
                          onChange={(e) => {
                            const arr = [...content.destinations];
                            if (editLang === 'ID') {
                              arr[idx] = { ...arr[idx], description: e.target.value };
                            } else {
                              arr[idx] = { ...arr[idx], descriptionEN: e.target.value };
                            }
                            setContent((prev) => ({ ...prev, destinations: arr }));
                          }}
                          className="w-full bg-slate-50 p-3 rounded-xl border border-slate-300 text-sm font-medium"
                        />
                      </div>

                      {/* Highlights */}
                      <div className="space-y-2.5 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-extrabold text-slate-700 uppercase">
                            Daya Tarik &amp; Aktivitas ({editLang})
                          </label>
                          <button
                            type="button"
                            onClick={() => {
                              const arr = [...content.destinations];
                              if (editLang === 'ID') {
                                arr[idx] = {
                                  ...arr[idx],
                                  highlights: [...arr[idx].highlights, 'Daya tarik baru']
                                };
                              } else {
                                arr[idx] = {
                                  ...arr[idx],
                                  highlightsEN: [...arr[idx].highlightsEN, 'New highlight']
                                };
                              }
                              setContent((prev) => ({ ...prev, destinations: arr }));
                            }}
                            className="text-xs font-bold text-emerald-700 bg-emerald-100 hover:bg-emerald-200 px-3 py-1 rounded-lg cursor-pointer"
                          >
                            + Tambah Daya Tarik
                          </button>
                        </div>

                        <div className="space-y-2">
                          {highlightsList.map((hl, hlIdx) => (
                            <div key={hlIdx} className="flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                              <input
                                type="text"
                                value={hl}
                                onChange={(e) => {
                                  const arr = [...content.destinations];
                                  if (editLang === 'ID') {
                                    const list = [...arr[idx].highlights];
                                    list[hlIdx] = e.target.value;
                                    arr[idx] = { ...arr[idx], highlights: list };
                                  } else {
                                    const list = [...arr[idx].highlightsEN];
                                    list[hlIdx] = e.target.value;
                                    arr[idx] = { ...arr[idx], highlightsEN: list };
                                  }
                                  setContent((prev) => ({ ...prev, destinations: arr }));
                                }}
                                className="flex-1 bg-white px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-semibold"
                              />
                              {highlightsList.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    const arr = [...content.destinations];
                                    if (editLang === 'ID') {
                                      arr[idx] = {
                                        ...arr[idx],
                                        highlights: arr[idx].highlights.filter((_, i) => i !== hlIdx)
                                      };
                                    } else {
                                      arr[idx] = {
                                        ...arr[idx],
                                        highlightsEN: arr[idx].highlightsEN.filter((_, i) => i !== hlIdx)
                                      };
                                    }
                                    setContent((prev) => ({ ...prev, destinations: arr }));
                                  }}
                                  className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg cursor-pointer"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* =================================================================
              TAB 5: TESTIMONI PELANGGAN
             ================================================================= */}
          {activeTab === 'testimonials' && (
            <div className="space-y-8">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-600">
                      BAGIAN 5 • TESTIMONI PELANGGAN
                    </span>
                    <h2 className="font-display font-black text-2xl text-slate-900">
                      Kelola Ulasan &amp; Foto Pelanggan
                    </h2>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      const newTesti = {
                        id: `testi-${Date.now()}`,
                        name: 'Pelanggan Baru',
                        roleID: 'Pelanggan Rute Pangandaran – Bandung',
                        roleEN: 'Customer - Pangandaran to Bandung',
                        textID: 'Pelayanan sangat ramah, mobil bersih, dan tepat waktu. Sangat direkomendasikan!',
                        textEN: 'Very friendly service, clean car, and punctual. Highly recommended!',
                        rating: 5,
                        image: '',
                        carModelID: 'Toyota Avanza',
                        carModelEN: 'Toyota Avanza',
                        dateID: 'Maret 2026',
                        dateEN: 'March 2026'
                      };
                      setContent((prev) => ({
                        ...prev,
                        testimonials: [...prev.testimonials, newTesti]
                      }));
                    }}
                    className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs cursor-pointer self-start"
                  >
                    <Plus className="w-4 h-4" />
                    <span>+ Tambah Testimoni</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-extrabold text-slate-700 mb-1">
                      Label Tag Testimoni ({editLang})
                    </label>
                    <input
                      type="text"
                      value={tCurr.testi_tag}
                      onChange={(e) => updateTranslation(editLang, 'testi_tag', e.target.value)}
                      className="w-full bg-slate-50 px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-extrabold text-slate-700 mb-1">
                      Judul Seksi Testimoni ({editLang})
                    </label>
                    <input
                      type="text"
                      value={tCurr.testi_title}
                      onChange={(e) => updateTranslation(editLang, 'testi_title', e.target.value)}
                      className="w-full bg-slate-50 px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-extrabold text-slate-700 mb-1">
                      Sub-Judul Testimoni ({editLang})
                    </label>
                    <input
                      type="text"
                      value={tCurr.testi_desc}
                      onChange={(e) => updateTranslation(editLang, 'testi_desc', e.target.value)}
                      className="w-full bg-slate-50 px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {content.testimonials.map((rev, idx) => (
                  <div
                    key={rev.id || idx}
                    className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200/90 shadow-xs space-y-5"
                  >
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <span className="font-display font-black text-base text-slate-900">
                        Testimoni #{idx + 1} — {rev.name}
                      </span>
                      {content.testimonials.length > 1 && (
                        <button
                          type="button"
                          onClick={() => {
                            if (window.confirm(`Hapus testimoni dari "${rev.name}"?`)) {
                              setContent((prev) => ({
                                ...prev,
                                testimonials: prev.testimonials.filter((_, i) => i !== idx)
                              }));
                            }
                          }}
                          className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    <ImageField
                      label={`Foto Profil: ${rev.name}`}
                      helperText="Foto wajah atau avatar pelanggan"
                      value={rev.image}
                      aspect="square"
                      onChange={(newUrl) => {
                        const arr = [...content.testimonials];
                        arr[idx] = { ...arr[idx], image: newUrl };
                        setContent((prev) => ({ ...prev, testimonials: arr }));
                      }}
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div>
                        <label className="block text-xs font-extrabold text-slate-700 mb-1">
                          Nama Pelanggan
                        </label>
                        <input
                          type="text"
                          value={rev.name}
                          onChange={(e) => {
                            const arr = [...content.testimonials];
                            arr[idx] = { ...arr[idx], name: e.target.value };
                            setContent((prev) => ({ ...prev, testimonials: arr }));
                          }}
                          className="w-full bg-slate-50 px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-bold"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-extrabold text-slate-700 mb-1">
                          Keterangan Rute ({editLang})
                        </label>
                        <input
                          type="text"
                          value={editLang === 'ID' ? rev.roleID : rev.roleEN}
                          onChange={(e) => {
                            const arr = [...content.testimonials];
                            if (editLang === 'ID') {
                              arr[idx] = { ...arr[idx], roleID: e.target.value };
                            } else {
                              arr[idx] = { ...arr[idx], roleEN: e.target.value };
                            }
                            setContent((prev) => ({ ...prev, testimonials: arr }));
                          }}
                          className="w-full bg-slate-50 px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-extrabold text-slate-700 mb-1">
                          Kendaraan yang Disewa
                        </label>
                        <input
                          type="text"
                          value={editLang === 'ID' ? rev.carModelID : rev.carModelEN}
                          onChange={(e) => {
                            const arr = [...content.testimonials];
                            arr[idx] = {
                              ...arr[idx],
                              carModelID: e.target.value,
                              carModelEN: e.target.value
                            };
                            setContent((prev) => ({ ...prev, testimonials: arr }));
                          }}
                          className="w-full bg-slate-50 px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-extrabold text-slate-700 mb-1">
                          Bulan / Tahun ({editLang})
                        </label>
                        <input
                          type="text"
                          value={editLang === 'ID' ? rev.dateID : rev.dateEN}
                          onChange={(e) => {
                            const arr = [...content.testimonials];
                            if (editLang === 'ID') {
                              arr[idx] = { ...arr[idx], dateID: e.target.value };
                            } else {
                              arr[idx] = { ...arr[idx], dateEN: e.target.value };
                            }
                            setContent((prev) => ({ ...prev, testimonials: arr }));
                          }}
                          className="w-full bg-slate-50 px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-extrabold text-slate-700 mb-1">
                        Isi Ulasan / Testimoni ({editLang})
                      </label>
                      <textarea
                        rows={3}
                        value={editLang === 'ID' ? rev.textID : rev.textEN}
                        onChange={(e) => {
                          const arr = [...content.testimonials];
                          if (editLang === 'ID') {
                            arr[idx] = { ...arr[idx], textID: e.target.value };
                          } else {
                            arr[idx] = { ...arr[idx], textEN: e.target.value };
                          }
                          setContent((prev) => ({ ...prev, testimonials: arr }));
                        }}
                        className="w-full bg-slate-50 p-3 rounded-xl border border-slate-300 text-sm font-medium"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =================================================================
              TAB 6: HALAMAN TENTANG KAMI (PROFIL, VISI MISI, KEUNGGULAN, LAYANAN)
             ================================================================= */}
          {activeTab === 'about' && (
            <div className="space-y-8">
              {/* Profil & Banner */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-5">
                <div className="border-b border-slate-100 pb-4">
                  <span className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-600">
                    BAGIAN 6 • HALAMAN TENTANG KAMI
                  </span>
                  <h2 className="font-display font-black text-2xl text-slate-900">
                    Profil Perusahaan, Visi Misi, Keunggulan &amp; Layanan
                  </h2>
                </div>

                <ImageField
                  label="Foto Banner Atas Halaman Tentang Kami"
                  helperText="Gambar latar belakang di bagian atas Halaman Tentang Kami"
                  value={content.banners.aboutBannerImage}
                  aspect="banner"
                  onChange={(newUrl) =>
                    setContent((prev) => ({
                      ...prev,
                      banners: { ...prev.banners, aboutBannerImage: newUrl }
                    }))
                  }
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-extrabold text-slate-700 mb-1">
                      Tag Profil Bisnis ({editLang})
                    </label>
                    <input
                      type="text"
                      value={tCurr.about_tag}
                      onChange={(e) => updateTranslation(editLang, 'about_tag', e.target.value)}
                      className="w-full bg-slate-50 px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-extrabold text-slate-700 mb-1">
                      Sub-Judul Bidang Layanan ({editLang})
                    </label>
                    <input
                      type="text"
                      value={tCurr.about_title_2}
                      onChange={(e) => updateTranslation(editLang, 'about_title_2', e.target.value)}
                      className="w-full bg-slate-50 px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-extrabold text-slate-700 mb-1">
                      Paragraf Profil 1 ({editLang})
                    </label>
                    <textarea
                      rows={2}
                      value={tCurr.about_desc_1}
                      onChange={(e) => updateTranslation(editLang, 'about_desc_1', e.target.value)}
                      className="w-full bg-slate-50 p-3 rounded-xl border border-slate-300 text-sm font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-extrabold text-slate-700 mb-1">
                      Paragraf Profil 2 ({editLang})
                    </label>
                    <textarea
                      rows={2}
                      value={tCurr.about_desc_2}
                      onChange={(e) => updateTranslation(editLang, 'about_desc_2', e.target.value)}
                      className="w-full bg-slate-50 p-3 rounded-xl border border-slate-300 text-sm font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-extrabold text-slate-700 mb-1">
                      Paragraf Profil 3 ({editLang})
                    </label>
                    <textarea
                      rows={2}
                      value={tCurr.about_desc_3}
                      onChange={(e) => updateTranslation(editLang, 'about_desc_3', e.target.value)}
                      className="w-full bg-slate-50 p-3 rounded-xl border border-slate-300 text-sm font-medium"
                    />
                  </div>
                </div>

                {/* Kotak Info Ringkas */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <h3 className="font-display font-black text-sm text-slate-800 uppercase">
                    Kotak Kartu "Info Ringkas" (Samping Deskripsi)
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Nama</label>
                      <input
                        type="text"
                        value={content.aboutQuickInfo.companyName}
                        onChange={(e) =>
                          setContent((prev) => ({
                            ...prev,
                            aboutQuickInfo: { ...prev.aboutQuickInfo, companyName: e.target.value }
                          }))
                        }
                        className="w-full bg-white px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Tagline</label>
                      <input
                        type="text"
                        value={content.aboutQuickInfo.tagline}
                        onChange={(e) =>
                          setContent((prev) => ({
                            ...prev,
                            aboutQuickInfo: { ...prev.aboutQuickInfo, tagline: e.target.value }
                          }))
                        }
                        className="w-full bg-white px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Layanan</label>
                      <input
                        type="text"
                        value={content.aboutQuickInfo.servicesSummary}
                        onChange={(e) =>
                          setContent((prev) => ({
                            ...prev,
                            aboutQuickInfo: { ...prev.aboutQuickInfo, servicesSummary: e.target.value }
                          }))
                        }
                        className="w-full bg-white px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Rute Utama</label>
                      <input
                        type="text"
                        value={content.aboutQuickInfo.mainRoute}
                        onChange={(e) =>
                          setContent((prev) => ({
                            ...prev,
                            aboutQuickInfo: { ...prev.aboutQuickInfo, mainRoute: e.target.value }
                          }))
                        }
                        className="w-full bg-white px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Armada</label>
                      <input
                        type="text"
                        value={content.aboutQuickInfo.fleetSummary}
                        onChange={(e) =>
                          setContent((prev) => ({
                            ...prev,
                            aboutQuickInfo: { ...prev.aboutQuickInfo, fleetSummary: e.target.value }
                          }))
                        }
                        className="w-full bg-white px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Visi & Misi */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-5">
                <h3 className="font-display font-black text-xl text-slate-900 uppercase">
                  Visi &amp; Misi Perusahaan ({editLang})
                </h3>

                <div>
                  <label className="block text-xs font-extrabold text-slate-700 mb-1">
                    Kalimat Visi Utama ({editLang})
                  </label>
                  <textarea
                    rows={2}
                    value={tCurr.vision_1}
                    onChange={(e) => updateTranslation(editLang, 'vision_1', e.target.value)}
                    className="w-full bg-slate-50 p-3 rounded-xl border border-slate-300 text-sm font-medium"
                  />
                </div>

                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-extrabold text-slate-700 uppercase">
                      Daftar Poin Misi ({editLang})
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        if (editLang === 'ID') {
                          setContent((prev) => ({
                            ...prev,
                            missionsID: [...prev.missionsID, 'Poin misi baru']
                          }));
                        } else {
                          setContent((prev) => ({
                            ...prev,
                            missionsEN: [...prev.missionsEN, 'New mission point']
                          }));
                        }
                      }}
                      className="text-xs font-bold text-emerald-700 bg-emerald-100 hover:bg-emerald-200 px-3 py-1 rounded-lg cursor-pointer"
                    >
                      + Tambah Poin Misi
                    </button>
                  </div>

                  {(editLang === 'ID' ? content.missionsID : content.missionsEN).map((m, mIdx) => (
                    <div key={mIdx} className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center shrink-0">
                        {mIdx + 1}
                      </span>
                      <input
                        type="text"
                        value={m}
                        onChange={(e) => {
                          if (editLang === 'ID') {
                            const list = [...content.missionsID];
                            list[mIdx] = e.target.value;
                            setContent((prev) => ({ ...prev, missionsID: list }));
                          } else {
                            const list = [...content.missionsEN];
                            list[mIdx] = e.target.value;
                            setContent((prev) => ({ ...prev, missionsEN: list }));
                          }
                        }}
                        className="flex-1 bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-semibold"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (editLang === 'ID') {
                            setContent((prev) => ({
                              ...prev,
                              missionsID: prev.missionsID.filter((_, i) => i !== mIdx)
                            }));
                          } else {
                            setContent((prev) => ({
                              ...prev,
                              missionsEN: prev.missionsEN.filter((_, i) => i !== mIdx)
                            }));
                          }
                        }}
                        className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Keunggulan & Layanan */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Keunggulan */}
                <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
                  <h3 className="font-display font-black text-lg text-slate-900 uppercase">
                    Keunggulan Kami ({editLang})
                  </h3>
                  {content.strengths.map((st, idx) => (
                    <div key={st.id || idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                      <input
                        type="text"
                        value={editLang === 'ID' ? st.titleID : st.titleEN}
                        onChange={(e) => {
                          const arr = [...content.strengths];
                          if (editLang === 'ID') {
                            arr[idx] = { ...arr[idx], titleID: e.target.value };
                          } else {
                            arr[idx] = { ...arr[idx], titleEN: e.target.value };
                          }
                          setContent((prev) => ({ ...prev, strengths: arr }));
                        }}
                        className="w-full bg-white px-3 py-2 rounded-xl border border-slate-300 text-xs font-extrabold"
                      />
                      <textarea
                        rows={2}
                        value={editLang === 'ID' ? st.descID : st.descEN}
                        onChange={(e) => {
                          const arr = [...content.strengths];
                          if (editLang === 'ID') {
                            arr[idx] = { ...arr[idx], descID: e.target.value };
                          } else {
                            arr[idx] = { ...arr[idx], descEN: e.target.value };
                          }
                          setContent((prev) => ({ ...prev, strengths: arr }));
                        }}
                        className="w-full bg-white p-2.5 rounded-xl border border-slate-300 text-xs font-medium"
                      />
                    </div>
                  ))}
                </div>

                {/* Layanan Utama */}
                <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
                  <h3 className="font-display font-black text-lg text-slate-900 uppercase">
                    Layanan Utama ({editLang})
                  </h3>
                  {content.services.map((srv, idx) => (
                    <div key={srv.id || idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                      <input
                        type="text"
                        value={editLang === 'ID' ? srv.titleID : srv.titleEN}
                        onChange={(e) => {
                          const arr = [...content.services];
                          if (editLang === 'ID') {
                            arr[idx] = { ...arr[idx], titleID: e.target.value };
                          } else {
                            arr[idx] = { ...arr[idx], titleEN: e.target.value };
                          }
                          setContent((prev) => ({ ...prev, services: arr }));
                        }}
                        className="w-full bg-white px-3 py-2 rounded-xl border border-slate-300 text-xs font-extrabold"
                      />
                      <textarea
                        rows={2}
                        value={editLang === 'ID' ? srv.descID : srv.descEN}
                        onChange={(e) => {
                          const arr = [...content.services];
                          if (editLang === 'ID') {
                            arr[idx] = { ...arr[idx], descID: e.target.value };
                          } else {
                            arr[idx] = { ...arr[idx], descEN: e.target.value };
                          }
                          setContent((prev) => ({ ...prev, services: arr }));
                        }}
                        className="w-full bg-white p-2.5 rounded-xl border border-slate-300 text-xs font-medium"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* =================================================================
              TAB 7: CARA PESAN, FORM RESERVASI & FOOTER / SEO
             ================================================================= */}
          {activeTab === 'steps_footer' && (
            <div className="space-y-8">
              {/* 3 Langkah Pemesanan */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-5">
                <h2 className="font-display font-black text-2xl text-slate-900">
                  3 Langkah Pemesanan Mudah ({editLang})
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-extrabold text-slate-700 mb-1">
                      Judul Seksi Langkah Pemesanan
                    </label>
                    <input
                      type="text"
                      value={tCurr.steps_title}
                      onChange={(e) => updateTranslation(editLang, 'steps_title', e.target.value)}
                      className="w-full bg-slate-50 px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-extrabold text-slate-700 mb-1">
                      Sub-Judul Langkah Pemesanan
                    </label>
                    <input
                      type="text"
                      value={tCurr.steps_desc}
                      onChange={(e) => updateTranslation(editLang, 'steps_desc', e.target.value)}
                      className="w-full bg-slate-50 px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {content.steps.map((st, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
                      <span className="inline-block bg-emerald-600 text-white text-xs font-black px-2.5 py-0.5 rounded-full">
                        Langkah {st.step}
                      </span>
                      <input
                        type="text"
                        value={editLang === 'ID' ? st.titleID : st.titleEN}
                        onChange={(e) => {
                          const arr = [...content.steps];
                          if (editLang === 'ID') {
                            arr[idx] = { ...arr[idx], titleID: e.target.value };
                          } else {
                            arr[idx] = { ...arr[idx], titleEN: e.target.value };
                          }
                          setContent((prev) => ({ ...prev, steps: arr }));
                        }}
                        className="w-full bg-white px-3 py-2 rounded-xl border border-slate-300 text-xs font-extrabold"
                      />
                      <textarea
                        rows={3}
                        value={editLang === 'ID' ? st.descID : st.descEN}
                        onChange={(e) => {
                          const arr = [...content.steps];
                          if (editLang === 'ID') {
                            arr[idx] = { ...arr[idx], descID: e.target.value };
                          } else {
                            arr[idx] = { ...arr[idx], descEN: e.target.value };
                          }
                          setContent((prev) => ({ ...prev, steps: arr }));
                        }}
                        className="w-full bg-white p-2.5 rounded-xl border border-slate-300 text-xs font-medium"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Form Reservasi Popup */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-5">
                <h2 className="font-display font-black text-2xl text-slate-900">
                  Popup Form Reservasi Perjalanan ({editLang})
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-extrabold text-slate-700 mb-1">
                      Judul Form Reservasi
                    </label>
                    <input
                      type="text"
                      value={tCurr.modal_title}
                      onChange={(e) => updateTranslation(editLang, 'modal_title', e.target.value)}
                      className="w-full bg-slate-50 px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-extrabold text-slate-700 mb-1">
                      Sub-Judul Form Reservasi
                    </label>
                    <input
                      type="text"
                      value={tCurr.modal_desc}
                      onChange={(e) => updateTranslation(editLang, 'modal_desc', e.target.value)}
                      className="w-full bg-slate-50 px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-extrabold text-slate-700 mb-1">
                      Teks Tombol Kirim Reservasi WA
                    </label>
                    <input
                      type="text"
                      value={tCurr.modal_btn_confirm}
                      onChange={(e) => updateTranslation(editLang, 'modal_btn_confirm', e.target.value)}
                      className="w-full bg-slate-50 px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-bold"
                    />
                  </div>
                </div>
              </div>

              {/* Footer & SEO */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-5">
                <h2 className="font-display font-black text-2xl text-slate-900">
                  Bagian Bawah Website (Footer) &amp; Judul Google SEO ({editLang})
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-extrabold text-slate-700 mb-1">
                      Judul Kartu Callout Footer
                    </label>
                    <input
                      type="text"
                      value={tCurr.footer_callout_title}
                      onChange={(e) => updateTranslation(editLang, 'footer_callout_title', e.target.value)}
                      className="w-full bg-slate-50 px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-extrabold text-slate-700 mb-1">
                      Teks Tombol WA di Footer
                    </label>
                    <input
                      type="text"
                      value={tCurr.footer_callout_wa_btn}
                      onChange={(e) => updateTranslation(editLang, 'footer_callout_wa_btn', e.target.value)}
                      className="w-full bg-slate-50 px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-bold"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-extrabold text-slate-700 mb-1">
                      Deskripsi Singkat Perusahaan di Footer
                    </label>
                    <textarea
                      rows={2}
                      value={tCurr.footer_col1_desc}
                      onChange={(e) => updateTranslation(editLang, 'footer_col1_desc', e.target.value)}
                      className="w-full bg-slate-50 p-3 rounded-xl border border-slate-300 text-sm font-medium"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-extrabold text-slate-700 mb-1">
                      Teks Hak Cipta (Copyright Paling Bawah)
                    </label>
                    <input
                      type="text"
                      value={content.brand.copyrightText}
                      onChange={(e) =>
                        setContent((prev) => ({
                          ...prev,
                          brand: { ...prev.brand, copyrightText: e.target.value }
                        }))
                      }
                      className="w-full bg-slate-50 px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-extrabold text-slate-700 mb-1">
                      Judul Tab Browser / SEO Title ({editLang})
                    </label>
                    <input
                      type="text"
                      value={tCurr.seo_title}
                      onChange={(e) => updateTranslation(editLang, 'seo_title', e.target.value)}
                      className="w-full bg-slate-50 px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-extrabold text-slate-700 mb-1">
                      Deskripsi Pencarian Google / Meta Description ({editLang})
                    </label>
                    <textarea
                      rows={2}
                      value={tCurr.seo_description}
                      onChange={(e) => updateTranslation(editLang, 'seo_description', e.target.value)}
                      className="w-full bg-slate-50 p-3 rounded-xl border border-slate-300 text-sm font-medium"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =================================================================
              TAB 8: STATUS SUPABASE AKTIF 24/7 (ANTI-PAUSE 7 HARI) & SETUP SQL
             ================================================================= */}
          {activeTab === 'keepalive' && (
            <div className="space-y-8">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-200 shadow-xs space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                  <div className="space-y-1">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                      <HeartPulse className="w-3.5 h-3.5 text-emerald-600" />
                      PROTEKSI AKTIF 24/7
                    </span>
                    <h2 className="font-display font-black text-2xl text-slate-900">
                      Sistem Anti-Nonaktif 7 Hari Supabase Free Tier
                    </h2>
                    <p className="text-xs text-slate-500">
                      Menjaga database Supabase Anda tetap aktif selamanya dengan ping baca/tulis otomatis setiap 6 jam.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={triggerManualKeepAlive}
                    className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-3 rounded-xl shadow-md cursor-pointer self-start"
                  >
                    <RefreshCw className={`w-4 h-4 ${keepAlive.status === 'PINGING' ? 'animate-spin' : ''}`} />
                    <span>Ping Supabase Sekarang</span>
                  </button>
                </div>

                {/* Status Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-1">
                    <span className="text-[10px] font-extrabold uppercase text-emerald-700">
                      Status Koneksi
                    </span>
                    <p className="font-display font-black text-lg text-emerald-800 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-ping" />
                      AKTIF &amp; AMAN
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                    <span className="text-[10px] font-extrabold uppercase text-slate-500">
                      Waktu Ping Terakhir
                    </span>
                    <p className="font-bold text-xs text-slate-800">
                      {new Date(keepAlive.lastPingAt).toLocaleString('id-ID')}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                    <span className="text-[10px] font-extrabold uppercase text-slate-500">
                      Jadwal Ping Berikutnya
                    </span>
                    <p className="font-bold text-xs text-slate-800">
                      {new Date(keepAlive.nextPingAt).toLocaleString('id-ID')}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                    <span className="text-[10px] font-extrabold uppercase text-slate-500">
                      Sumber Heartbeat
                    </span>
                    <p className="font-bold text-xs text-emerald-700">
                      {keepAlive.lastSource} ({keepAlive.totalPings}x Ping)
                    </p>
                  </div>
                </div>

                {/* Cara Kerja 4 Lapis */}
                <div className="p-5 rounded-2xl bg-sky-50/70 border border-sky-200 space-y-2 text-xs text-slate-700">
                  <p className="font-extrabold text-sky-950">
                    🛡️ 4 Lapisan Proteksi Otomatis yang Sudah Terpasang:
                  </p>
                  <ul className="list-disc list-inside space-y-1 font-medium">
                    <li>
                      <strong>Lapis 1 (Server Node Cron):</strong> Server SSR melakukan aktivitas baca &amp; tulis ke tabel Supabase otomatis setiap 6 jam sekali.
                    </li>
                    <li>
                      <strong>Lapis 2 (Endpoint Keep-Alive Publik):</strong> Tersedia endpoint <code className="bg-white px-1.5 py-0.5 rounded border">/api/keep-alive</code> yang bisa dipanggil kapan saja.
                    </li>
                    <li>
                      <strong>Lapis 3 (GitHub Actions Cron):</strong> File workflow otomatis <code className="bg-white px-1.5 py-0.5 rounded border">.github/workflows/supabase-keep-alive.yml</code> mem-ping Supabase setiap hari.
                    </li>
                    <li>
                      <strong>Lapis 4 (Browser Smart Ping):</strong> Setiap kali pengunjung membuka website, sistem memastikan aktivitas database tercatat.
                    </li>
                  </ul>
                </div>

                {/* SQL Setup Section */}
                <div className="space-y-3 pt-4 border-t border-slate-200">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <h3 className="font-display font-black text-base text-slate-900">
                        Kode SQL Setup Tabel &amp; Storage Supabase
                      </h3>
                      <p className="text-xs text-slate-500">
                        Jika Anda belum pernah menjalankan SQL ini di proyek Supabase Anda, salin dan tempelkan ke menu <strong>SQL Editor</strong> di Supabase lalu klik <strong>Run</strong>.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleCopySql}
                      className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-black text-white font-bold text-xs px-4 py-2.5 rounded-xl cursor-pointer"
                    >
                      {sqlCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      <span>{sqlCopied ? 'Kode SQL Disalin!' : 'Salin Kode SQL'}</span>
                    </button>
                  </div>

                  <pre className="bg-slate-900 text-emerald-300 p-4 rounded-2xl text-[11px] overflow-x-auto max-h-64 font-mono leading-relaxed">
                    {SUPABASE_SETUP_SQL}
                  </pre>
                </div>
              </div>
            </div>
          )}

          {/* BOTTOM FLOATING / STICKY SAVE BAR FOR CONVENIENCE */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-md flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>Sudah selesai mengubah teks atau foto? Jangan lupa klik Simpan Perubahan.</span>
            </div>
            <button
              type="button"
              onClick={handleSaveAll}
              disabled={isSaving}
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white font-display font-black text-xs uppercase tracking-wider px-6 py-3 rounded-xl shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? 'Menyimpan...' : 'Simpan Semua Perubahan'}</span>
            </button>
          </div>
        </main>
      </div>

      {/* Modal Setup SQL */}
      {showSqlModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-4 text-left">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-display font-black text-lg text-slate-900">
                Setup Tabel Database Supabase (Hanya 1x)
              </h3>
              <button
                type="button"
                onClick={() => setShowSqlModal(false)}
                className="p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <ol className="list-decimal list-inside space-y-1.5 text-xs text-slate-700 font-medium">
              <li>Klik tombol <strong>"Salin Kode SQL"</strong> di bawah ini.</li>
              <li>
                Buka Dashboard Supabase Anda, pilih menu <strong>SQL Editor</strong> di sebelah kiri.
              </li>
              <li>Tempel (Paste) kode tersebut lalu klik tombol <strong>Run</strong>.</li>
              <li>Setelah itu klik <strong>Simpan Perubahan</strong> kembali di halaman ini.</li>
            </ol>

            <pre className="bg-slate-900 text-emerald-300 p-4 rounded-2xl text-[11px] overflow-x-auto max-h-60 font-mono">
              {SUPABASE_SETUP_SQL}
            </pre>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={handleCopySql}
                className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl cursor-pointer"
              >
                {sqlCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{sqlCopied ? 'Berhasil Disalin!' : 'Salin Kode SQL'}</span>
              </button>
              <button
                type="button"
                onClick={() => setShowSqlModal(false)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-4 py-2.5 rounded-xl cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
