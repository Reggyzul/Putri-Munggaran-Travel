import React, { useState, useEffect } from 'react';
import { Car } from '../types';
import { CARS } from '../data/cars';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Calendar, Clock, MapPin, User, Phone, CheckCircle2, ShieldCheck, Sparkles, Bus, Award } from 'lucide-react';
import { TRANSLATIONS } from '../utils/translations';

interface BookingModalProps {
  car: Car | null;
  onClose: () => void;
  lang: 'ID' | 'EN';
  onCarChange?: (car: Car) => void;
}

export default function BookingModal({ car, onClose, lang, onCarChange }: BookingModalProps) {
  const [routeCategory, setRouteCategory] = useState<'in_sumbar' | 'out_sumbar' | 'internasional' | 'sewa_armada'>('in_sumbar');
  const [selectedCarId, setSelectedCarId] = useState<string>(car?.id || 'bus-zivanes');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [passengers, setPassengers] = useState('40 Orang (1 Bus)');
  const [departureDate, setDepartureDate] = useState('');
  const [pickupTime, setPickupTime] = useState('07:00 (Pagi)');
  const [durationDays, setDurationDays] = useState('3 Hari 2 Malam');
  const [pickupAddress, setPickupAddress] = useState('');
  const [destinations, setDestinations] = useState('');
  const [notes, setNotes] = useState('');
  const [isBooked, setIsBooked] = useState(false);

  const t = TRANSLATIONS[lang];

  useEffect(() => {
    if (car) {
      setSelectedCarId(car.id);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [car]);

  if (!car) return null;

  const currentSelectedCar = CARS.find(c => c.id === selectedCarId) || car;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !departureDate || !pickupAddress) {
      alert('Mohon lengkapi semua kolom yang wajib diisi (*)!');
      return;
    }

    const waNumber = '628562042336';

    let routeText = 'Sewa Mobil & Kendaraan';
    if (routeCategory === 'out_sumbar') routeText = 'Sewa Bus Pariwisata';
    if (routeCategory === 'internasional') routeText = 'Paket Wisata & Tour';
    if (routeCategory === 'sewa_armada') routeText = 'Perjalanan Dinas / Gathering / Event';

    const textTemplate = `Halo Restu Tour & Transport, saya ingin berkonsultasi & melakukan reservasi:

📋 *DETAIL RESERVASI PERJALANAN:*
• Layanan / Kategori: *${routeText}*
• Armada Pilihan: *${currentSelectedCar.name}* (${currentSelectedCar.category})
• Tanggal Pelaksanaan: *${departureDate}*
• Jam Penjemputan: *${pickupTime}*
• Durasi Perjalanan: *${durationDays}*
• Jumlah Peserta: *${passengers}*

👤 *DATA PEMESAN / INSTANSI:*
• Nama Pemesan: *${name}*
• No. WhatsApp: *${phone}*
• Alamat Penjemputan: *${pickupAddress}*
• Impian Destinasi: *${destinations || '-'}*
• Catatan Khusus: *${notes || '-'}*

Mohon konfirmasi ketersediaan armada, jadwal & penawaran harga terbaik. Terima kasih!`;

    const encodedText = encodeURIComponent(textTemplate);
    const waUrl = `https://api.whatsapp.com/send?phone=${waNumber}&text=${encodedText}`;
    
    window.open(waUrl, '_blank', 'noreferrer');
    setIsBooked(true);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex flex-col items-center justify-start pt-24 sm:pt-28 pb-6 px-3 sm:px-6 overflow-hidden">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-0"
          id="booking-backdrop"
        />

        {/* Modal Panel Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="bg-white rounded-3xl w-full max-w-4xl shadow-2xl relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 z-10 my-auto border border-slate-200 max-h-[calc(100vh-8.5rem)]"
          id="booking-modal-panel"
        >
          
          {/* LEFT SIDEBAR: CAR & COMPANY PREVIEW */}
          <div className="lg:col-span-4 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-950 text-white p-6 sm:p-7 flex flex-col justify-between relative overflow-hidden text-left">
            <div className="space-y-5 relative z-10">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/30 text-red-400 text-[10px] font-extrabold uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5 text-red-400" />
                <span>CV. ANUGRAH PARIWISATA</span>
              </div>

              <div>
                <h3 className="font-display font-black text-2xl text-white uppercase tracking-tight">
                  {currentSelectedCar.name}
                </h3>
                <p className="font-sans text-xs text-red-400 font-bold mt-0.5">
                  {currentSelectedCar.category} ({currentSelectedCar.seats} Kursi)
                </p>
              </div>

              {/* Car Cutout Photo */}
              <div className="rounded-2xl overflow-hidden border border-white/10 shadow-lg bg-slate-800/80 aspect-[16/10] p-2 flex items-center justify-center">
                <img
                  src={currentSelectedCar.image}
                  alt={currentSelectedCar.name}
                  className="w-full h-full object-contain drop-shadow-md"
                />
              </div>

              {/* Specs & Facility List */}
              <div className="space-y-2 text-xs text-slate-300 border-t border-white/10 pt-4">
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-slate-400">Kapasitas:</span>
                  <span className="font-semibold text-white">{currentSelectedCar.seats} Kursi</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-slate-400">Fasilitas Bus:</span>
                  <span className="font-semibold text-green-600">Full AC, Toilet, Karaoke</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-slate-400">Pelayanan:</span>
                  <span className="font-semibold text-red-400">Driver & Kru Ramah</span>
                </div>
              </div>

              {/* Motto Card */}
              <div className="p-3.5 rounded-2xl bg-red-500/10 border border-red-500/30 text-left space-y-1">
                <div className="flex items-center gap-1.5 text-red-400 font-extrabold text-[11px] uppercase tracking-wide">
                  <Award className="w-4 h-4 shrink-0 text-red-400" />
                  <span>Wisata Hemat Travel Hebat</span>
                </div>
                <p className="font-sans text-[11px] text-slate-300 leading-relaxed font-medium">
                  Pelayanan tour terbaik, keselamatan diutamakan, dan hotel/restoran pilihan.
                </p>
              </div>

            </div>

            {/* Footer Trust Info */}
            <div className="pt-4 border-t border-white/10 mt-6 text-[10px] text-slate-400 font-medium flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
              <span>Respon Cepat via WhatsApp Official</span>
            </div>
          </div>

          {/* RIGHT SIDEBAR: PROFESSIONAL WA FORM */}
          <div className="lg:col-span-8 p-6 sm:p-8 bg-white max-h-[80vh] overflow-y-auto relative text-left">
            
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 sm:top-5 sm:right-5 w-9 h-9 rounded-full bg-red-600 hover:bg-red-700 text-white transition-all flex items-center justify-center shadow-2xl cursor-pointer z-50 hover:scale-110 border-2 border-white"
              id="close-booking-modal"
              title="Tutup Modal (Kembali)"
            >
              <X className="w-5 h-5 stroke-[2.5]" />
            </button>

            {!isBooked ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Header Title */}
                <div>
                  <h4 className="font-display font-black text-xl sm:text-2xl text-[#0f172a] uppercase tracking-tight">
                    Form Reservasi Tour & Armada
                  </h4>
                  <p className="font-sans text-xs text-slate-500 leading-relaxed font-medium mt-1">
                    Lengkapi data pemesanan di bawah ini. Tim CV. Anugrah Pariwisata akan segera merespons via WhatsApp.
                  </p>
                </div>

                {/* 1. PILIH KATEGORI TOUR & ARMADA */}
                <div className="space-y-4 pt-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-red-600 block">
                    1. PILIH KATEGORI TOUR & ARMADA
                  </span>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <button
                      type="button"
                      onClick={() => setRouteCategory('in_sumbar')}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                        routeCategory === 'in_sumbar'
                          ? 'border-red-500 bg-red-50/70 text-red-950 font-bold shadow-xs'
                          : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium'
                      }`}
                    >
                      <span className="text-[11px] font-bold block">In Sumbar</span>
                      <span className="text-[9px] text-slate-500 block">Bukittinggi, Painan</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setRouteCategory('out_sumbar')}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                        routeCategory === 'out_sumbar'
                          ? 'border-amber-500 bg-red-50/70 text-red-950 font-bold shadow-xs'
                          : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium'
                      }`}
                    >
                      <span className="text-[11px] font-bold block">Out Sumbar</span>
                      <span className="text-[9px] text-slate-500 block">Bromo, Bali, Toba</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setRouteCategory('internasional')}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                        routeCategory === 'internasional'
                          ? 'border-blue-500 bg-blue-50/70 text-blue-950 font-bold shadow-xs'
                          : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium'
                      }`}
                    >
                      <span className="text-[11px] font-bold block">Internasional</span>
                      <span className="text-[9px] text-slate-500 block">Singapura, Malaysia</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setRouteCategory('sewa_armada')}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                        routeCategory === 'sewa_armada'
                          ? 'border-green-500 bg-green-100/70 text-green-600 font-bold shadow-xs'
                          : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium'
                      }`}
                    >
                      <span className="text-[11px] font-bold block">Sewa Armada</span>
                      <span className="text-[9px] text-slate-500 block">Bus / Hiace Only</span>
                    </button>
                  </div>

                  {/* Dropdown Pilihan Armada */}
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                      Pilihan Armada Bus / Mobil <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={selectedCarId}
                      onChange={(e) => {
                        setSelectedCarId(e.target.value);
                        const newCar = CARS.find(c => c.id === e.target.value);
                        if (newCar && onCarChange) onCarChange(newCar);
                      }}
                      className="block w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 text-xs font-sans font-semibold text-slate-900 cursor-pointer bg-white"
                    >
                      {CARS.map(c => (
                        <option key={c.id} value={c.id}>
                          {c.name} ({c.category} - {c.seats} Kursi)
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* 2. DATA PEMESAN */}
                <div className="space-y-3 pt-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-red-600 block">
                    2. DATA PEMESAN & KONTAK
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                        Nama Lengkap / Instansi <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Contoh: Hj. Rahmawati / SMAN 1 Padang"
                          className="block w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 text-xs font-sans text-slate-900"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                        Nomor WhatsApp Active <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="Contoh: 082178284459"
                          className="block w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 text-xs font-sans text-slate-900"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. JADWAL & LOKASI PENJEMPUTAN */}
                <div className="space-y-3 pt-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-red-600 block">
                    3. JADWAL & ALAMAT PENJEMPUTAN
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                        Tanggal Berangkat <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        required
                        value={departureDate}
                        onChange={(e) => setDepartureDate(e.target.value)}
                        className="block w-full px-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 text-xs font-sans text-slate-900"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                        Durasi Tour
                      </label>
                      <input
                        type="text"
                        value={durationDays}
                        onChange={(e) => setDurationDays(e.target.value)}
                        placeholder="3 Hari 2 Malam / 1 Hari"
                        className="block w-full px-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 text-xs font-sans text-slate-900"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                        Jumlah Peserta
                      </label>
                      <input
                        type="text"
                        value={passengers}
                        onChange={(e) => setPassengers(e.target.value)}
                        placeholder="40 Orang / 1 Bus"
                        className="block w-full px-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 text-xs font-sans text-slate-900"
                      />
                    </div>
                  </div>

                  {/* Address Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                        Alamat Lengkap Penjemputan <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        required
                        rows={2}
                        value={pickupAddress}
                        onChange={(e) => setPickupAddress(e.target.value)}
                        placeholder="Contoh: Jl. Andalas I No. 48 F Padang Timur..."
                        className="block w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 text-xs font-sans text-slate-900"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                        Destinasi Impian / Catatan
                      </label>
                      <textarea
                        rows={2}
                        value={destinations}
                        onChange={(e) => setDestinations(e.target.value)}
                        placeholder="Contoh: Jam Gadang, Ngarai Sianok, Lembah Harau..."
                        className="block w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 text-xs font-sans text-slate-900"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Action Button */}
                <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-left text-xs text-slate-500 font-medium">
                    <span className="block font-bold text-slate-900">Siap Kirim Draf Reservasi?</span>
                    <span>Terhubung langsung ke WhatsApp Official CV. Anugrah Pariwisata</span>
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-600 hover:to-amber-700 text-white font-display font-black text-sm px-8 py-3.5 rounded-full shadow-lg shadow-red-600/20 transition-all flex items-center justify-center gap-2.5 cursor-pointer"
                    id="submit-booking-to-whatsapp"
                  >
                    <Send className="w-4 h-4" />
                    <span>Kirim Draf via WhatsApp ➔</span>
                  </button>
                </div>

              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center py-12 space-y-4"
                id="booking-success-message"
              >
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-2 shadow-sm">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="font-display font-black text-2xl text-slate-900 uppercase">
                  Draf Reservasi Dikirim!
                </h4>
                <p className="font-sans text-slate-600 text-sm max-w-md leading-relaxed font-medium">
                  Draf pemesanan WhatsApp untuk armada <strong>{currentSelectedCar.name}</strong> telah siap. Silakan tekan <strong>Kirim</strong> pada aplikasi WhatsApp Anda untuk berdiskusi dengan tim CV. Anugrah Pariwisata.
                </p>
                <button
                  onClick={onClose}
                  className="bg-red-600 hover:bg-red-700 text-white font-display font-bold text-sm px-7 py-3 rounded-full shadow-md transition-colors cursor-pointer mt-2"
                >
                  Tutup Form
                </button>
              </motion.div>
            )}

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}


