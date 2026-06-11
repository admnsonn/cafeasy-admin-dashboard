/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import {
  Plus,
  Trash2,
  Download,
  Search,
  Check,
  X,
  Edit,
  ChevronDown,
  RefreshCw,
} from "lucide-react";
import { MenuItem } from "../types";

interface MenuTabContentProps {
  menuItems: MenuItem[];
  setMenuItems: React.Dispatch<React.SetStateAction<MenuItem[]>>;
  globalSearchQuery: string;
}

export function MenuTabContent({
  menuItems,
  setMenuItems,
  globalSearchQuery,
}: MenuTabContentProps) {
  // Modal for Adding a new menu
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState("15000");
  const [newStock, setNewStock] = useState("20");
  const [newDesc, setNewDesc] = useState("");
  const [newIsAvailable, setNewIsAvailable] = useState(true);

  // Table individual search queries
  const [allSearch, setAllSearch] = useState("");
  const [availSearch, setAvailSearch] = useState("");
  const [unavailSearch, setUnavailSearch] = useState("");

  // Row selection states for bulk action (Hapus)
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Editing state for inline menu edit
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editStock, setEditStock] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [editAvailable, setEditAvailable] = useState(true);

  // Pagination current active keys
  const [pageAll, setPageAll] = useState(1);
  const [pageAvail, setPageAvail] = useState(1);
  const [pageUnavail, setPageUnavail] = useState(1);

  // Active sorting
  const [sortAsc, setSortAsc] = useState(false);

  // Helpers
  const formatRupiah = (val: number) => {
    return `Rp.${val.toLocaleString("id-ID")}.0000`;
  };

  const handleAddMenu = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newPrice || !newStock) return;

    // Generate cute random ID
    const randomHex = Math.random().toString(36).substring(2, 8);
    const newId = `menu-${randomHex}`;

    const item: MenuItem = {
      id: newId,
      name: newName,
      price: parseInt(newPrice) || 0,
      stock: parseInt(newStock) || 0,
      description: newDesc || `${newName} adalah menu spesial kami.`,
      isAvailable: newIsAvailable,
    };

    setMenuItems((prev) => [item, ...prev]);
    setIsAddOpen(false);

    // Reset forms
    setNewName("");
    setNewPrice("15000");
    setNewStock("20");
    setNewDesc("");
    setNewIsAvailable(true);
  };

  const handleBulkDelete = () => {
    if (selectedIds.length === 0) {
      alert("Pilih item terlebih dahulu dengan menggunakan checkbox!");
      return;
    }
    if (
      confirm(
        `Apakah Anda yakin ingin menghapus ${selectedIds.length} menu terpilih?`,
      )
    ) {
      setMenuItems((prev) =>
        prev.filter((item) => !selectedIds.includes(item.id)),
      );
      setSelectedIds([]);
    }
  };

  const handleSingleDelete = (id: string) => {
    if (confirm("Hapus menu ini?")) {
      setMenuItems((prev) => prev.filter((item) => item.id !== id));
      setSelectedIds((prev) => prev.filter((item_id) => item_id !== id));
    }
  };

  const handleStartEdit = (item: MenuItem) => {
    setEditingId(item.id);
    setEditName(item.name);
    setEditPrice(item.price.toString());
    setEditStock(item.stock.toString());
    setEditDesc(item.description);
    setEditAvailable(item.isAvailable);
  };

  const handleSaveEdit = (id: string) => {
    setMenuItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            name: editName,
            price: parseInt(editPrice) || 0,
            stock: parseInt(editStock) || 0,
            description: editDesc,
            isAvailable: editAvailable,
          };
        }
        return item;
      }),
    );
    setEditingId(null);
  };

  const handleExportData = () => {
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(menuItems, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "cafeasy_menu_database.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Toggle selection checkbox
  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const toggleSelectAll = (itemsOnTable: MenuItem[]) => {
    const itemIds = itemsOnTable.map((i) => i.id);
    const allSelectedInTable = itemIds.every((id) => selectedIds.includes(id));

    if (allSelectedInTable) {
      // Unselect all items on this table
      setSelectedIds((prev) => prev.filter((id) => !itemIds.includes(id)));
    } else {
      // Select all items on this table
      setSelectedIds((prev) => {
        const union = new Set([...prev, ...itemIds]);
        return Array.from(union);
      });
    }
  };

  // Filtration logic
  const getFilteredItems = (isAvailFilter?: boolean) => {
    let list = menuItems;

    // Apply global query search
    if (globalSearchQuery.trim()) {
      const q = globalSearchQuery.toLowerCase();
      list = list.filter(
        (item) =>
          item.id.toLowerCase().includes(q) ||
          item.name.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q),
      );
    }

    // Apply tab individual search
    if (isAvailFilter === undefined) {
      if (allSearch.trim()) {
        const q = allSearch.toLowerCase();
        list = list.filter(
          (item) =>
            item.name.toLowerCase().includes(q) ||
            item.id.toLowerCase().includes(q),
        );
      }
    } else if (isAvailFilter) {
      list = list.filter((item) => item.isAvailable);
      if (availSearch.trim()) {
        const q = availSearch.toLowerCase();
        list = list.filter(
          (item) =>
            item.name.toLowerCase().includes(q) ||
            item.id.toLowerCase().includes(q),
        );
      }
    } else {
      list = list.filter((item) => !item.isAvailable);
      if (unavailSearch.trim()) {
        const q = unavailSearch.toLowerCase();
        list = list.filter(
          (item) =>
            item.name.toLowerCase().includes(q) ||
            item.id.toLowerCase().includes(q),
        );
      }
    }

    // Sorting by ID
    return [...list].sort((a, b) => {
      return sortAsc ? a.id.localeCompare(b.id) : b.id.localeCompare(a.id);
    });
  };

  const allFiltered = getFilteredItems();
  const availableFiltered = getFilteredItems(true);
  const unavailableFiltered = getFilteredItems(false);

  return (
    <div className="space-y-8 select-none font-sans text-white text-left">
      {/* Title block */}
      <div>
        <h2 className="text-3xl font-black font-display text-[#333333] tracking-widest uppercase">
          DATATABLE MENU
        </h2>
        <p className="text-xs text-[#333333] font-bold uppercase tracking-wider mt-1">
          Manajemen Data Makanan & Minuman Cafe
        </p>
      </div>

      {/* ================= SECTION 1: Semua Menu ================= */}
      <div className="bg-white rounded-[40px] shadow-2xl border border-[#E6E6E6] overflow-hidden">
        {/* Table Inner Tool Bar */}
        <div className="p-6 md:p-8 border-b border-[#E6E6E6] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4">
            <h3 className="font-extrabold text-[#333333] text-lg uppercase tracking-wider">
              Semua Menu
            </h3>
            {/* Cari Data Inline Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#333333] w-4 h-4" />
              <input
                type="text"
                value={allSearch}
                onChange={(e) => setAllSearch(e.target.value)}
                placeholder="CARI DATA..."
                className="bg-white text-[#333333] placeholder:text-[#333333] rounded-lg border border-[#E6E6E6] py-1.5 pl-9 pr-4 text-xs w-48 font-medium focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Action buttons matching Image 1 but high contrast */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleExportData}
              className="bg-[#1B3551] text-white border border-white/20 py-2.5 px-5 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4" />
              Export
            </button>
            <button
              onClick={handleBulkDelete}
              className="bg-[#EA4242] text-white border border-red-500/30 py-2.5 px-5 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
              Hapus
            </button>
            <button
              onClick={() => setIsAddOpen(true)}
              className="bg-[#3C78B7] text-white py-2.5 px-6 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-2 transition-transform cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Tambah
            </button>
          </div>
        </div>

        {/* Table representation */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F4F4F4] border-b-1 border-[#E6E6E6] text-xs font-black text-[#333333] uppercase tracking-widest">
                <th className="py-4 px-6 w-12 text-center">
                  <input
                    type="checkbox"
                    checked={
                      allFiltered.length > 0 &&
                      allFiltered.every((i) => selectedIds.includes(i.id))
                    }
                    onChange={() => toggleSelectAll(allFiltered)}
                    className="rounded border-zinc-700 bg-zinc-950 text-[#333333] focus:ring-0 cursor-pointer"
                  />
                </th>
                <th
                  onClick={() => setSortAsc(!sortAsc)}
                  className="py-4 px-6 font-black flex items-center gap-1.5 cursor-pointer hover:text-white select-none"
                >
                  ID MENU
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${sortAsc ? "rotate-180" : ""}`}
                  />
                </th>
                <th className="py-4 px-6 font-black">NAMA MENU</th>
                <th className="py-4 px-6 font-black">HARGA MENU</th>
                <th className="py-4 px-6 font-black">STOK MENU</th>
                <th className="py-4 px-6 font-black">DESKRIPSI MENU</th>
                <th className="py-4 px-6 font-black w-24 text-center">AKSI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm">
              {allFiltered.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="py-12 text-center text-zinc-500 font-bold uppercase tracking-wider"
                  >
                    Menu Tidak Ditemukan
                  </td>
                </tr>
              ) : (
                allFiltered.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-white/5 transition-colors"
                  >
                    <td className="py-4 px-6 text-center">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(item.id)}
                        onChange={() => toggleSelect(item.id)}
                        className="rounded border-zinc-700 bg-zinc-950 text-[#333333] focus:ring-0 cursor-pointer"
                      />
                    </td>
                    {editingId === item.id ? (
                      <>
                        <td className="py-3 px-6 font-mono text-xs text-[#333333] font-bold">
                          {item.id}
                        </td>
                        <td className="py-3 px-6">
                          <input
                            type="text"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="bg-white border-1 border-[#e6e6e6] text-[#333333] rounded font-bold px-3 py-1.5 text-sm w-36 outline-none focus:border-white transition-colors"
                          />
                        </td>
                        <td className="py-3 px-6">
                          <input
                            type="number"
                            value={editPrice}
                            onChange={(e) => setEditPrice(e.target.value)}
                            className="bg-white border-1 border-[#e6e6e6] text-[#333333] rounded font-mono font-bold px-3 py-1.5 text-sm w-24 outline-none focus:border-white transition-colors"
                          />
                        </td>
                        <td className="py-3 px-6">
                          <input
                            type="number"
                            value={editStock}
                            onChange={(e) => setEditStock(e.target.value)}
                            className="bg-white border-1 border-[#e6e6e6] text-[#333333] rounded font-mono font-bold px-3 py-1.5 text-sm w-16 outline-none focus:border-white transition-colors"
                          />
                        </td>
                        <td className="py-3 px-6">
                          <input
                            type="text"
                            value={editDesc}
                            onChange={(e) => setEditDesc(e.target.value)}
                            className="bg-white border-1 border-[#e6e6e6] text-[#333333] rounded font-bold px-3 py-1.5 text-sm w-full outline-none focus:border-white transition-colors"
                          />
                        </td>
                        <td className="py-3 px-6 text-center flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => handleSaveEdit(item.id)}
                            className="p-1.5 px-3 text-xs bg-white text-black rounded font-black flex items-center gap-1 cursor-pointer transition-transform hover:scale-105"
                          >
                            <Check size={12} />
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="p-1.5 px-3 text-xs bg-white text-black rounded font-black flex items-center gap-1 cursor-pointer transition-transform hover:scale-105"
                          >
                            <X size={12} />
                          </button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="py-4 px-6 font-mono text-xs text-[#333333] font-bold">
                          {item.id.toUpperCase()}
                        </td>
                        <td className="py-4 px-6 font-bold text-[#333333] text-xs uppercase tracking-tight">
                          {item.name}
                        </td>
                        <td className="py-4 px-6 font-mono text-xs text-[#333333] font-bold">
                          {formatRupiah(item.price)}
                        </td>
                        <td className="py-4 px-6 font-mono text-xs text-[#333333] font-bold">
                          {item.stock} PCS
                        </td>
                        <td
                          className="py-4 px-6 text-xs text-[#333333] truncate max-w-xs font-semibold"
                          title={item.description}
                        >
                          {item.description}
                        </td>
                        <td className="py-4 px-6 text-center flex items-center justify-center gap-3">
                          <button
                            onClick={() => handleStartEdit(item)}
                            className="text-zinc-400 hover:text-[#333333] p-1.5 rounded transition-colors cursor-pointer"
                            title="Edit"
                          >
                            <Edit size={14} />
                          </button>
                          <button
                            onClick={() => handleSingleDelete(item.id)}
                            className="text-zinc-400 hover:text-[#333333] p-1.5 rounded transition-colors cursor-pointer"
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

        {/* Dummy Pagination */}
        <div className="p-4 border-t border-white/10 flex items-center justify-center gap-1.5 text-zinc-500 text-xs">
          {[1, 2, 3, "...", 8, 9, 10].map((num, idx) => (
            <button
              key={idx}
              onClick={() => typeof num === "number" && setPageAll(num)}
              className={`w-7 h-7 flex items-center justify-center border font-bold transition-all ${
                pageAll === num
                  ? "border-white bg-white text-black font-black"
                  : "border-white/5 text-zinc-400"
              }`}
            >
              {num}
            </button>
          ))}
        </div>
      </div>

      {/* ================= SECTION 2: Menu Tersedia ================= */}
      <div className="bg-white rounded-[40px] shadow-2xl border border-[#E6E6E6] overflow-hidden">
        {/* Table Inner Tool Bar */}
        <div className="p-6 md:p-8 border-b border-[#E6E6E6] flex items-center justify-between">
          <div className="flex flex-wrap items-center gap-4">
            <h3 className="font-extrabold text-[#333333] text-lg uppercase tracking-wider">
              Menu Tersedia
            </h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 w-4 h-4" />
              <input
                type="text"
                value={availSearch}
                onChange={(e) => setAvailSearch(e.target.value)}
                placeholder="CARI DATA..."
                className="bg-white text-[#333333] placeholder:text-[#333333] rounded-lg border border-[#E6E6E6] py-1.5 pl-9 pr-4 text-xs w-48 font-medium focus:outline-none transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Available rows list */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f4f4f4] border-b-1 border-[#E6E6E6] text-xs font-black text-[#333333] uppercase tracking-widest">
                <th className="py-4 px-6 font-black w-1/4">ID MENU</th>
                <th className="py-4 px-6 font-black w-1/4">NAMA MENU</th>
                <th className="py-4 px-6 font-black w-1/6">HARGA MENU</th>
                <th className="py-4 px-6 font-black w-1/12">STOK MENU</th>
                <th className="py-4 px-6 font-black w-1/4">DESKRIPSI MENU</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm">
              {availableFiltered.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="py-12 text-center text-zinc-500 font-bold uppercase tracking-wider"
                  >
                    Tidak ada menu yang tersedia.
                  </td>
                </tr>
              ) : (
                availableFiltered.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-white/5 transition-colors"
                  >
                    <td className="py-4 px-6 font-mono text-xs text-[#333333] font-bold">
                      {item.id.toUpperCase()}
                    </td>
                    <td className="py-4 px-6 font-bold text-xs text-[#333333] text-md uppercase tracking-tight">
                      {item.name}
                    </td>
                    <td className="py-4 px-6 font-mono text-xs text-[#333333] font-bold">
                      {formatRupiah(item.price)}
                    </td>
                    <td className="py-4 px-6 font-mono text-xs text-[#333333] font-bold">
                      {item.stock} PCS
                    </td>
                    <td className="py-4 px-6 text-xs text-[#333333] truncate max-w-xs font-semibold">
                      {item.description}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Dummy Pagination */}
        <div className="p-4 border-t border-white/10 flex items-center justify-center gap-1.5 text-zinc-500 text-xs">
          {[1, 2, 3, "...", 8, 9, 10].map((num, idx) => (
            <button
              key={idx}
              onClick={() => typeof num === "number" && setPageAvail(num)}
              className={`w-7 h-7 flex items-center justify-center border font-bold transition-all ${
                pageAvail === num
                  ? "border-white bg-white text-black font-black"
                  : "border-white/5 text-zinc-400"
              }`}
            >
              {num}
            </button>
          ))}
        </div>
      </div>

      {/* ================= SECTION 3: Menu Tidak Tersedia / Kosong Placeholder ================= */}
      <div className="bg-white rounded-[40px] shadow-2xl border border-[#E6E6E6] overflow-hidden">
        {/* Title matches screenshot which literally shows Menu Tersedia but contains Menu Tidak Tersedia indicator */}
        <div className="p-6 md:p-8 border-b border-[#E6E6E6] flex items-center justify-between">
          <div className="flex flex-wrap items-center gap-4">
            <h3 className="font-extrabold text-[#333333] text-lg uppercase tracking-wider">
              Menu Tidak Tersedia
            </h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 w-4 h-4" />
              <input
                type="text"
                value={unavailSearch}
                onChange={(e) => setUnavailSearch(e.target.value)}
                placeholder="CARI DATA..."
                className="bg-white text-[#333333] placeholder:text-[#333333] rounded-lg border border-[#E6E6E6] py-1.5 pl-9 pr-4 text-xs w-48 font-medium focus:outline-none transition-colors"
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f4f4f4] border-b-1 border-[#E6E6E6] text-xs font-black text-[#333333] uppercase tracking-widest">
                <th className="py-4 px-6 font-black w-1/4 ">ID MENU</th>
                <th className="py-4 px-6 font-black w-1/4">NAMA MENU</th>
                <th className="py-4 px-6 font-black w-1/6">HARGA MENU</th>
                <th className="py-4 px-5 font-black w-1/12">STOK MENU</th>
                <th className="py-4 px-6 font-black w-1/4">DESKRIPSI MENU</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm">
              {unavailableFiltered.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="py-12 text-center text-[#333333] font-bold uppercase tracking-wider"
                  >
                    Menu Tidak Tersedia
                  </td>
                </tr>
              ) : (
                unavailableFiltered.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-white/5 transition-colors text-zinc-500"
                  >
                    <td className="py-4 px-6 font-mono text-xs text-zinc-650 font-bold">
                      {item.id.toUpperCase()}
                    </td>
                    <td className="py-4 px-6 font-extrabold text-zinc-550 text-md uppercase tracking-tight line-through">
                      {item.name}
                    </td>
                    <td className="py-4 px-6 font-mono text-xs text-zinc-550">
                      {formatRupiah(item.price)}
                    </td>
                    <td className="py-4 px-5 font-mono text-xs text-zinc-550">
                      {item.stock} PCS
                    </td>
                    <td className="py-4 px-6 text-xs text-zinc-550 truncate max-w-xs italic">
                      {item.description}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Dummy Pagination */}
        <div className="p-4 border-t border-white/10 flex items-center justify-center gap-1.5 text-zinc-500 text-xs">
          {[1, 2, 3, "...", 8, 9, 10].map((num, idx) => (
            <button
              key={idx}
              onClick={() => typeof num === "number" && setPageUnavail(num)}
              className={`w-7 h-7 flex items-center justify-center border font-bold transition-all ${
                pageUnavail === num
                  ? "border-white bg-white text-black font-black"
                  : "border-white/5 text-zinc-400"
              }`}
            >
              {num}
            </button>
          ))}
        </div>
      </div>

      {/* ================= MODAL: TAMBAH MENU ================= */}
      {isAddOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-55 animate-in fade-in duration-200">
          <div className="bg-white text-black rounded-[40px] border-b-4 border-r-4 border-black w-full max-w-md p-8 shadow-2xl relative">
            <button
              onClick={() => setIsAddOpen(false)}
              className="absolute right-6 top-6 text-zinc-450 hover:text-black transition-colors"
            >
              <X size={20} />
            </button>

            <h3 className="text-3xl font-display font-black tracking-tight uppercase mb-6 leading-none pt-2">
              TAMBAH MENU.
            </h3>

            <form onSubmit={handleAddMenu} className="space-y-6 text-left">
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block mb-1">
                  Nama Menu
                </label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="MINUMAN_ES_KOPI_SUSU..."
                  className="w-full border-b-2 border-black py-2.5 text-md font-bold text-black outline-none placeholder:text-zinc-200 bg-transparent"
                />
              </div>

              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block mb-1">
                  Harga Menu (Rupiah)
                </label>
                <input
                  type="number"
                  required
                  value={newPrice}
                  onChange={(e) => setNewPrice(e.target.value)}
                  placeholder="IDR_PRICE"
                  className="w-full border-b-2 border-black py-2.5 text-md font-bold text-black outline-none placeholder:text-zinc-200 bg-transparent"
                />
              </div>

              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block mb-1">
                  Stok Awal
                </label>
                <input
                  type="number"
                  required
                  value={newStock}
                  onChange={(e) => setNewStock(e.target.value)}
                  placeholder="STOCK_VALUE"
                  className="w-full border-b-2 border-black py-2.5 text-md font-bold text-black outline-none placeholder:text-zinc-200 bg-transparent"
                />
              </div>

              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block mb-1">
                  Deskripsi Menu
                </label>
                <textarea
                  rows={2}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Uraian singkat cita rasa..."
                  className="w-full border-b-2 border-black py-1.5 text-md font-bold text-black outline-none placeholder:text-zinc-200 bg-transparent resize-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block mb-2">
                  Status Ketersediaan
                </label>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setNewIsAvailable(true)}
                    className={`flex-1 py-3 px-4 rounded-full text-xs font-black uppercase tracking-widest transition-transform hover:scale-105 cursor-pointer ${
                      newIsAvailable
                        ? "bg-black text-white"
                        : "bg-zinc-100 text-zinc-400"
                    }`}
                  >
                    Tersedia
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewIsAvailable(false)}
                    className={`flex-1 py-3 px-4 rounded-full text-xs font-black uppercase tracking-widest transition-transform hover:scale-105 cursor-pointer ${
                      !newIsAvailable
                        ? "bg-black text-white"
                        : "bg-zinc-100 text-zinc-400"
                    }`}
                  >
                    Kosong
                  </button>
                </div>
              </div>

              <div className="pt-4 flex justify-between items-center">
                <span className="text-[10px] font-mono font-bold tracking-widest text-zinc-450 uppercase">
                  PORT: 3000
                </span>
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
