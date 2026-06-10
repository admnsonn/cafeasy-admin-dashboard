/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Camera, Edit3, Save, Phone, User, Home, AlignLeft, Building } from 'lucide-react';
import { AdminProfile } from '../types';

interface ProfileTabContentProps {
  profile: AdminProfile;
  setProfile: React.Dispatch<React.SetStateAction<AdminProfile>>;
}

export function ProfileTabContent({ profile, setProfile }: ProfileTabContentProps) {
  // Editing states
  const [editSection, setEditSection] = useState<'profile' | 'pribadi' | 'professional' | null>(null);

  // Buffer states for edit fields
  const [firstName, setFirstName] = useState(profile.firstName);
  const [lastName, setLastName] = useState(profile.lastName);
  const [email, setEmail] = useState(profile.email);
  const [phone, setPhone] = useState(profile.phone);
  const [cafeName, setCafeName] = useState(profile.cafeName);
  const [username, setUsername] = useState(profile.username);
  const [address, setAddress] = useState(profile.address);
  const [cafeDescription, setCafeDescription] = useState(profile.cafeDescription);

  const startEditSection = (section: 'profile' | 'pribadi' | 'professional') => {
    setEditSection(section);
    setFirstName(profile.firstName);
    setLastName(profile.lastName);
    setEmail(profile.email);
    setPhone(profile.phone);
    setCafeName(profile.cafeName);
    setUsername(profile.username);
    setAddress(profile.address);
    setCafeDescription(profile.cafeDescription);
  };

  const handleSavePribadi = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile(prev => ({
      ...prev,
      firstName,
      lastName,
      email,
      phone,
      cafeName,
      username
    }));
    setEditSection(null);
  };

  const handleSaveProfessional = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile(prev => ({
      ...prev,
      address,
      cafeDescription
    }));
    setEditSection(null);
  };

  const handleTriggerAvatarChange = () => {
    const freshAvatars = [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop', // Male alternate
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop', // Female alternate
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop'  // Glasses alternate
    ];
    const picked = freshAvatars[Math.floor(Math.random() * freshAvatars.length)];
    setProfile(prev => ({ ...prev, avatarUrl: picked }));
  };

  const handleTriggerBannerChange = () => {
    const banners = [
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop', // Cozy cafe
      'https://images.unsplash.com/photo-1445116572660-236099ec97a0?q=80&w=1200&auto=format&fit=crop', // Wood tables
      'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1200&auto=format&fit=crop'  // Bright espresso
    ];
    const picked = banners[Math.floor(Math.random() * banners.length)];
    setProfile(prev => ({ ...prev, bannerUrl: picked }));
  };

  return (
    <div className="space-y-8 select-none font-sans pb-16 text-white text-left">
      {/* Title */}
      <div>
        <h2 className="text-3xl font-black font-display text-white tracking-widest uppercase">
          PROFIL ADMIN.
        </h2>
        <p className="text-xs text-zinc-500 font-bold uppercase tracking-wider mt-1">Konfigurasi Hak Akses & Parameter Cafe</p>
      </div>

      <div className="bg-[#0F0F0F] rounded-[40px] shadow-2xl border border-white/10 overflow-hidden">
        {/* Banner with camera upload trigger */}
        <div className="h-64 relative group overflow-hidden bg-zinc-950">
          <img
            src={profile.bannerUrl || "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1200&auto=format&fit=crop"}
            alt="Cafe Banner Photo"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-80 group-hover:scale-102 transition-transform duration-500"
          />
          <button 
            onClick={handleTriggerBannerChange}
            className="absolute bottom-6 right-6 bg-white hover:bg-zinc-200 text-black p-3 rounded-full shadow-lg transition-transform hover:scale-105 cursor-pointer flex items-center justify-center border border-black"
            title="Ubah Foto Sampul"
          >
            <Camera className="w-5 h-5" />
          </button>
        </div>

        {/* Profile Details Bar */}
        <div className="p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative border-b border-white/10">
          <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
            {/* Avatar Bubble */}
            <div className="relative -mt-16 md:-mt-20">
              <img
                src={profile.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=facearea&facepad=2"}
                alt={`${profile.firstName} Avatar`}
                referrerPolicy="no-referrer"
                className="w-28 h-28 md:w-32 md:h-32 rounded-full object-cover border-4 border-[#0F0F0F] ring-1 ring-white/20 shadow-md bg-zinc-800"
              />
              <button 
                onClick={handleTriggerAvatarChange}
                className="absolute bottom-1 right-1 bg-white hover:bg-zinc-200 text-black p-2 rounded-full shadow border border-black transition-transform hover:scale-105 cursor-pointer"
                title="Ganti Foto Profil"
              >
                <Camera className="w-3.5 h-3.5" />
              </button>
            </div>

            <div>
              <h3 className="text-2xl font-black font-display text-white flex items-center gap-3 uppercase tracking-tight">
                {profile.firstName} {profile.lastName}
                <span className="text-[10px] bg-white text-black font-black py-1 px-3 rounded-full uppercase tracking-widest leading-none">
                  SISTEM OWNER
                </span>
              </h3>
              <p className="text-xs text-zinc-400 font-mono mt-1 font-bold tracking-wider">{profile.email.toUpperCase()}</p>
              <p className="text-xs text-zinc-500 font-mono mt-1 max-w-md line-clamp-1">
                {profile.address.toUpperCase()}
              </p>
            </div>
          </div>

          <button 
            onClick={() => startEditSection('profile')}
            className="flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-[#0A0A0A] bg-white hover:bg-zinc-200 py-2.5 px-6 rounded-full transition-transform hover:scale-[1.02] cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5" />
            Edit Info
          </button>
        </div>

        {/* Informasi blocks */}
        <div className="p-6 md:p-8 space-y-8 bg-[#0F0F0F]">
          
          {/* ================= CARD 1: Informasi Pribadi ================= */}
          <div className="bg-[#121212] rounded-3xl border border-white/10 p-6 md:p-8 shadow-md">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
              <h4 className="font-black text-white text-xs uppercase tracking-widest flex items-center gap-2">
                <User className="w-4 h-4 text-zinc-405" />
                Informasi Parameter Utama
              </h4>
              {editSection === 'pribadi' || editSection === 'profile' ? null : (
                <button
                  onClick={() => startEditSection('pribadi')}
                  className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-white border border-white/10 hover:border-white bg-[#0A0A0A] py-1.5 px-3.5 rounded-full transition-colors cursor-pointer"
                >
                  <Edit3 className="w-3" />
                  Edit
                </button>
              )}
            </div>

            {/* Editable Form Block */}
            {editSection === 'pribadi' || editSection === 'profile' ? (
              <form onSubmit={handleSavePribadi} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2">Nama Cafe</label>
                    <input
                      type="text"
                      required
                      value={cafeName}
                      onChange={(e) => setCafeName(e.target.value)}
                      className="w-full bg-[#0A0A0A] text-white border-2 border-zinc-800 focus:border-white py-2.5 px-4 text-sm font-bold rounded-lg focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2">Nama Pengguna (Username)</label>
                    <input
                      type="text"
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full bg-[#0A0A0A] text-white border-2 border-zinc-800 focus:border-white py-2.5 px-4 text-sm font-mono font-bold rounded-lg focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2">Nama Depan</label>
                    <input
                      type="text"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full bg-[#0A0A0A] text-white border-2 border-zinc-800 focus:border-white py-2.5 px-4 text-sm font-bold rounded-lg focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2">Nama Belakang</label>
                    <input
                      type="text"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full bg-[#0A0A0A] text-white border-2 border-zinc-800 focus:border-white py-2.5 px-4 text-sm font-bold rounded-lg focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2">Nomor Telepon</label>
                    <input
                      type="text"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[#0A0A0A] text-white border-2 border-zinc-800 focus:border-white py-2.5 px-4 text-sm font-mono font-bold rounded-lg focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2">Email</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#0A0A0A] text-white border-2 border-zinc-800 focus:border-white py-2.5 px-4 text-sm font-mono font-bold rounded-lg focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setEditSection(null)}
                    className="px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg font-bold uppercase tracking-wider cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-white text-black hover:bg-zinc-200 font-extrabold uppercase tracking-widest rounded-lg flex items-center gap-1.5 cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5" />
                    Simpan
                  </button>
                </div>
              </form>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div>
                  <span className="block text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">Nama Cafe resmi</span>
                  <div className="bg-[#0A0A0A] text-white px-5 py-3.5 rounded-xl border border-white/5 font-extrabold uppercase tracking-wider">
                    {profile.cafeName}
                  </div>
                </div>
                <div>
                  <span className="block text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">Username Admin</span>
                  <div className="bg-[#0A0A0A] text-zinc-100 px-5 py-3.5 rounded-xl border border-white/5 font-mono">
                    {profile.username}
                  </div>
                </div>
                <div>
                  <span className="block text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">Administrasi Atas Nama</span>
                  <div className="bg-[#0A0A0A] text-white px-5 py-3.5 rounded-xl border border-white/5 font-extrabold uppercase tracking-wide">
                    {profile.firstName} {profile.lastName}
                  </div>
                </div>
                <div>
                  <span className="block text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">Identitas Admin Utama</span>
                  <div className="bg-[#0A0A0A] text-zinc-400 px-5 py-3.5 rounded-xl border border-white/5 font-mono tracking-widest uppercase font-bold text-xs">
                    {profile.adminId}
                  </div>
                </div>
                <div>
                  <span className="block text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">Nomor Kontak Terverifikasi</span>
                  <div className="bg-[#0A0A0A] text-white px-5 py-3.5 rounded-xl border border-white/5 font-mono">
                    {profile.phone}
                  </div>
                </div>
                <div>
                  <span className="block text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">G-Mail Penghubung</span>
                  <div className="bg-[#0A0A0A] text-white px-5 py-3.5 rounded-xl border border-white/5 font-mono">
                    {profile.email.toUpperCase()}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ================= CARD 2: Informasi Professional ================= */}
          <div className="bg-[#121212] rounded-3xl border border-white/10 p-6 md:p-8 shadow-md">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
              <h4 className="font-black text-white text-xs uppercase tracking-widest flex items-center gap-2">
                <Building className="w-4 h-4 text-zinc-405" />
                Informasi Geografis & Deskripsi
              </h4>
              {editSection === 'professional' ? null : (
                <button
                  onClick={() => startEditSection('professional')}
                  className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-white border border-white/10 hover:border-white bg-[#0A0A0A] py-1.5 px-3.5 rounded-full transition-colors cursor-pointer"
                >
                  <Edit3 className="w-3" />
                  Edit
                </button>
              )}
            </div>

            {/* Editable block */}
            {editSection === 'professional' ? (
              <form onSubmit={handleSaveProfessional} className="space-y-6">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2">Alamat Cafe Lengkap</label>
                  <textarea
                    rows={3}
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-[#0A0A0A] text-white border-2 border-zinc-800 focus:border-white py-2.5 px-4 text-sm font-bold rounded-lg focus:outline-none resize-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2">Moto & Deskripsi Singkat Cafe</label>
                  <textarea
                    rows={3}
                    required
                    value={cafeDescription}
                    onChange={(e) => setCafeDescription(e.target.value)}
                    className="w-full bg-[#0A0A0A] text-white border-2 border-zinc-800 focus:border-white py-2.5 px-4 text-sm font-bold rounded-lg focus:outline-none resize-none"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setEditSection(null)}
                    className="px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg font-bold uppercase tracking-wider cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-white text-black hover:bg-zinc-200 font-extrabold uppercase tracking-widest rounded-lg flex items-center gap-1.5 cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5" />
                    Simpan
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-6 text-sm">
                <div>
                  <span className="block text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">Lokasi Terdaftar</span>
                  <div className="bg-[#0A0A0A] text-white px-5 py-4 rounded-xl border border-white/5 font-extrabold leading-relaxed uppercase">
                    {profile.address}
                  </div>
                </div>
                <div>
                  <span className="block text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">Manifesto Cafe</span>
                  <div className="bg-[#0A0A0A] text-zinc-350 px-5 py-4 rounded-xl border border-white/5 font-medium leading-relaxed">
                    {profile.cafeDescription}
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
