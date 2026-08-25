import React, { useState, useEffect } from 'react';
import { Car } from '../types';
import { CARS } from '../data/cars';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, MapPin, User, Phone, CheckCircle2, Sparkles, Award, ShieldCheck } from 'lucide-react';
import { TRANSLATIONS } from '../utils/translations';

interface BookingModalProps {
  car: Car | null;
  onClose: () => void;
  lang: 'ID' | 'EN';
  onCarChange?: (car: Car) => void;
}

export default function BookingModal({ car, onClose, lang, onCarChange }: BookingModalProps) {
  const [serviceCategory, setServiceCategory] = useState<string>('door-to-door');
  const [selectedCarId, setSelectedCarId] = useState<string>(car?.id || 'toyota-avanza');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [passengers, setPassengers] = useState(lang === 'EN' ? '4 Passengers' : '4 Orang');
  const [departureDate, setDepartureDate] = useState('');
  const [pickupTime, setPickupTime] = useState(lang === 'EN' ? '08:00 AM' : '08:00 (Pagi)');
  const [pickupAddress, setPickupAddress] = useState('');
  const [destinationAddress, setDestinationAddress] = useState('');
  const [notes, setNotes] = useState('');

  const t = TRANSLATIONS[lang];
  const isEN = lang === 'EN';

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
      alert(isEN ? 'Please complete all required fields (*)!' : 'Mohon lengkapi semua kolom yang wajib diisi (*)!');
      return;
    }

    const waNumber = '6281321264200';

    const serviceNameMap: Record<string, { id: string; en: string }> = {
      'door-to-door': { id: 'Door-to-Door Service', en: 'Door-to-Door Service' },
      'travel-antar-kota': { id: 'Travel Antar Kota (Pangandaran - Bandung / Jabodetabek)', en: 'Inter-City Travel' },
      'private-trip': { id: 'Private Trip (Fleksibel & Eksklusif)', en: 'Private Trip' },
      'transportasi-keluarga': { id: 'Transportasi Keluarga / Mudik', en: 'Family Transportation' },
      'perjalanan-bisnis': { id: 'Perjalanan Bisnis & Dinas', en: 'Business Travel' },
      'transportasi-rombongan': { id: 'Transportasi Rombongan (Hiace)', en: 'Group Transportation' }
    };

    const chosenServiceName = isEN 
      ? (serviceNameMap[serviceCategory]?.en || 'Door-to-Door Travel') 
      : (serviceNameMap[serviceCategory]?.id || 'Door-to-Door Travel');

    const textTemplate = isEN
      ? `Hello Putri Munggaran Tour & Travel, I would like to consult & reserve travel:

📋 *RESERVATION DETAILS:*
• Service: *${chosenServiceName}*
• Vehicle: *${currentSelectedCar.name}*
• Departure Date: *${departureDate}*
• Pickup Time: *${pickupTime}*
• Passenger Count: *${passengers}*

👤 *CUSTOMER DATA:*
• Name: *${name}*
• WhatsApp Number: *${phone}*
• Pickup Address: *${pickupAddress}*
• Destination Address: *${destinationAddress || '-'}*
• Special Notes: *${notes || '-'}*

Please confirm route availability, schedule & rate quote. Thank you!`
      : `Halo Putri Munggaran Tour & Travel, saya ingin berkonsultasi & melakukan reservasi:

📋 *DETAIL RESERVASI PERJALANAN:*
• Jenis Layanan: *${chosenServiceName}*
• Pilihan Armada: *${currentSelectedCar.name}*
• Tanggal Keberangkatan: *${departureDate}*
• Jam Penjemputan: *${pickupTime}*
• Jumlah Penumpang: *${passengers}*

👤 *DATA PEMESAN:*
• Nama Pemesan: *${name}*
• No. WhatsApp: *${phone}*
• Lokasi / Alamat Penjemputan: *${pickupAddress}*
• Alamat / Kota Tujuan: *${destinationAddress || '-'}*
• Catatan Khusus: *${notes || '-'}*

Mohon konfirmasi ketersediaan armada, jadwal penjemputan & penawaran harga terbaik. Terima kasih!`;

    const encodedText = encodeURIComponent(textTemplate);
    window.open(`https://api.whatsapp.com/send?phone=${waNumber}&text=${encodedText}`, '_blank', 'noreferrer');
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 text-left">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 relative my-8"
        >
          {/* Modal Header Banner */}
          <div className="bg-gradient-to-r from-[#0f2b5c] via-blue-900 to-[#dc2626] p-6 text-white relative">
            <button
              onClick={onClose}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-amber-300 bg-black/30 px-3 py-1 rounded-full inline-block">
                PUTRI MUNGGARAN TOUR &amp; TRAVEL
              </span>
              <h3 className="font-display font-black text-2xl uppercase tracking-tight">
                {t.modal_title}
              </h3>
              <p className="font-sans text-xs text-slate-200">
                {t.modal_desc}
              </p>
            </div>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
            
            {/* Step 1: Vehicle & Service Type Selection */}
            <div className="space-y-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] font-black uppercase text-red-600 tracking-wider block">
                1. {isEN ? 'Choose Service & Vehicle' : 'Pilih Layanan & Armada'}
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Service Type */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {isEN ? 'Service Type' : 'Jenis Layanan'}
                  </label>
                  <select
                    value={serviceCategory}
                    onChange={(e) => setServiceCategory(e.target.value)}
                    className="w-full text-xs font-bold p-3 rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-red-500 focus:outline-none"
                  >
                    <option value="door-to-door">Door-to-Door Service</option>
                    <option value="travel-antar-kota">Travel Antar Kota (Pangandaran - Bandung / Jabodetabek)</option>
                    <option value="private-trip">Private Trip (Fleksibel &amp; Nyaman)</option>
                    <option value="transportasi-keluarga">Transportasi Keluarga / Mudik</option>
                    <option value="perjalanan-bisnis">Perjalanan Bisnis &amp; Dinas</option>
                    <option value="transportasi-rombongan">Transportasi Rombongan</option>
                  </select>
                </div>

                {/* Vehicle Selection */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t.modal_summary_base}
                  </label>
                  <select
                    value={selectedCarId}
                    onChange={(e) => {
                      setSelectedCarId(e.target.value);
                      const found = CARS.find(c => c.id === e.target.value);
                      if (found && onCarChange) onCarChange(found);
                    }}
                    className="w-full text-xs font-bold p-3 rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-red-500 focus:outline-none"
                  >
                    {CARS.map(c => (
                      <option key={c.id} value={c.id}>
                        {c.name} ({c.seats} {t.cars_seats})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Step 2: Customer Identity */}
            <div className="space-y-4">
              <span className="text-[11px] font-black uppercase text-red-600 tracking-wider block">
                2. {isEN ? 'Customer Information' : 'Data Pemesan'}
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t.modal_field_name}
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={isEN ? 'e.g. Budi Santoso' : 'Contoh: Bapak / Ibu Agus'}
                      className="w-full text-xs font-medium pl-9 pr-3 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-red-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t.modal_field_phone}
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="0813-xxxx-xxxx"
                      className="w-full text-xs font-medium pl-9 pr-3 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-red-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Trip Details & Addresses */}
            <div className="space-y-4">
              <span className="text-[11px] font-black uppercase text-red-600 tracking-wider block">
                3. {isEN ? 'Schedule & Address Details' : 'Jadwal & Lokasi Penjemputan'}
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t.modal_field_date}
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                    <input
                      type="date"
                      required
                      value={departureDate}
                      onChange={(e) => setDepartureDate(e.target.value)}
                      className="w-full text-xs font-medium pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-red-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t.modal_field_time}
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                    <input
                      type="text"
                      value={pickupTime}
                      onChange={(e) => setPickupTime(e.target.value)}
                      placeholder="08:00"
                      className="w-full text-xs font-medium pl-9 pr-3 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-red-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {isEN ? 'Passengers' : 'Jumlah Penumpang'}
                  </label>
                  <input
                    type="text"
                    value={passengers}
                    onChange={(e) => setPassengers(e.target.value)}
                    placeholder="Contoh: 4 Orang"
                    className="w-full text-xs font-medium px-3 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-red-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Pickup Address */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t.modal_field_address}
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-red-500 absolute left-3 top-3.5" />
                  <input
                    type="text"
                    required
                    value={pickupAddress}
                    onChange={(e) => setPickupAddress(e.target.value)}
                    placeholder={isEN ? 'Street / hotel / home address for pickup' : 'Alamat lengkap penjemputan (Rumah / Hotel / Titik Temu)'}
                    className="w-full text-xs font-medium pl-9 pr-3 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-red-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Destination Address */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {isEN ? 'Destination Address / City' : 'Alamat / Kota Tujuan'}
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-blue-600 absolute left-3 top-3.5" />
                  <input
                    type="text"
                    value={destinationAddress}
                    onChange={(e) => setDestinationAddress(e.target.value)}
                    placeholder={isEN ? 'Destination city & address (e.g. Bandung / Jakarta)' : 'Kota tujuan & alamat pengantaran (Contoh: Bandung / Jakarta Selatan)'}
                    className="w-full text-xs font-medium pl-9 pr-3 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-red-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t.modal_field_notes}
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={isEN ? 'Additional requests, luggage info, mudik notes...' : 'Catatan tambahan perjalanan, barang bawaan, kebutuhan khusus...'}
                  className="w-full text-xs font-medium p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-red-500 focus:outline-none resize-none"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#0f2b5c] via-blue-900 to-[#dc2626] hover:from-[#dc2626] hover:to-[#0f2b5c] text-white font-display font-black text-xs uppercase py-4 rounded-2xl shadow-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer tracking-wider"
              >
                <span>{t.modal_btn_confirm}</span>
              </button>
            </div>

          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
