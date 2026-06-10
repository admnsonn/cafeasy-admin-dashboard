/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search, Mail, Bell, Shield, ChevronDown, User, LogOut } from 'lucide-react';
import { AdminProfile } from '../types';

interface NavbarProps {
  profile: AdminProfile;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onLogout: () => void;
  onGoToProfile: () => void;
}

export function Navbar({ profile, searchQuery, onSearchChange, onLogout, onGoToProfile }: NavbarProps) {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <header className="bg-[#0A0A0A] border-b border-white/10 h-20 px-8 flex items-center justify-between sticky top-0 z-40 select-none font-sans text-white">
      {/* Search Input Bar */}
      <div className="relative w-96">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 w-4 h-4 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="CARI DATA SISTEM..."
          className="w-full bg-[#121212] text-white placeholder-zinc-650 border border-white/10 rounded-full py-2 pl-11 pr-4 text-xs font-bold tracking-wider focus:outline-none focus:ring-1 focus:ring-white/20 transition-all outline-none"
        />
      </div>

      {/* Control Tools and Profile Block */}
      <div className="flex items-center gap-6">
        {/* Messages Shortcut */}
        <button className="text-zinc-450 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full relative cursor-pointer">
          <Mail className="w-4.5 h-4.5 text-zinc-400" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-zinc-100 rounded-full" />
        </button>

        {/* Alarm Bell */}
        <button className="text-zinc-450 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full relative cursor-pointer">
          <Bell className="w-4.5 h-4.5 text-zinc-400" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
        </button>

        {/* Separator line */}
        <div className="w-px h-6 bg-white/10" />

        {/* Profile Card Section */}
        <div className="relative font-sans">
          <button 
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-3.5 hover:bg-white/5 p-1 px-2.5 rounded-xl transition-all cursor-pointer text-left focus:outline-none"
          >
            <img
              src={profile.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop"}
              alt="Avatar Admin"
              referrerPolicy="no-referrer"
              className="w-9 h-9 rounded-full object-cover border border-white/15"
            />
            <div className="hidden md:block">
              <h4 className="text-xs font-black text-white leading-tight uppercase tracking-wider">
                {profile.firstName} {profile.lastName}
              </h4>
              <p className="text-[9px] text-zinc-500 font-mono tracking-widest uppercase leading-tight font-bold">
                Level Admin Utama
              </p>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-zinc-400 transition-transform duration-200 mt-0.5" />
          </button>

          {/* Popover actions */}
          {showDropdown && (
            <>
              <div 
                className="fixed inset-0 z-30" 
                onClick={() => setShowDropdown(false)}
              />
              <div className="absolute right-0 mt-2 w-52 bg-[#0F0F0F] rounded-xl shadow-2xl py-2 z-40 border border-white/10 divide-y divide-white/5 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-4 py-2.5 text-[10px] font-mono text-zinc-500 tracking-wider">
                  ID: <span className="font-bold text-white uppercase">{profile.adminId}</span>
                </div>
                <div className="py-1">
                  <button
                    onClick={() => {
                      onGoToProfile();
                      setShowDropdown(false);
                    }}
                    className="w-full text-left px-4 py-2 text-xs font-bold uppercase tracking-wider text-zinc-300 hover:bg-white/5 hover:text-white transition-colors flex items-center gap-2.5 cursor-pointer"
                  >
                    <User className="w-3.5 h-3.5 text-zinc-400" />
                    Profil Admin
                  </button>
                  <button
                    onClick={onLogout}
                    className="w-full text-left px-4 py-2 text-xs font-bold uppercase tracking-wider text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors flex items-center gap-2.5 cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5 text-red-400" />
                    Keluar Sistem
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
