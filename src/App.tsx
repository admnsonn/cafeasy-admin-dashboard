/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Type imports
import { 
  ApplicationView, 
  DashboardTab, 
  AdminProfile, 
  MenuItem, 
  Transaction, 
  Customer, 
  Category, 
  BannerItem 
} from './types';

// Component imports
import { SplashScreen } from './components/SplashScreen';
import { AuthScreen } from './components/AuthScreen';
import { Sidebar } from './components/Sidebar';
import { Navbar } from './components/Navbar';
import { MenuTabContent } from './components/MenuTabContent';
import { ProfileTabContent } from './components/ProfileTabContent';
import { TransactionTabContent } from './components/TransactionTabContent';
import { CustomerTabContent } from './components/CustomerTabContent';
import { CategoryTabContent } from './components/CategoryTabContent';
import { BannerTabContent } from './components/BannerTabContent';

export default function App() {
  // Application view controller states
  const [currentView, setCurrentView] = useState<ApplicationView>(ApplicationView.SPLASH);
  const [activeTab, setActiveTab] = useState<DashboardTab>(DashboardTab.DATA_MENU);
  
  // Responsive sidebar drawer state (for mobile viewport)
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  
  // Navbar specific filter search query
  const [searchQuery, setSearchQuery] = useState('');

  // 1. Core Profile state (Matches Image 2 details)
  const [profile, setProfile] = useState<AdminProfile>({
    username: 'andri_p',
    email: 'andrip@mail.com',
    cafeName: 'Etnicafeinary',
    firstName: 'Andri',
    lastName: 'Purnama',
    adminId: 'adm-r4rodv',
    phone: '0826263547',
    address: 'Jl. Distrik Aksara No. 404, Blok C, Kawasan Lama, Kota Metropola.',
    cafeDescription: 'Tempat di mana dentum bass modern bertemu dengan akar tradisi. etnicafeinary adalah ruang transisi bagi mereka yang mencari pelarian di tengah kota.',
    bannerUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1200&auto=format&fit=crop',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=facearea&facepad=2' // Andri Purnama avatar
  });

  // 2. Core Menu list state (Matches Image 1 items)
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    {
      id: 'menu-cmg5hi',
      name: 'Lechy Ice',
      price: 15000,
      stock: 20,
      description: 'Lechy Ice adalan es leci segar premium dengan buah leci pilihan.',
      isAvailable: true
    },
    {
      id: 'menu-j8g3l4',
      name: 'Nasi Gila',
      price: 25000,
      stock: 15,
      description: 'Nasi Gila ini adalan tumisan sosis bakso pedas gila gurih di atas nasi hangat.',
      isAvailable: true
    },
    {
      id: 'menu-rmg68k',
      name: 'Bebek Goreng',
      price: 28000,
      stock: 30,
      description: 'Bebek Goreng garing di luar, empuk gurih di dalam dilumuri bumbu rahasia.',
      isAvailable: true
    },
    {
      id: 'menu-vrfigq',
      name: 'Nasi Goreng',
      price: 21000,
      stock: 17,
      description: 'Nasi Goreng tradisional spesial bumbu rempah harum nusantara.',
      isAvailable: true
    }
  ]);

  // 3. Mock Transactions (Matched to Cafe Theme)
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: 'TX-9082',
      customerName: 'Asep Ridwan',
      date: '2026-06-10 14:20',
      total: 51200,
      status: 'Selesai',
      itemsSummary: '2x Lechy Ice, 1.0x Nasi Gila'
    },
    {
      id: 'TX-8921',
      customerName: 'Lina Marlina',
      date: '2026-06-10 13:05',
      total: 28000,
      status: 'Proses',
      itemsSummary: '1x Bebek Goreng'
    },
    {
      id: 'TX-8740',
      customerName: 'Banu Santoso',
      date: '2026-06-09 18:45',
      total: 67000,
      status: 'Selesai',
      itemsSummary: '1x Nasi Goreng, 1x Bebek Goreng, 1x Lechy Ice'
    },
    {
      id: 'TX-8531',
      customerName: 'Hana Clarissa',
      date: '2026-06-09 11:15',
      total: 21000,
      status: 'Batal',
      itemsSummary: '1x Nasi Goreng (Kosong)'
    }
  ]);

  // 4. Mock Customer Database (Matched to CRM)
  const [customers, setCustomers] = useState<Customer[]>([
    {
      id: 'CUST-3901',
      name: 'Asep Ridwan',
      phone: '08122334455',
      email: 'asep.ridwan@gmail.com',
      status: 'Aktif'
    },
    {
      id: 'CUST-2041',
      name: 'Lina Marlina',
      phone: '08579988112',
      email: 'linamar@grom.co.id',
      status: 'Aktif'
    },
    {
      id: 'CUST-1049',
      name: 'Banu Santoso',
      phone: '08216655443',
      email: 'banu_s@outlook.com',
      status: 'Aktif'
    },
    {
      id: 'CUST-9011',
      name: 'Hana Clarissa',
      phone: '08990102030',
      email: 'hana.clar@live.com',
      status: 'Nonaktif'
    }
  ]);

  // 5. Mock Categories
  const [categories, setCategories] = useState<Category[]>([
    {
      id: 'cat-01',
      name: 'Sajian Utama',
      description: 'Nasi gila, nasi goreng, bebek goreng manis, serta sup tradisional.'
    },
    {
      id: 'cat-02',
      name: 'Minuman Segar',
      description: 'Aneka jus, Lechy Ice soda gergaji, boba, matcha, iced americano.'
    },
    {
      id: 'cat-03',
      name: 'Camilan Gurih',
      description: 'Kentang goreng bumbu bawang, mendoan crispy, singkong keju.'
    }
  ]);

  // 6. Mock Banner list
  const [banners, setBanners] = useState<BannerItem[]>([
    {
      id: 'ban-001',
      title: 'Diskon Akhir Pekan 20% khusus Kopi Espresso Nusantara',
      imageUrl: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=600&auto=format&fit=crop',
      isActive: true
    },
    {
      id: 'ban-002',
      title: 'Sarapan Sehat Hemat: Dapatkan Nasi Goreng + Kopi Susu Aren hanya Rp.25rb',
      imageUrl: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?q=80&w=600&auto=format&fit=crop',
      isActive: true
    }
  ]);

  // Reset tab search variables whenever tab switches
  useEffect(() => {
    setSearchQuery('');
  }, [activeTab]);

  const handleLogout = () => {
    if (confirm('Apakah Anda yakin ingin keluar dari sistem CAFEASY?')) {
      setCurrentView(ApplicationView.LOGIN);
    }
  };

  const handleAuthSuccess = (savedProfile: AdminProfile) => {
    setProfile(savedProfile);
    setCurrentView(ApplicationView.DASHBOARD);
  };

  // Rendering dashboard main tab pages
  const renderTabContent = () => {
    switch (activeTab) {
      case DashboardTab.PROFILE_ADMIN:
        return (
          <ProfileTabContent 
            profile={profile} 
            setProfile={setProfile} 
          />
        );
      case DashboardTab.DATA_MENU:
        return (
          <MenuTabContent 
            menuItems={menuItems} 
            setMenuItems={setMenuItems} 
            globalSearchQuery={searchQuery}
          />
        );
      case DashboardTab.DATA_TRANSAKSI:
        return (
          <TransactionTabContent 
            transactions={transactions} 
            setTransactions={setTransactions} 
            searchQuery={searchQuery}
          />
        );
      case DashboardTab.DATA_PELANGGAN:
        return (
          <CustomerTabContent 
            customers={customers} 
            setCustomers={setCustomers} 
            searchQuery={searchQuery}
          />
        );
      case DashboardTab.DATA_KATEGORI:
        return (
          <CategoryTabContent 
            categories={categories} 
            setCategories={setCategories} 
            searchQuery={searchQuery}
          />
        );
      case DashboardTab.DATA_BANNER:
        return (
          <BannerTabContent 
            banners={banners} 
            setBanners={setBanners} 
            searchQuery={searchQuery}
          />
        );
      default:
        return (
          <div className="p-8 text-center text-slate-500 font-semibold bg-white border rounded-2xl">
            Modul sedang dikembangkan.
          </div>
        );
    }
  };

  // Render layout screen conditionally
  switch (currentView) {
    case ApplicationView.SPLASH:
      return (
        <SplashScreen 
          onComplete={() => setCurrentView(ApplicationView.LOGIN)} 
        />
      );

    case ApplicationView.REGISTER:
    case ApplicationView.LOGIN:
      return (
        <AuthScreen 
          onAuthSuccess={handleAuthSuccess} 
          initialProfile={profile}
        />
      );

    case ApplicationView.DASHBOARD:
      return (
        <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-row font-sans">
          
          {/* ================= DESKTOP SIDEBAR ================= */}
          <div className="hidden lg:block">
            <Sidebar
              activeTab={activeTab}
              onTabChange={(tab) => {
                setActiveTab(tab);
                setIsMobileSidebarOpen(false);
              }}
              onLogout={handleLogout}
              cafeName={profile.cafeName}
            />
          </div>

          {/* ================= MOBILE SIDEBAR DRAWER OVERLAY ================= */}
          <AnimatePresence>
            {isMobileSidebarOpen && (
              <>
                {/* Backdrop overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsMobileSidebarOpen(false)}
                  className="fixed inset-0 bg-black/80 z-50 lg:hidden"
                />

                {/* Left sliding sidebar drawer */}
                <motion.div
                  initial={{ x: '-100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '-100%' }}
                  transition={{ type: 'spring', damping: 25 }}
                  className="fixed left-0 top-0 bottom-0 z-55 lg:hidden flex shadow-2xl"
                >
                  <Sidebar
                    activeTab={activeTab}
                    onTabChange={(tab) => {
                      setActiveTab(tab);
                      setIsMobileSidebarOpen(false);
                    }}
                    onLogout={handleLogout}
                    cafeName={profile.cafeName}
                  />
                  {/* Close drawer button */}
                  <button 
                    onClick={() => setIsMobileSidebarOpen(false)}
                    className="h-10 w-10 text-white bg-black absolute top-5 -right-12 rounded-r-lg flex items-center justify-center cursor-pointer hover:bg-zinc-800 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* ================= MAIN AREA WRAPPER ================= */}
          <div className="flex-1 flex flex-col min-w-0 bg-[#0A0A0A]">
            {/* Header / Navbar */}
            <div className="sticky top-0 z-40 bg-[#0A0A0A]">
              {/* Mobile top strip for responsive layout */}
              <div className="lg:hidden flex items-center justify-between p-4 px-6 border-b border-white/10 bg-[#0F0F0F]">
                <button
                  onClick={() => setIsMobileSidebarOpen(true)}
                  className="p-2 text-white hover:bg-white/5 rounded-xl transition-all cursor-pointer"
                >
                  <Menu size={24} />
                </button>
                <div className="flex items-center gap-2">
                  <span className="font-display font-black text-white tracking-widest uppercase select-none text-sm">
                    {profile.cafeName}
                  </span>
                </div>
                <img
                  src={profile.avatarUrl}
                  alt="Admin"
                  referrerPolicy="no-referrer"
                  className="w-8 h-8 rounded-full border border-white/20"
                />
              </div>

              {/* Standard Master Navbar */}
              <Navbar
                profile={profile}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                onLogout={handleLogout}
                onGoToProfile={() => setActiveTab(DashboardTab.PROFILE_ADMIN)}
              />
            </div>

            {/* Displaying Current Tab View */}
            <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto overflow-y-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                >
                  {renderTabContent()}
                </motion.div>
              </AnimatePresence>
            </main>
          </div>

        </div>
      );
  }
}

