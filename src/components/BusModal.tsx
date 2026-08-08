import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Bus, CheckCircle2, MessageCircle, Sparkles, ShieldCheck, Users } from 'lucide-react';

interface BusOption {
  id: string;
  name: string;
  seatsDisplay: string;
  description: string;
  features: string[];
  badge: string;
}

interface BusModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BUS_OPTIONS: BusOption[] = [
  {
    id: 'medium-legrest-18',
    name: 'Medium Bus Leg Rest',
    seatsDisplay: '18 Seat (Legrest)',
    badge: '18 Seat Legrest',
    description: 'Armada Medium Bus Eksekutif dengan tempat duduk Legrest reclining super nyaman, cocok untuk rombongan VIP 18 orang.',
    features: [
      '18 Kursi Legrest Reclining Premium',
      'Full AC Central Cold Air',
      'Smart TV & Audio Karaoke System',
      'USB Charger Port tiap Baris Kursi',
      'Sopir Bus & Co-Driver Lisensi Tour'
    ]
  },
  {
    id: 'medium-bus-standard',
    name: 'Medium Bus Pariwisata',
    seatsDisplay: '31, 35 & 39 Seat',
    badge: '31, 35 & 39 Seat',
    description: 'Bus Pariwisata ukuran medium serbaguna dengan pilihan kapasitas 31, 35, hingga 39 seat untuk gathering, sekolah, & wisata keluarga.',
    features: [
      'Pilihan Kapasitas 31, 35, & 39 Kursi',
      'Full AC Central Ducting Dingin',
      'Audio Sound & LED Karaoke TV',
      'Reclining Seats Ergonomis',
      'Bagasi Samping & Belakang Luas'
    ]
  },
  {
    id: 'bigbus-legrest-32',
    name: 'Big Bus Leg Rest',
    seatsDisplay: '32 Seat (Legrest + Toilet)',
    badge: '32 Seat Legrest',
    description: 'Big Bus Luxury 32 Seat Legrest dilengkapi fasilitas Toilet higienis bersih untuk kenyamanan maksimal perjalanan jarak jauh Jawa, Bali & Nusantara.',
    features: [
      '32 Kursi Legrest Super Eksekutif',
      'Toilet Higienis Bersih & Terawat',
      'Full AC Central Multi Zone',
      'Smart TV, Sound Karaoke & Dispenser',
      'Dua Driver Lisensi Bus Utama'
    ]
  },
  {
    id: 'bigbus-standard',
    name: 'Big Bus Pariwisata',
    seatsDisplay: '47, 50 & 59 Seat',
    badge: '47, 50 & 59 Seat',
    description: 'Big Bus Pariwisata kapasitas besar 47, 50, hingga 59 seat pilihan utama Study Tour sekolah, ziarah rombongan, & gathering perusahaan akbar.',
    features: [
      'Pilihan Kapasitas 47, 50, & 59 Kursi',
      'Full AC Central Multi-Blower',
      'Multiple LED TV & Sound System Karaoke',
      'Bagasi Bawah Ekstra Luas',
      'Driver Lisensi Bus + Co-Driver & Tour Leader'
    ]
  }
];

export default function BusModal({ isOpen, onClose }: BusModalProps) {
  if (!isOpen) return null;

  const handleWhatsAppBooking = (busName: string, seatsDisplay: string) => {
    const waNumber = '628562042336';
    const message = `Halo Restu Tour & Transport, saya berminat sewa Bus Pariwisata tipe: ${busName} (${seatsDisplay}). Mohon informasi penawaran harga, ketersediaan jadwal & rincian fasilitas. Terima kasih!`;
    window.open(`https://api.whatsapp.com/send?phone=${waNumber}&text=${encodeURIComponent(message)}`, '_blank', 'noreferrer');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 text-left my-8"
        >
          {/* Modal Header */}
          <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-950 text-white p-6 sm:p-8 flex items-center justify-between border-b border-slate-800">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-red-600/90 text-white font-extrabold text-[10px] uppercase tracking-widest">
                <Bus className="w-3.5 h-3.5" />
                <span>PILIHAN TIPE BUS PARIWISATA</span>
              </div>
              <h2 className="font-display font-black text-2xl sm:text-3xl text-white uppercase tracking-tight">
                Detail Sewa Bus Pariwisata
              </h2>
              <p className="font-sans text-xs text-slate-300 font-medium">
                Daftar rincian spesifikasi & kapasitas Medium Bus & Big Bus Pariwisata.
              </p>
            </div>

            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-red-600 text-white flex items-center justify-center transition-all cursor-pointer shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Content: 4 Bus Options Text Cards (No Images) */}
          <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto space-y-6 bg-slate-50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {BUS_OPTIONS.map((bus) => (
                <div
                  key={bus.id}
                  className="bg-white rounded-2xl border border-slate-200 p-6 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-5"
                >
                  <div className="space-y-4">
                    {/* Header Badge & Title */}
                    <div className="space-y-2">
                      <div className="inline-block bg-red-100 text-red-700 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider border border-red-200">
                        {bus.badge}
                      </div>

                      <h3 className="font-display font-black text-xl text-[#0d1b37] uppercase">
                        {bus.name}
                      </h3>
                      <span className="font-sans text-xs font-bold text-red-600 block">
                        Kapasitas: {bus.seatsDisplay}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="font-sans text-xs text-slate-600 leading-relaxed font-medium">
                      {bus.description}
                    </p>

                    {/* Features Checklist */}
                    <div className="space-y-1.5 pt-2 border-t border-slate-100">
                      <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider block">
                        Fasilitas Bus:
                      </span>
                      <ul className="space-y-1.5">
                        {bus.features.map((feat, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs font-semibold text-slate-700">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* WA Booking Action Button */}
                  <div className="pt-3">
                    <button
                      onClick={() => handleWhatsAppBooking(bus.name, bus.seatsDisplay)}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-display font-extrabold text-xs uppercase py-3.5 rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4 fill-current" />
                      <span>Pesan Tipe Bus Ini via WA</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Modal Footer */}
          <div className="bg-white p-4 sm:p-5 border-t border-slate-200 text-center flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>📍 Restu Tour & Transport - Jl. Yudo No. 7, Arcamanik Endah, Bandung</span>
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold uppercase cursor-pointer"
            >
              Tutup
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
