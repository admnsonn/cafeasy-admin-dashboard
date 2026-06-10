/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search, Plus, UserPlus, Phone, Mail, Edit2, Trash2, Check, X, ShieldAlert } from 'lucide-react';
import { Customer } from '../types';

interface CustomerTabProps {
  customers: Customer[];
  setCustomers: React.Dispatch<React.SetStateAction<Customer[]>>;
  searchQuery: string;
}

export function CustomerTabContent({ customers, setCustomers, searchQuery }: CustomerTabProps) {
  const [localSearch, setLocalSearch] = useState('');
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newStatus, setNewStatus] = useState<'Aktif' | 'Nonaktif'>('Aktif');

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editStatus, setEditStatus] = useState<'Aktif' | 'Nonaktif'>('Aktif');

  const handleAddCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newPhone) return;

    const randomId = `cust-${Math.floor(1000 + Math.random() * 9000)}`;
    const newCust: Customer = {
      id: randomId,
      name: newName,
      phone: newPhone,
      email: newEmail || `${newName.toLowerCase().replace(/\s+/g, '')}@mail.com`,
      status: newStatus
    };

    setCustomers(prev => [newCust, ...prev]);
    setIsAddOpen(false);
    setNewName('');
    setNewPhone('');
    setNewEmail('');
    setNewStatus('Aktif');
  };

  const handleStartEdit = (cust: Customer) => {
    setEditingId(cust.id);
    setEditName(cust.name);
    setEditPhone(cust.phone);
    setEditEmail(cust.email);
    setEditStatus(cust.status);
  };

  const handleSaveEdit = (id: string) => {
    if (!editName || !editPhone) return;
    setCustomers(prev =>
      prev.map(c => c.id === id ? { ...c, name: editName, phone: editPhone, email: editEmail, status: editStatus } : c)
    );
    setEditingId(null);
  };

  const handleDeleteCust = (id: string) => {
    if (confirm('Hapus pelanggan ini dari database?')) {
      setCustomers(prev => prev.filter(c => c.id !== id));
    }
  };

  const filteredCust = customers.filter(c => {
    const q = (searchQuery || localSearch).toLowerCase();
    return c.name.toLowerCase().includes(q) || 
           c.phone.toLowerCase().includes(q) || 
           c.email.toLowerCase().includes(q) || 
           c.id.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-8 font-sans select-none pb-16 text-white text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black font-display text-white tracking-widest uppercase">
            DATA PELANGGAN.
          </h2>
          <p className="text-xs text-zinc-500 font-bold uppercase tracking-wider mt-1">Manajemen Loyalitas & Profil Member</p>
        </div>
        <button
          onClick={() => setIsAddOpen(true)}
          className="bg-white hover:bg-zinc-200 text-black py-2.5 px-6 rounded-full text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] cursor-pointer self-start sm:self-auto"
        >
          <UserPlus size={15} />
          Daftarkan Member
        </button>
      </div>

      <div className="bg-[#0F0F0F] rounded-[40px] shadow-2xl border border-white/10 overflow-hidden">
        {/* Table Search Toolbar */}
        <div className="p-6 md:p-8 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h3 className="font-extrabold text-white text-lg uppercase tracking-wider">MEMBER LOYALITAS</h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 w-4 h-4" />
            <input
              type="text"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              placeholder="CARI PELANGGAN..."
              className="bg-[#0A0A0A] text-white placeholder-zinc-500 rounded-none border-b border-white/10 focus:border-white py-1.5 pl-9 pr-4 text-xs w-48 font-bold focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Customer Listing */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#121212] border-b-2 border-white/10 text-xs font-black text-zinc-400 uppercase tracking-widest">
                <th className="py-4 px-6 w-28 font-mono">ID MEMBER</th>
                <th className="py-4 px-6">NAMA LENGKAP</th>
                <th className="py-4 px-6">KONTAK TELEPON</th>
                <th className="py-4 px-6">ALAMAT EMAIL</th>
                <th className="py-4 px-6 text-center">STATUS</th>
                <th className="py-4 px-6 text-center">TINDAKAN</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm">
              {filteredCust.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-zinc-500 font-bold uppercase tracking-wider">
                    Pelanggan Tidak Ditemukan
                  </td>
                </tr>
              ) : (
                filteredCust.map(c => (
                  <tr key={c.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-4 px-6 font-mono text-xs text-zinc-500 font-bold">{c.id.toUpperCase()}</td>
                    
                    {editingId === c.id ? (
                      <>
                        <td className="py-3 px-6">
                          <input
                            type="text"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="bg-[#0A0A0A] border-2 border-zinc-800 text-white rounded font-bold px-3 py-1.5 text-sm w-36 outline-none focus:border-white"
                          />
                        </td>
                        <td className="py-3 px-6">
                          <input
                            type="text"
                            value={editPhone}
                            onChange={(e) => setEditPhone(e.target.value)}
                            className="bg-[#0A0A0A] border-2 border-zinc-800 text-white rounded font-mono font-bold px-3 py-1.5 text-sm w-32 outline-none focus:border-white"
                          />
                        </td>
                        <td className="py-3 px-6">
                          <input
                            type="email"
                            value={editEmail}
                            onChange={(e) => setEditEmail(e.target.value)}
                            className="bg-[#0A0A0A] border-2 border-zinc-800 text-white rounded font-mono font-bold px-3 py-1.5 text-sm w-40 outline-none focus:border-white"
                          />
                        </td>
                        <td className="py-3 px-6 text-center">
                          <select
                            value={editStatus}
                            onChange={(e) => setEditStatus(e.target.value as 'Aktif' | 'Nonaktif')}
                            className="bg-[#0A0A0A] border-2 border-zinc-800 text-white rounded text-xs py-1.5 px-3 font-semibold cursor-pointer focus:outline-none"
                          >
                            <option value="Aktif" className="bg-[#0F0F0F]">Aktif</option>
                            <option value="Nonaktif" className="bg-[#0F0F0F]">Nonaktif</option>
                          </select>
                        </td>
                        <td className="py-3 px-6 text-center flex items-center justify-center gap-1.5 h-full">
                          <button
                            onClick={() => handleSaveEdit(c.id)}
                            className="p-1.5 px-3 text-xs bg-white hover:bg-zinc-200 text-black rounded font-black flex items-center gap-1 cursor-pointer transition-transform hover:scale-105"
                          >
                            <Check size={12} />
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="p-1.5 px-3 text-xs bg-zinc-855 hover:bg-zinc-800 text-zinc-300 rounded font-bold cursor-pointer transition-transform hover:scale-105"
                          >
                            <X size={12} />
                          </button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="py-4 px-6 font-extrabold text-white text-md uppercase tracking-tight">{c.name}</td>
                        <td className="py-4 px-6 font-mono text-xs text-zinc-300 font-bold">
                          <span className="flex items-center gap-2">
                            <Phone size={13} className="text-zinc-500" />
                            {c.phone}
                          </span>
                        </td>
                        <td className="py-4 px-6 font-mono text-xs text-zinc-300 font-bold">
                          {c.email.toUpperCase()}
                        </td>
                        <td className="py-4 px-6 text-center animate-fade-in">
                          <span className={`inline-flex px-3 py-1 text-[9px] font-black uppercase tracking-widest rounded-full ${
                            c.status === 'Aktif' 
                              ? 'bg-emerald-500 text-white'
                              : 'bg-zinc-700 text-zinc-300'
                          }`}>
                            {c.status}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-center flex items-center justify-center gap-3">
                          <button
                            onClick={() => handleStartEdit(c)}
                            className="text-zinc-450 hover:text-white p-1.5 rounded transition-colors cursor-pointer"
                            title="Edit Data"
                          >
                            <Edit2 size={14} />
                          </button>
                          <button
                            onClick={() => handleDeleteCust(c.id)}
                            className="text-zinc-455 hover:text-red-450 p-1.5 rounded transition-colors cursor-pointer"
                            title="Hapus"
                          >
                            <Trash2 size={14} />
                          </button>
                        </td>
                      </>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= MODAL: ADD CUSTOMER ================= */}
      {isAddOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-55 animate-in fade-in duration-200">
          <div className="bg-white text-black rounded-[40px] border-b-4 border-r-4 border-black w-full max-w-sm p-8 shadow-2xl relative">
            <button 
              onClick={() => setIsAddOpen(false)}
              className="absolute right-6 top-6 text-zinc-450 hover:text-black transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>
            
            <h3 className="text-3xl font-display font-black tracking-tight uppercase mb-6 leading-none pt-2">DAFTAR MEMBER.</h3>
            
            <form onSubmit={handleAddCustomer} className="space-y-6 text-left">
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block mb-1">Nama Lengkap</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="NAMA_MEMBER_BARU..."
                  className="w-full border-b-2 border-black py-2.5 text-md font-bold text-black outline-none placeholder:text-zinc-200 bg-transparent"
                />
              </div>

              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block mb-1">Nomor Telepon</label>
                <input
                  type="text"
                  required
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  placeholder="CELLPHONE_NUMBER..."
                  className="w-full border-b-2 border-black py-2.5 text-md font-bold text-black outline-none placeholder:text-zinc-200 bg-transparent"
                />
              </div>

              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block mb-1">Email (Opsional)</label>
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="EMAIL_ADDRESS..."
                  className="w-full border-b-2 border-black py-2.5 text-md font-bold text-black outline-none placeholder:text-zinc-200 bg-transparent"
                />
              </div>

              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block mb-2">Status Akun</label>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setNewStatus('Aktif')}
                    className={`flex-1 py-3 px-4 rounded-full text-xs font-black uppercase tracking-widest transition-transform hover:scale-105 cursor-pointer ${
                      newStatus === 'Aktif' ? 'bg-black text-white' : 'bg-zinc-100 text-zinc-400'
                    }`}
                  >
                    Aktif
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewStatus('Nonaktif')}
                    className={`flex-1 py-3 px-4 rounded-full text-xs font-black uppercase tracking-widest transition-transform hover:scale-105 cursor-pointer ${
                      newStatus === 'Nonaktif' ? 'bg-black text-white' : 'bg-zinc-100 text-zinc-400'
                    }`}
                  >
                    Nonaktif
                  </button>
                </div>
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
