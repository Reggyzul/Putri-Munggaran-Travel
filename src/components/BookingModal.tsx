import React, { useState, useEffect } from 'react';
import { Car } from '../types';
import { CARS } from '../data/cars';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, MapPin, User, Phone, CheckCircle2, Sparkles, Award } from 'lucide-react';
import { TRANSLATIONS } from '../utils/translations';

interface BookingModalProps {
  car: Car | null;
  onClose: () => void;
  lang: 'ID' | 'EN';
  onCarChange?: (car: Car) => void;
}

export default function BookingModal({ car, onClose, lang, onCarChange }: BookingModalProps) {
  const [routeCategory, setRouteCategory] = useState<'car_rental' | 'bus_rental' | 'tour_package' | 'gathering'>('car_rental');
  const [selectedCarId, setSelectedCarId] = useState<string>(car?.id || 'avanza');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [passengers, setPassengers] = useState(lang === 'EN' ? '40 Passengers (1 Bus)' : '40 Orang (1 Bus)');
  const [departureDate, setDepartureDate] = useState('');
  const [pickupTime, setPickupTime] = useState(lang === 'EN' ? '07:00 AM' : '07:00 (Pagi)');
  const [durationDays, setDurationDays] = useState(lang === 'EN' ? '3 Days 2 Nights' : '3 Hari 2 Malam');
  const [pickupAddress, setPickupAddress] = useState('');
  const [destinations, setDestinations] = useState('');
  const [notes, setNotes] = useState('');
  const [isBooked, setIsBooked] = useState(false);

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

    const waNumber = '628562042336';

    let routeText = isEN ? 'Car Rental Service' : 'Sewa Mobil & Kendaraan';
    if (routeCategory === 'bus_rental') routeText = isEN ? 'Tourism Bus Rental' : 'Sewa Bus Pariwisata';
    if (routeCategory === 'tour_package') routeText = isEN ? 'Tour Package' : 'Paket Wisata & Tour';
    if (routeCategory === 'gathering') routeText = isEN ? 'Corporate Gathering / Event' : 'Perjalanan Dinas / Gathering / Event';

    const textTemplate = isEN
      ? `Hello Restu Tour & Transport, I would like to consult & reserve:

📋 *RESERVATION DETAILS:*
• Service Category: *${routeText}*
• Fleet Choice: *${currentSelectedCar.name}* (${currentSelectedCar.category})
• Departure Date: *${departureDate}*
• Pickup Time: *${pickupTime}*
• Duration: *${durationDays}*
• Group Size: *${passengers}*

👤 *CUSTOMER DATA:*
• Name: *${name}*
• WhatsApp No: *${phone}*
• Pickup Address: *${pickupAddress}*
• Destination Wish: *${destinations || '-'}*
• Notes: *${notes || '-'}*

Please confirm availability, schedule & best rate quotes. Thank you!`
      : `Halo Restu Tour & Transport, saya ingin berkonsultasi & melakukan reservasi:

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
                <span>RESTU TOUR &amp; TRANSPORT</span>
              </div>

              <div>
                <h3 className="font-display font-black text-2xl text-white uppercase tracking-tight">
                  {currentSelectedCar.name}
                </h3>
                <p className="font-sans text-xs text-red-400 font-bold mt-0.5">
                  {currentSelectedCar.category} ({currentSelectedCar.seats} {isEN ? 'Seats' : 'Kursi'})
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
                  <span className="text-slate-400">{isEN ? 'Capacity:' : 'Kapasitas:'}</span>
                  <span className="font-semibold text-white">{currentSelectedCar.seats} {isEN ? 'Seats' : 'Kursi'}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-slate-400">{isEN ? 'Amenities:' : 'Fasilitas:'}</span>
                  <span className="font-semibold text-green-400">Full AC, USB, Reclining</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-slate-400">{isEN ? 'Driver Service:' : 'Pelayanan:'}</span>
                  <span className="font-semibold text-red-400">{isEN ? 'Pro Licensed Driver' : 'Driver & Kru Ramah'}</span>
                </div>
              </div>

              {/* Motto Card */}
              <div className="p-3.5 rounded-2xl bg-red-500/10 border border-red-500/30 text-left space-y-1">
                <div className="flex items-center gap-1.5 text-red-400 font-extrabold text-[11px] uppercase tracking-wide">
                  <Award className="w-4 h-4 shrink-0 text-red-400" />
                  <span>{t.hero_motto}</span>
                </div>
                <p className="font-sans text-[11px] text-slate-300 leading-relaxed font-medium">
                  {t.about_desc_1}
                </p>
              </div>

            </div>

            {/* Footer Trust Info */}
            <div className="pt-4 border-t border-white/10 mt-6 text-[10px] text-slate-400 font-medium flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
              <span>{isEN ? 'Instant Response via WhatsApp Official' : 'Respon Cepat via WhatsApp Official'}</span>
            </div>
          </div>

          {/* RIGHT SIDEBAR: PROFESSIONAL WA FORM */}
          <div className="lg:col-span-8 p-6 sm:p-8 bg-white max-h-[80vh] overflow-y-auto relative text-left">
            
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 sm:top-5 sm:right-5 w-9 h-9 rounded-full bg-red-600 hover:bg-red-700 text-white transition-all flex items-center justify-center shadow-2xl cursor-pointer z-50 hover:scale-110 border-2 border-white"
              id="close-booking-modal"
              title={isEN ? 'Close Modal' : 'Tutup Modal'}
            >
              <X className="w-5 h-5 stroke-[2.5]" />
            </button>

            {!isBooked ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Header Title */}
                <div>
                  <h4 className="font-display font-black text-xl sm:text-2xl text-[#0f172a] uppercase tracking-tight">
                    {t.modal_title}
                  </h4>
                  <p className="font-sans text-xs text-slate-500 leading-relaxed font-medium mt-1">
                    {t.modal_desc}
                  </p>
                </div>

                {/* 1. SELECT CATEGORY */}
                <div className="space-y-4 pt-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-red-600 block">
                    1. {isEN ? 'SELECT SERVICE CATEGORY' : 'PILIH KATEGORI LAYANAN'}
                  </span>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <button
                      type="button"
                      onClick={() => setRouteCategory('car_rental')}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                        routeCategory === 'car_rental'
                          ? 'border-red-500 bg-red-50/70 text-red-950 font-bold shadow-xs'
                          : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium'
                      }`}
                    >
                      <span className="text-[11px] font-bold block">{isEN ? 'Car Rental' : 'Sewa Mobil'}</span>
                      <span className="text-[9px] text-slate-500 block">MPV &amp; VIP</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setRouteCategory('bus_rental')}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                        routeCategory === 'bus_rental'
                          ? 'border-amber-500 bg-red-50/70 text-red-950 font-bold shadow-xs'
                          : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium'
                      }`}
                    >
                      <span className="text-[11px] font-bold block">{isEN ? 'Tourism Bus' : 'Bus Pariwisata'}</span>
                      <span className="text-[9px] text-slate-500 block">Medium &amp; Big Bus</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setRouteCategory('tour_package')}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                        routeCategory === 'tour_package'
                          ? 'border-blue-500 bg-blue-50/70 text-blue-950 font-bold shadow-xs'
                          : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium'
                      }`}
                    >
                      <span className="text-[11px] font-bold block">{isEN ? 'Tour Package' : 'Paket Tour'}</span>
                      <span className="text-[9px] text-slate-500 block">Java, Bali, etc.</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setRouteCategory('gathering')}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                        routeCategory === 'gathering'
                          ? 'border-green-500 bg-green-100/70 text-green-600 font-bold shadow-xs'
                          : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium'
                      }`}
                    >
                      <span className="text-[11px] font-bold block">{isEN ? 'Gathering' : 'Gathering/Dinas'}</span>
                      <span className="text-[9px] text-slate-500 block">Corporate / Group</span>
                    </button>
                  </div>
                </div>

                {/* 2. CUSTOMER DATA FORM */}
                <div className="space-y-4 pt-2 border-t border-slate-100">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-red-600 block">
                    2. {isEN ? 'CUSTOMER DATA & DEPARTURE DETAILS' : 'DATA PEMESAN & JADWAL PERJALANAN'}
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-red-500" />
                        <span>{t.modal_field_name} *</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={isEN ? "Enter full name..." : "Masukkan nama lengkap..."}
                        className="w-full text-xs font-semibold px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500 bg-slate-50"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-red-500" />
                        <span>{t.modal_field_phone} *</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder={isEN ? "Example: 081234567890" : "Contoh: 081234567890"}
                        className="w-full text-xs font-semibold px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500 bg-slate-50"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-red-500" />
                        <span>{t.modal_field_date} *</span>
                      </label>
                      <input
                        type="date"
                        required
                        value={departureDate}
                        onChange={(e) => setDepartureDate(e.target.value)}
                        className="w-full text-xs font-semibold px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500 bg-slate-50"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-red-500" />
                        <span>{t.modal_field_time}</span>
                      </label>
                      <input
                        type="text"
                        value={pickupTime}
                        onChange={(e) => setPickupTime(e.target.value)}
                        placeholder={isEN ? "Example: 07:00 AM" : "Contoh: 07:00 Pagi"}
                        className="w-full text-xs font-semibold px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500 bg-slate-50"
                      />
                    </div>

                    <div className="sm:col-span-2 space-y-1">
                      <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-red-500" />
                        <span>{t.modal_field_address} *</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={pickupAddress}
                        onChange={(e) => setPickupAddress(e.target.value)}
                        placeholder={isEN ? "Hotel / Address / Airport location..." : "Alamat / Hotel / Bandara penjemputan..."}
                        className="w-full text-xs font-semibold px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500 bg-slate-50"
                      />
                    </div>
                  </div>
                </div>

                {/* SUBMIT BUTTON */}
                <div className="pt-4 border-t border-slate-100">
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-display font-black text-xs uppercase py-4 rounded-2xl shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2 tracking-wider"
                  >
                    <span>{t.modal_btn_confirm}</span>
                  </button>
                </div>

              </form>
            ) : (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-display font-black text-2xl text-[#0d1b37] uppercase">
                  {isEN ? 'Reservation Draft Sent!' : 'Draf Reservasi Terkirim!'}
                </h4>
                <p className="font-sans text-xs text-slate-600 leading-relaxed font-medium max-w-md mx-auto">
                  {isEN ? 'Thank you! You have been redirected to WhatsApp. Our team will respond immediately.' : 'Terima kasih! Anda telah terhubung langsung dengan WhatsApp Official Restu Tour & Transport. Tim kami akan merespons dalam hitungan menit.'}
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs uppercase cursor-pointer"
                >
                  {isEN ? 'Close Window' : 'Tutup Jendela'}
                </button>
              </div>
            )}

          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
