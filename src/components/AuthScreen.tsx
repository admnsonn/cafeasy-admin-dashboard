/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion } from "motion/react";
import { Eye, EyeOff, Upload } from "lucide-react";
import { AdminProfile } from "../types";

interface AuthScreenProps {
  onAuthSuccess: (profile: AdminProfile) => void;
  initialProfile: AdminProfile;
}

export function AuthScreen({ onAuthSuccess, initialProfile }: AuthScreenProps) {
  const [activeTab, setActiveTab] = useState<"daftar" | "masuk">("masuk");
  const [showPassword, setShowPassword] = useState(false);

  // Form states for Register / Daftar
  const [username, setUsername] = useState("andri_p");
  const [email, setEmail] = useState("andrip@mail.com");
  const [password, setPassword] = useState("password123");
  const [cafeName, setCafeName] = useState("Etnicafeinary");
  const [address, setAddress] = useState(
    "Jl. Distrik Aksara No. 404, Blok C, Kawasan Lama, Kota Metropola.",
  );
  const [cafeDescription, setCafeDescription] = useState(
    "Tempat di mana dentum bass modern bertemu dengan akar tradisi. etnicafeinary adalah ruang transisi bagi mereka yang mencari pelarian di tengah kota.",
  );
  const [fullName, setFullName] = useState("Andri Purnama");
  const [phone, setPhone] = useState("0826263547");
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  // Error block
  const [errorMsg, setErrorMsg] = useState("");

  // Handle local registration simulated save
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !email || !password || !cafeName || !address) {
      setErrorMsg("Harap isi semua field wajib.");
      return;
    }
    setErrorMsg("");

    // Split name into first and last
    const nameParts = fullName.trim().split(" ");
    const firstName = nameParts[0] || "Andri";
    const lastName = nameParts.slice(1).join(" ") || "Purnama";

    const cleanProfile: AdminProfile = {
      username,
      email,
      cafeName,
      firstName,
      lastName,
      adminId: "adm-r4rodv",
      phone,
      address,
      cafeDescription,
      bannerUrl: "/assets/cafe-mock.jpg", // Placeholder but realistic
      avatarUrl: selectedFile || undefined,
    };

    // Save temporary credentials and switch to Login with a success message helper
    alert("Registrasi Berhasil! Silakan klik Masuk Sekarang.");
    setActiveTab("masuk");
  };

  // Handle local login submit
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setErrorMsg("Nama Pengguna dan Kata Sandi wajib diisi.");
      return;
    }

    // Generate admin profile mirroring image data precisely
    const nameParts = fullName.trim().split(" ");
    const firstName = nameParts[0] || "Andri";
    const lastName = nameParts.slice(1).join(" ") || "Purnama";

    const finalProfile: AdminProfile = {
      username,
      email,
      cafeName,
      firstName,
      lastName,
      adminId: "adm-r4rodv",
      phone,
      address,
      cafeDescription,
      bannerUrl:
        "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1200&auto=format&fit=crop", // Realistic beautiful interior cafe photo
      avatarUrl:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=facearea&facepad=2", // Andri Purnama avatar
    };

    onAuthSuccess(finalProfile);
  };

  const triggerMockFile = () => {
    // Simulate picking a profile picture
    setSelectedFile(
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop",
    );
  };

  return (
    <div className="min-h-screen bg-[#F4F4F4] flex items-center justify-center p-5 font-sans antialiased text-black relative overflow-hidden">
      <div className="w-full max-w-xl bg-[#1F2937] text-white rounded-[40px] shadow-2xl p-10 md:p-12 relative">
        {/* Main Header title */}
        <div className="mb-8 text-center">
          <h2 className="text-4xl font-display font-bold tracking-tighter leading-none mb-1.5">
            {activeTab === "daftar" ? "Daftar" : "Masuk"}
          </h2>
          <p className="text-xs text-white font-medium">
            Sistem Administrasi Cafeasy / Portal Autentikasi.
          </p>
        </div>

        {/* Custom Tab Switcher */}
        <div className="flex justify-start border-zinc-100 mb-8 pb-1">
          <button
            type="button"
            onClick={() => {
              setActiveTab("daftar");
              setErrorMsg("");
            }}
            className={`mr-8 pb-3 text-xs font-black tracking-widest transition-all duration-200 relative uppercase ${
              activeTab === "daftar"
                ? "text-white font-bold opacity-100"
                : "text-zinc-400 opacity-60 hover:opacity-100"
            }`}
          >
            Daftar
            {activeTab === "daftar" && (
              <motion.div
                layoutId="authTabUnderline"
                className="absolute left-0 right-0 bottom-[-2px] h-[3px] bg-white"
              />
            )}
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab("masuk");
              setErrorMsg("");
            }}
            className={`pb-3 text-xs font-black tracking-widest transition-all duration-200 relative uppercase ${
              activeTab === "masuk"
                ? "text-white font-bold opacity-100"
                : "text-zinc-400 opacity-60 hover:opacity-100"
            }`}
          >
            Masuk
            {activeTab === "masuk" && (
              <motion.div
                layoutId="authTabUnderline"
                className="absolute left-0 right-0 bottom-[-2px] h-[3px] bg-white"
              />
            )}
          </button>
        </div>

        {errorMsg && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-xs font-semibold text-red-700">
            {errorMsg}
          </div>
        )}

        {/* Dynamic form */}
        {activeTab === "daftar" ? (
          <form onSubmit={handleRegisterSubmit} className="space-y-6">
            {/* Row 1: Nama Pengguna & Nama Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-[10px] font-black tracking-widest text-white block uppercase">
                  Nama Pengguna
                </label>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="andri_p"
                  className="w-full border-b-2 border-zinc-200 py-2 pr-10 text-md font-medium outline-none placeholder:text-zinc-200 transition-colors bg-[#FFFFFF] rounded-lg text-[#333333] px-3"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black tracking-widest text-white block uppercase">
                  Alamat Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="andrip@mail.com"
                  className="w-full border-b-2 border-zinc-200 py-2 pr-10 text-md font-medium outline-none placeholder:text-zinc-200 transition-colors bg-[#FFFFFF] rounded-lg text-[#333333] px-3"
                />
              </div>
            </div>

            {/* Row 2: Kata Sandi & Nama Cafe */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-[10px] font-black tracking-widest text-white block uppercase">
                  Kata Sandi
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full border-b-2 border-zinc-200 py-2 pr-10 text-md font-medium outline-none placeholder:text-zinc-200 transition-colors bg-[#FFFFFF] rounded-lg text-[#333333] px-3"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-black focus:outline-none"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-white block">
                  Nama Cafe
                </label>
                <input
                  type="text"
                  required
                  value={cafeName}
                  onChange={(e) => setCafeName(e.target.value)}
                  placeholder="Etnicafeinary"
                  className="w-full border-b-2 border-zinc-200 py-2 pr-10 text-md font-medium outline-none placeholder:text-zinc-200 transition-colors bg-[#FFFFFF] rounded-lg text-[#333333] px-3"
                />
              </div>
            </div>

            {/* Row 3: Alamat Cafe */}
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-white block">
                Alamat Cafe
              </label>
              <textarea
                rows={2}
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Jl. Distrik Aksara No. 404..."
                className="w-full border-b-2 border-zinc-200 py-2 pr-10 text-md font-medium outline-none placeholder:text-zinc-200 transition-colors bg-[#FFFFFF] rounded-lg text-[#333333] px-3"
              />
            </div>

            {/* Row 4: Deskripsi Cafe */}
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-white block">
                Deskripsi Cafe
              </label>
              <textarea
                rows={2}
                value={cafeDescription}
                onChange={(e) => setCafeDescription(e.target.value)}
                placeholder="Deskripsi singkat estetika cafe..."
                className="w-full border-b-2 border-zinc-200 py-2 pr-10 text-md font-medium outline-none placeholder:text-zinc-200 transition-colors bg-[#FFFFFF] rounded-lg text-[#333333] px-3"
              />
            </div>

            {/* Row 5: Nama Pemilik & Nomor Telp */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-white block">
                  Nama Pemilik
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Andri Purnama"
                  className="w-full border-b-2 border-zinc-200 py-2 text-md font-medium outline-none placeholder:text-zinc-200 transition-colors bg-[#FFFFFF] rounded-lg text-[#333333] px-3"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-white block">
                  Nomor Telepon
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0826..."
                  className="w-full border-b-2 border-zinc-200 py-2 text-md font-medium outline-none placeholder:text-zinc-200 transition-colors bg-[#FFFFFF] rounded-lg text-[#333333] px-3"
                />
              </div>
            </div>

            {/* Row 6: Foto Cafe (Optional) */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-white block">
                Foto Admin Default
              </label>
              <div className="flex rounded-lg overflow-hidden border-2 border-black bg-zinc-50">
                <button
                  type="button"
                  onClick={triggerMockFile}
                  className="bg-[#EDEDED] text-[#333333] hover:bg-zinc-800 font-bold px-4 text-xs transition-colors flex items-center gap-1.5 focus:outline-none py-2.5 uppercase tracking-wider cursor-pointer"
                >
                  <Upload size={13} />
                  Pilih Foto
                </button>
                <span className="flex-1 py-2.5 px-4 text-xs text-zinc-600 truncate bg-white select-none font-semibold">
                  {selectedFile
                    ? "Poto_EtniCafe.jpg [Aktif]"
                    : "Unggah Potret Identifikasi Anda"}
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 flex justify-center items-center">
              <button
                type="submit"
                className="bg-[#1A1A27] hover:bg-zinc-800 text-white font-black text-xs px-10 py-4 rounded-full tracking-widest uppercase hover:scale-[1.03] transition-transform cursor-pointer"
              >
                DAFTAR SEKARANG
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleLoginSubmit} className="space-y-8">
            {/* Username */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-white block">
                Nama Pengguna
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Silakan masukkan nama pengguna Anda"
                className="w-full border-b-2 border-zinc-200 py-2 pr-10 text-md font-medium outline-none placeholder:text-zinc-200 transition-colors bg-[#FFFFFF] rounded-lg text-[#333333] px-3"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-white block">
                Kata Sandi
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full border-b-2 border-zinc-200 py-2 pr-10 text-md font-medium outline-none placeholder:text-zinc-200 transition-colors bg-[#FFFFFF] rounded-lg text-[#333333] px-3"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-black focus:outline-none"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 flex justify-center items-center">
              <button
                type="submit"
                className="bg-[#1A1A27] hover:bg-zinc-800 text-white font-black text-xs px-10 py-4 rounded-full tracking-widest uppercase hover:scale-[1.03] transition-transform cursor-pointer"
              >
                MASUK SEKARANG
              </button>
            </div>
          </form>
        )}

        {/* Footer Status Indicators */}
        <div className="mt-12 pt-8 border-t border-zinc-100 flex justify-between items-center text-[10px] font-bold text-zinc-450">
          <span className="font-mono tracking-wider uppercase text-[#ffffff]">
            SESSION: ACTIVE_3901
          </span>
          <div className="flex gap-2 items-center">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="tracking-widest uppercase text-[#ffffff]">
              SERVER ONLINE
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
