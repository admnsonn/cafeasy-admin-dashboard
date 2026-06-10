/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  stock: number;
  description: string;
  isAvailable: boolean;
}

export interface AdminProfile {
  username: string;
  email: string;
  cafeName: string;
  firstName: string;
  lastName: string;
  adminId: string;
  phone: string;
  address: string;
  cafeDescription: string;
  bannerUrl?: string;
  avatarUrl?: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  status: 'Aktif' | 'Nonaktif';
}

export interface Transaction {
  id: string;
  customerName: string;
  date: string;
  total: number;
  status: 'Selesai' | 'Proses' | 'Batal';
  itemsSummary: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
}

export interface BannerItem {
  id: string;
  title: string;
  imageUrl: string;
  isActive: boolean;
}

export enum ApplicationView {
  SPLASH = 'SPLASH',
  REGISTER = 'REGISTER',
  LOGIN = 'LOGIN',
  DASHBOARD = 'DASHBOARD'
}

export enum DashboardTab {
  PROFILE_ADMIN = 'PROFILE_ADMIN',
  DATA_MENU = 'DATA_MENU',
  DATA_TRANSAKSI = 'DATA_TRANSAKSI',
  DATA_PELANGGAN = 'DATA_PELANGGAN',
  DATA_KATEGORI = 'DATA_KATEGORI',
  DATA_BANNER = 'DATA_BANNER'
}
