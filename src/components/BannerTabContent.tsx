/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search, Plus, Trash2, Eye, EyeOff, LayoutTemplate, X } from 'lucide-react';
import { BannerItem } from '../types';

interface BannerTabProps {
  banners: BannerItem[];
  setBanners: React.Dispatch<React.SetStateAction<BannerItem[]>>;
  searchQuery: string;
}

export function BannerTabContent({ banners, setBanners, searchQuery }: BannerTabProps) {
  const [localSearch, setLocalSearch] = useState('');
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newImage, setNewImage] = useState('');

  const handleAddBanner = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;

    // Use a default beautiful cafe interior photo path if nothing provided
    const pickedImage = newImage || 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=600&auto=format&fit=crop';

    const newBanner: BannerItem = {
      id: `ban-${Math.floor(100 + Math.random() * 900)}`,
      title: newTitle,
      imageUrl: pickedImage,
      isActive: true
    };

    setBanners(prev => [newBanner, ...prev]);
    setIsAddOpen(false);
    setNewTitle('');
    setNewImage('');
  };

  const handleToggleActive = (id: string) => {
    setBanners(prev =>
      prev.map(b => b.id === id ? { ...b, isActive: !b.isActive } : b)
    );
  };

  const handleDeleteBanner = (id: string) => {
    if (confirm('Hapus banner promosi ini?')) {
      setBanners(prev => prev.filter(b => b.id !== id));
    }
  };

  const filteredBanners = banners.filter(b => {
    const q = (searchQuery || localSearch).toLowerCase();
    return b.title.toLowerCase().includes(q) || b.id.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-8 font-sans select-none pb-16 text-white text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black font-display text-white tracking-widest uppercase">
            BANNER PROMOSI.
          </h2>
          <p className="text-xs text-zinc-500 font-bold uppercase tracking-wider mt-1">Publikasi Iklan & Gambar Slideshow Depan</p>
        </div>
        <button
          onClick={() => setIsAddOpen(true)}
          className="bg-white hover:bg-zinc-200 text-black py-2.5 px-6 rounded-full text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] cursor-pointer self-start sm:self-auto"
        >
          <Plus size={15} />
          Pasang Banner
        </button>
      </div>

      {/* Main Grid display */}
      <div className="bg-[#0F0F0F] rounded-[45px] border border-white/10 p-6 md:p-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <span className="text-xs font-black text-white uppercase tracking-widest">Banner Aktif ({filteredBanners.length})</span>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 w-4 h-4" />
            <input
              type="text"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              placeholder="CARI BANNER..."
              className="bg-[#0A0A0A] text-white placeholder-zinc-500 rounded-none border-b border-white/10 focus:border-white py-1.5 pl-9 pr-3 text-xs w-44 font-bold focus:outline-none transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredBanners.length === 0 ? (
            <div className="bg-[#0A0A0A] rounded-[24px] p-8 text-center text-zinc-550 border border-white/5 py-12 md:col-span-2 font-black uppercase tracking-widest text-xs">
              Tidak ada Banner Terpasang
            </div>
          ) : (
            filteredBanners.map(b => (
              <div 
                key={b.id} 
                className={`bg-[#0A0A0A] rounded-[24px] border overflow-hidden shadow-md flex flex-col justify-between transition-all ${
                  b.isActive ? 'border-white/20' : 'border-white/5'
                }`}
              >
                {/* Image Frame */}
                <div className="h-48 bg-zinc-950 relative">
                  <img
                    src={b.imageUrl}
                    alt={b.title}
                    referrerPolicy="no-referrer"
                    className={`w-full h-full object-cover transition-opacity ${
                      b.isActive ? 'opacity-85' : 'opacity-25 grayscale'
                    }`}
                  />
                  <span className={`absolute top-4 left-4 text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow border ${
                    b.isActive
                      ? 'bg-emerald-500 text-white border-black'
                      : 'bg-zinc-800 text-zinc-400 border-white/10'
                  }`}>
                    {b.isActive ? 'AKTIF' : 'NON_AKTIF'}
                  </span>
                </div>

                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-widest">{b.id.toUpperCase()}</span>
                  </div>
                  <h4 className="font-extrabold text-white text-md uppercase tracking-tight line-clamp-2">{b.title}</h4>
                </div>

                {/* Bottom tools control */}
                <div className="px-5 pb-5 pt-4 border-t border-white/5 flex items-center justify-between bg-[#121212]">
                  <button
                    onClick={() => handleToggleActive(b.id)}
                    className={`text-[9px] font-black uppercase tracking-widest px-4 py-2 rounded-full flex items-center gap-1.5 cursor-pointer border ${
                      b.isActive
                        ? 'text-zinc-400 bg-transparent border-white/10 hover:text-white'
                        : 'text-black bg-white border-black hover:bg-zinc-200'
                    }`}
                  >
                    {b.isActive ? (
                      <>
                        <EyeOff size={13} /> Unpublish
                      </>
                    ) : (
                      <>
                        <Eye size={13} /> Publish
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => handleDeleteBanner(b.id)}
                    className="text-zinc-500 hover:text-red-400 p-1.5 rounded-lg transition-colors cursor-pointer"
                    title="Hapus Banner"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* ================= MODAL: ADD BANNER ================= */}
      {isAddOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-55 animate-in fade-in duration-200">
          <div className="bg-white text-black rounded-[40px] border-b-4 border-r-4 border-black w-full max-w-sm p-8 shadow-2xl relative">
            <button 
              onClick={() => setIsAddOpen(false)}
              className="absolute right-6 top-6 text-zinc-455 hover:text-black transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>
            
            <h3 className="text-3xl font-display font-black tracking-tight uppercase mb-6 leading-none pt-2">PASANG BANNER.</h3>
            
            <form onSubmit={handleAddBanner} className="space-y-6 text-left">
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block mb-1">Judul Promo / Banner</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="ID_PROMO_MERDEKA..."
                  className="w-full border-b-2 border-black py-2.5 text-md font-bold text-black outline-none placeholder:text-zinc-200 bg-transparent"
                />
              </div>

              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block mb-1">Foto URL (Opsional)</label>
                <input
                  type="text"
                  value={newImage}
                  onChange={(e) => setNewImage(e.target.value)}
                  placeholder="HTTPS_IMAGE_SOURCE_URL..."
                  className="w-full border-b-2 border-black py-2.5 text-md font-bold text-black outline-none placeholder:text-zinc-200 bg-transparent"
                />
                <span className="text-[9px] text-zinc-400 block mt-1.5 font-semibold">Kosongkan untuk menggunakan gambar default.</span>
              </div>

              <div className="pt-4 flex justify-between items-center">
                <span className="text-[10px] font-mono font-bold tracking-widest text-zinc-450 uppercase">PORT: 3000</span>
                <button
                  type="submit"
                  className="bg-black hover:bg-zinc-800 text-white font-black text-xs px-10 py-4 rounded-full tracking-widest uppercase hover:scale-[1.03] transition-transform cursor-pointer"
                >
                  SIMPAN
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
