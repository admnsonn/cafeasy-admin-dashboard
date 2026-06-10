/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search, ShoppingBag, Edit, Calendar, User, DollarSign, Tag, Clock, X } from 'lucide-react';
import { Transaction } from '../types';

interface TransactionTabProps {
  transactions: Transaction[];
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
  searchQuery: string;
}

export function TransactionTabContent({ transactions, setTransactions, searchQuery }: TransactionTabProps) {
  const [filterStatus, setFilterStatus] = useState<'Semua' | 'Selesai' | 'Proses' | 'Batal'>('Semua');
  const [localSearch, setLocalSearch] = useState('');

  const formatCurrency = (val: number) => {
    return `Rp.${val.toLocaleString('id-ID')}`;
  };

  const handleUpdateStatus = (id: string, newStatus: 'Selesai' | 'Proses' | 'Batal') => {
    setTransactions(prev =>
      prev.map(tx => tx.id === id ? { ...tx, status: newStatus } : tx)
    );
  };

  const filteredTrans = transactions.filter(tx => {
    const sMatch = filterStatus === 'Semua' || tx.status === filterStatus;
    const q = (searchQuery || localSearch).toLowerCase();
    const qMatch = tx.customerName.toLowerCase().includes(q) || 
                   tx.id.toLowerCase().includes(q) || 
                   tx.itemsSummary.toLowerCase().includes(q);
    return sMatch && qMatch;
  });

  const totalSales = filteredTrans
    .filter(tx => tx.status === 'Selesai')
    .reduce((sum, tx) => sum + tx.total, 0);

  return (
    <div className="space-y-8 font-sans select-none pb-16 text-white text-left">
      <div>
        <h2 className="text-3xl font-black font-display text-white tracking-widest uppercase">
          DATA TRANSAKSI.
        </h2>
        <p className="text-xs text-zinc-500 font-bold uppercase tracking-wider mt-1">Laporan Finansial & Sinkronisasi Penjualan</p>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Card 1 */}
        <div className="bg-[#0F0F0F] rounded-[24px] border border-white/10 p-5 shadow-md flex items-center gap-4 relative overflow-hidden group">
          <div className="absolute top-2 right-2 text-white/5 font-black text-4xl select-none group-hover:scale-110 transition-transform">
            RP
          </div>
          <div className="bg-white text-black p-3 rounded-xl border border-black">
            <DollarSign className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-zinc-500 font-black uppercase tracking-wider">Omset Selesai</span>
            <p className="text-lg font-black text-white tracking-tight font-mono mt-0.5">
              {formatCurrency(totalSales)}
            </p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-[#0F0F0F] rounded-[24px] border border-white/10 p-5 shadow-md flex items-center gap-4 relative overflow-hidden group">
          <div className="absolute top-2 right-2 text-white/5 font-black text-4xl select-none group-hover:scale-110 transition-transform">
            TX
          </div>
          <div className="bg-white text-black p-3 rounded-xl border border-black">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-zinc-500 font-black uppercase tracking-wider">Total Transaksi</span>
            <p className="text-lg font-black text-white tracking-tight font-mono mt-0.5">
              {filteredTrans.length} DATA
            </p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-[#0F0F0F] rounded-[24px] border border-white/10 p-5 shadow-md flex items-center gap-4 relative overflow-hidden group">
          <div className="absolute top-2 right-2 text-white/5 font-black text-4xl select-none group-hover:scale-110 transition-transform">
            PR
          </div>
          <div className="bg-white text-black p-3 rounded-xl border border-black">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-zinc-500 font-black uppercase tracking-wider">Dalam Proses</span>
            <p className="text-lg font-black text-white tracking-tight font-mono mt-0.5">
              {filteredTrans.filter(tx => tx.status === 'Proses').length} BARIS
            </p>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-[#0F0F0F] rounded-[24px] border border-white/10 p-5 shadow-md flex items-center gap-4 relative overflow-hidden group">
          <div className="absolute top-2 right-2 text-white/5 font-black text-4xl select-none group-hover:scale-110 transition-transform">
            CL
          </div>
          <div className="bg-white text-black p-3 rounded-xl border border-black">
            <X className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-zinc-500 font-black uppercase tracking-wider">Dibatalkan</span>
            <p className="text-lg font-black text-white tracking-tight font-mono mt-0.5">
              {filteredTrans.filter(tx => tx.status === 'Batal').length} FILES
            </p>
          </div>
        </div>
      </div>

      {/* Main Table Block */}
      <div className="bg-[#0F0F0F] rounded-[40px] shadow-2xl border border-white/10 overflow-hidden">
        {/* Table Toolbar */}
        <div className="p-6 md:p-8 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Tabs Filter */}
          <div className="flex flex-wrap gap-2.5">
            {(['Semua', 'Selesai', 'Proses', 'Batal'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest cursor-pointer transition-transform hover:scale-[1.03] ${
                  filterStatus === status
                    ? 'bg-white text-black font-black'
                    : 'bg-[#0A0A0A] text-zinc-400 border border-white/5 hover:text-white'
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          {/* Table search indicator */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 w-4 h-4" />
            <input
              type="text"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              placeholder="CARI TRANSAKSI..."
              className="bg-[#0A0A0A] text-white placeholder-zinc-500 rounded-none border-b border-white/10 focus:border-white py-1.5 pl-9 pr-4 text-xs w-48 font-bold focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Table lists */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#121212] border-b-2 border-white/10 text-xs font-black text-zinc-400 uppercase tracking-widest">
                <th className="py-4 px-6 w-32 font-mono">ID NOTA</th>
                <th className="py-4 px-6">PELANGGAN</th>
                <th className="py-4 px-6">TANGGAL</th>
                <th className="py-4 px-6">ITEM DIBELI</th>
                <th className="py-4 px-6">TOTAL BAYAR</th>
                <th className="py-4 px-6 text-center">STATUS</th>
                <th className="py-4 px-6 text-center">TINDAKAN</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm">
              {filteredTrans.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-zinc-500 font-bold uppercase tracking-wider">
                    Tidak ada transaksi tercatat.
                  </td>
                </tr>
              ) : (
                filteredTrans.map((tx) => (
                  <tr key={tx.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-4 px-6 font-mono text-xs text-zinc-500 font-bold">{tx.id.toUpperCase()}</td>
                    <td className="py-4 px-6 font-extrabold text-white text-md uppercase tracking-tight">{tx.customerName}</td>
                    <td className="py-4 px-6 text-xs text-zinc-400 font-mono font-bold">{tx.date.toUpperCase()}</td>
                    <td className="py-4 px-6 text-xs text-zinc-405 max-w-xs truncate font-semibold" title={tx.itemsSummary}>
                      {tx.itemsSummary}
                    </td>
                    <td className="py-4 px-6 font-mono text-xs font-bold text-white">
                      {formatCurrency(tx.total)}
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className={`inline-flex px-3 py-1 text-[9px] font-black uppercase tracking-widest rounded-full ${
                        tx.status === 'Selesai' 
                          ? 'bg-emerald-500 text-white'
                          : tx.status === 'Proses'
                          ? 'bg-amber-500 text-black'
                          : 'bg-rose-600 text-white'
                      }`}>
                        {tx.status}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex justify-center items-center gap-1.5 flex-wrap">
                        <button
                          onClick={() => handleUpdateStatus(tx.id, 'Selesai')}
                          className="px-3 py-1.5 text-[9px] bg-emerald-500 hover:bg-emerald-600 text-white font-black uppercase tracking-widest rounded transition-all cursor-pointer"
                        >
                          Selesai
                        </button>
                        <button
                          onClick={() => handleUpdateStatus(tx.id, 'Proses')}
                          className="px-3 py-1.5 text-[9px] bg-amber-500 hover:bg-amber-600 text-black font-black uppercase tracking-widest rounded transition-all cursor-pointer"
                        >
                          Proses
                        </button>
                        <button
                          onClick={() => handleUpdateStatus(tx.id, 'Batal')}
                          className="px-3 py-1.5 text-[9px] bg-rose-600 hover:bg-rose-700 text-white font-black uppercase tracking-widest rounded transition-all cursor-pointer"
                        >
                          Batal
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
