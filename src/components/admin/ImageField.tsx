import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, Link2, Check, Loader2, Eye, X, Grid } from 'lucide-react';
import { uploadImageSmart } from '../../lib/supabase';
import { GALLERY_PRESET_IMAGES } from '../../data/defaultSiteContent';

interface ImageFieldProps {
  label: string;
  helperText?: string;
  value: string;
  onChange: (newUrl: string) => void;
  aspect?: 'banner' | 'card' | 'square';
}

export default function ImageField({
  label,
  helperText,
  value,
  onChange,
  aspect = 'card'
}: ImageFieldProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadNotice, setUploadNotice] = useState<string | null>(null);
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [showFullPreview, setShowFullPreview] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [imgError, setImgError] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadNotice(null);
    try {
      const result = await uploadImageSmart(file);
      onChange(result.url);
      setImgError(false);
      setUploadNotice('Foto berhasil diupload & diperbarui!');
      setTimeout(() => setUploadNotice(null), 4000);
    } catch (err: any) {
      alert(err?.message || 'Gagal mengupload gambar. Silakan coba lagi.');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const previewHeightClass =
    aspect === 'banner'
      ? 'h-44 sm:h-52'
      : aspect === 'square'
      ? 'h-36 w-36 mx-auto sm:mx-0'
      : 'h-44';

  return (
    <div className="bg-slate-50/90 border border-slate-200 rounded-2xl p-4 space-y-3 transition-all hover:border-emerald-300">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <label className="block text-sm font-extrabold text-slate-800">
            {label}
          </label>
          {helperText && (
            <p className="text-xs text-slate-500 mt-0.5">{helperText}</p>
          )}
        </div>
        {uploadNotice && (
          <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full">
            <Check className="w-3.5 h-3.5" />
            {uploadNotice}
          </span>
        )}
      </div>

      {/* Live Visual Image Preview Box */}
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
        <div
          className={`relative ${previewHeightClass} ${
            aspect === 'square' ? 'shrink-0' : 'w-full sm:w-64 shrink-0'
          } rounded-xl overflow-hidden bg-white border-2 border-slate-200 shadow-xs group flex items-center justify-center`}
        >
          {value && !imgError ? (
            <>
              <img
                src={value}
                alt={label}
                onError={() => setImgError(true)}
                className={`w-full h-full ${
                  aspect === 'square' ? 'object-contain p-2' : 'object-cover'
                } transition-transform duration-300 group-hover:scale-105`}
              />
              <button
                type="button"
                onClick={() => setShowFullPreview(true)}
                className="absolute bottom-2 right-2 bg-white/95 hover:bg-white text-slate-800 text-[11px] font-bold px-2.5 py-1 rounded-lg shadow-md flex items-center gap-1 cursor-pointer border border-slate-200"
                title="Perbesar Gambar"
              >
                <Eye className="w-3.5 h-3.5 text-emerald-600" />
                <span>Lihat</span>
              </button>
            </>
          ) : (
            <div className="text-center p-4 space-y-1 text-slate-400">
              <ImageIcon className="w-8 h-8 mx-auto text-slate-300" />
              <p className="text-xs font-semibold">Belum ada gambar / URL tidak valid</p>
            </div>
          )}

          {isUploading && (
            <div className="absolute inset-0 bg-white/85 backdrop-blur-xs flex flex-col items-center justify-center gap-2 text-emerald-700 font-bold text-xs">
              <Loader2 className="w-6 h-6 animate-spin text-emerald-600" />
              <span>Mengupload Foto...</span>
            </div>
          )}
        </div>

        {/* Friendly Action Controls */}
        <div className="flex-1 space-y-2.5">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              disabled={isUploading}
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs transition-all cursor-pointer"
            >
              {isUploading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Upload className="w-4 h-4" />
              )}
              <span>Upload Foto dari HP / Laptop</span>
            </button>

            <button
              type="button"
              onClick={() => setShowGalleryModal(true)}
              className="inline-flex items-center gap-1.5 bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 transition-all cursor-pointer"
            >
              <Grid className="w-4 h-4 text-emerald-600" />
              <span>Pilih dari Koleksi Foto</span>
            </button>

            <button
              type="button"
              onClick={() => setShowUrlInput(!showUrlInput)}
              className="inline-flex items-center gap-1.5 bg-white hover:bg-slate-100 text-slate-600 font-semibold text-xs px-3 py-2.5 rounded-xl border border-slate-200 transition-all cursor-pointer"
            >
              <Link2 className="w-3.5 h-3.5 text-slate-500" />
              <span>{showUrlInput ? 'Sembunyikan Link' : 'Ubah Link URL'}</span>
            </button>
          </div>

          {/* Direct URL Input (Always synced with preview) */}
          {showUrlInput ? (
            <div className="pt-1">
              <label className="block text-[11px] font-bold text-slate-500 mb-1">
                Link / URL Gambar (otomatis menampilkan preview di samping):
              </label>
              <input
                type="text"
                value={value.startsWith('data:') ? '(Foto hasil upload tersimpan)' : value}
                onChange={(e) => {
                  setImgError(false);
                  onChange(e.target.value);
                }}
                placeholder="Contoh: /avanza.avif atau https://..."
                className="w-full text-xs font-medium bg-white px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none text-slate-800"
              />
            </div>
          ) : (
            <p className="text-[11px] text-slate-500 leading-relaxed">
              💡 Klik <strong>Upload Foto</strong> untuk mengganti gambar langsung dari galeri HP/komputer Anda, atau klik <strong>Pilih dari Koleksi Foto</strong>.
            </p>
          )}
        </div>
      </div>

      {/* Modal: Pilih dari Galeri Website */}
      {showGalleryModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-emerald-50/60">
              <div>
                <h4 className="font-display font-black text-lg text-slate-900">
                  Pilih Foto dari Koleksi Website
                </h4>
                <p className="text-xs text-slate-600">
                  Klik salah satu foto di bawah ini untuk langsung menggunakannya
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowGalleryModal(false)}
                className="p-2 rounded-full bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 overflow-y-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5">
              {GALLERY_PRESET_IMAGES.map((item) => {
                const isSelected = value === item.url;
                return (
                  <button
                    key={item.url}
                    type="button"
                    onClick={() => {
                      setImgError(false);
                      onChange(item.url);
                      setShowGalleryModal(false);
                    }}
                    className={`group text-left rounded-2xl overflow-hidden border-2 transition-all cursor-pointer flex flex-col justify-between bg-white ${
                      isSelected
                        ? 'border-emerald-600 ring-2 ring-emerald-500/30 shadow-md'
                        : 'border-slate-200 hover:border-emerald-400'
                    }`}
                  >
                    <div className="h-28 w-full bg-slate-100 overflow-hidden relative">
                      <img
                        src={item.url}
                        alt={item.label}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <span className="absolute top-1.5 left-1.5 bg-white/90 text-slate-700 text-[9px] font-bold px-2 py-0.5 rounded-full">
                        {item.category}
                      </span>
                    </div>
                    <div className="p-2.5">
                      <p className="text-xs font-bold text-slate-800 line-clamp-1">
                        {item.label}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Modal: Full Image Preview */}
      {showFullPreview && (
        <div
          onClick={() => setShowFullPreview(false)}
          className="fixed inset-0 z-50 bg-slate-900/75 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl p-4 max-w-3xl w-full shadow-2xl space-y-3"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <span className="font-bold text-sm text-slate-800">{label}</span>
              <button
                type="button"
                onClick={() => setShowFullPreview(false)}
                className="p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="max-h-[70vh] overflow-hidden flex items-center justify-center bg-slate-50 rounded-2xl p-2">
              <img
                src={value}
                alt={label}
                className="max-h-[65vh] w-auto object-contain rounded-xl"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

