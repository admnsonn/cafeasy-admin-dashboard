/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  UserRound, 
  BookOpen, 
  RefreshCw, 
  Users, 
  LayoutGrid, 
  Image as ImageIcon, 
  LogOut 
} from 'lucide-react';
import { CafeasyLogo } from './CafeasyLogo';
import { DashboardTab } from '../types';

interface SidebarProps {
  activeTab: DashboardTab;
  onTabChange: (tab: DashboardTab) => void;
  onLogout: () => void;
  cafeName: string;
}

export function Sidebar({ activeTab, onTabChange, onLogout, cafeName }: SidebarProps) {
  const menuItems = [
    {
      id: DashboardTab.PROFILE_ADMIN,
      label: 'Profile Admin',
      icon: UserRound
    },
    {
      id: DashboardTab.DATA_MENU,
      label: 'Data Menu',
      icon: BookOpen
    },
    {
      id: DashboardTab.DATA_TRANSAKSI,
      label: 'Data Transaksi',
      icon: RefreshCw
    },
    {
      id: DashboardTab.DATA_PELANGGAN,
      label: 'Data Pelanggan',
      icon: Users
    },
    {
      id: DashboardTab.DATA_KATEGORI,
      label: 'Data Kategori',
      icon: LayoutGrid
    },
    {
      id: DashboardTab.DATA_BANNER,
      label: 'Data Banner',
      icon: ImageIcon
    }
  ];

  return (
    <aside className="w-72 bg-[#0F0F0F] text-zinc-100 flex flex-col justify-between h-screen sticky top-0 border-r border-white/10 select-none flex-shrink-0 font-sans">
      <div className="flex flex-col">
        {/* Brand Header */}
        <div className="p-8 pb-10 flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shrink-0">
            <div className="w-4 h-4 bg-black rotate-45"></div>
          </div>
          <span className="font-display font-black text-2xl text-white tracking-tighter uppercase">
            CAFEASY
          </span>
        </div>

        {/* Navigation Items */}
        <nav className="px-4 space-y-1.5">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full group flex items-center gap-4 py-3 px-5 rounded-xl text-xs font-extrabold uppercase tracking-widest transition-all duration-150 cursor-pointer ${
                  isActive
                    ? 'bg-white text-black font-black shadow-md scale-[1.02]'
                    : 'text-zinc-500 hover:text-zinc-200 hover:bg-white/5'
                }`}
              >
                <IconComponent
                  className={`w-4 h-4 transition-transform duration-200 group-hover:scale-105 ${
                    isActive ? 'text-black font-black' : 'text-zinc-500 group-hover:text-zinc-300'
                  }`}
                />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Logout Action at Bottom */}
      <div className="p-4 border-t border-white/10">
        <button
          onClick={onLogout}
          className="w-full group flex items-center gap-4 py-3.5 px-5 rounded-xl text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-all duration-150 cursor-pointer"
        >
          <LogOut className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
