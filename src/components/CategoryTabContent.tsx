/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search, Plus, Trash2, FolderPlus, Tag } from 'lucide-react';
import { Category } from '../types';

interface CategoryTabProps {
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  searchQuery: string;
}

export function CategoryTabContent({ categories, setCategories, searchQuery }: CategoryTabProps) {
  const [localSearch, setLocalSearch] = useState('');
  const [newName, setNewName] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [isAddOpen, setIsAddOpen] = useState(false);

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName) return;

    const randomId = `cat-${Math.floor(10 + Math.random() * 90)}`;
    const newCat: Category = {
      id: randomId,
      name: newName,
      description: newDesc || 'Kategori menu masakan spesial Cafeasy.'
    };

    setCategories(prev => [newCat, ...prev]);
    setIsAddOpen(false);
    setNewName('');
    setNewDesc('');
  };

  const handleDeleteCat = (id: string) => {
    if (confirm('Hapus kategori ini? Seluruh menu di bawah kategori ini juga akan dinormalisasi.')) {
      setCategories(prev => prev.filter(c => c.id !== id));
    }
  };

  const filteredCategories = categories.filter(c => {
    const q = (searchQuery || localSearch).toLowerCase();
    return c.name.toLowerCase().includes(q) || c.description.toLowerCase().includes(q) || c.id.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-8 font-sans select-none pb-16 text-white text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black font-display text-white tracking-widest uppercase">
            DATA KATEGORI.
          </h2>
          <p className="text-xs text-zinc-500 font-bold uppercase tracking-wider mt-1">Klasifikasi & Pengelompokan Menu Cafe</p>
        </div>
        <button
          onClick={() => setIsAddOpen(true)}
          className="bg-white hover:bg-zinc-200 text-black py-2.5 px-6 rounded-full text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] cursor-pointer sm:hidden"
        >
          <FolderPlus size={15} />
          Tambah Kategori
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        {/* Left Side: Category Grid Card Display */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-[#0F0F0F] rounded-[40px] border border-white/10 p-5 shadow-lg flex items-center justify-between gap-4">
            <span className="text-xs font-black text-white uppercase tracking-widest">Daftar Kategori ({filteredCategories.length})</span>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 w-4 h-4" />
              <input
                type="text"
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                placeholder="CARI KATEGORI..."
                className="bg-[#0A0A0A] text-white placeholder-zinc-500 rounded-none border-b border-white/10 focus:border-white py-1.5 pl-9 pr-3 text-xs w-44 font-bold focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredCategories.length === 0 ? (
              <div className="bg-[#0F0F0F] rounded-[24px] p-8 text-center text-zinc-550 border border-white/10 py-12 sm:col-span-2 font-black uppercase tracking-widest text-xs">
                Kategori Tidak Ditemukan
              </div>
            ) : (
              filteredCategories.map(cat => (
                <div 
                  key={cat.id} 
                  className="bg-[#0F0F0F] p-6 rounded-[24px] border border-white/10 hover:border-white/30 transition-all shadow-md flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3 text-xs">
                      <span className="font-mono text-zinc-500 font-bold uppercase tracking-widest">{cat.id}</span>
                      <span className="bg-white text-black font-black px-2 py-0.5 rounded-full flex items-center gap-1 uppercase tracking-widest text-[9px] leading-none">
                        <Tag size={9} />
                        Kategori
                      </span>
                    </div>
                    <h4 className="font-black text-white text-lg mb-1 uppercase tracking-tight">{cat.name}</h4>
                    <p className="text-xs text-zinc-400 font-semibold leading-relaxed">{cat.description}</p>
                  </div>

                  <div className="mt-6 pt-3 border-t border-white/5 flex justify-end">
                    <button
                      onClick={() => handleDeleteCat(cat.id)}
                      className="text-zinc-500 hover:text-red-400 p-1.5 rounded-lg transition-colors cursor-pointer"
                      title="Hapus Kategori"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Side: Quick Add Category Widget */}
        <div className="bg-[#0F0F0F] text-white rounded-[32px] border border-white/10 p-6 shadow-md h-fit md:sticky md:top-28">
          <h3 className="font-black text-xs mb-6 tracking-widest text-white flex items-center gap-2 uppercase">
            <FolderPlus size={15} className="text-white" />
            Tambah Kategori Cepat
          </h3>
          
          <form onSubmit={handleAddCategory} className="space-y-5">
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block mb-1.5">Nama Kategori</label>
              <input
                type="text"
                required
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Misal: Minuman Dingin"
                className="w-full bg-[#0A0A0A] border-2 border-zinc-800 focus:border-white text-white rounded-lg py-2.5 px-4 text-xs font-bold outline-none"
              />
            </div>

            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block mb-1.5">Deskripsi Kategori</label>
              <textarea
                rows={3}
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                placeholder="Misal: Aneka kopi espresso, frappe, dan teh dingin..."
                className="w-full bg-[#0A0A0A] border-2 border-zinc-800 focus:border-white text-white rounded-lg py-2.5 px-4 text-xs font-bold outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-white text-black hover:bg-zinc-200 font-extrabold text-xs tracking-widest uppercase rounded-full transition-transform hover:scale-105 cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              Simpan Kategori
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
