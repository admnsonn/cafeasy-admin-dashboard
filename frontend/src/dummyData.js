// Dummy data for frontend while backend is removed
const dummy = {
  menus: [
    { idMenu: 1, namaMenu: 'Kopi Tubruk', deskripsiMenu: 'Kopi hitam tradisional', hargaMenu: 8000, stokMenu: 20, kategoriMenu: 'Minuman', imageUrl: '/placeholder.png', updatedAt: new Date().toISOString() },
    { idMenu: 2, namaMenu: 'Cappuccino', deskripsiMenu: 'Kopi susu berbusa', hargaMenu: 15000, stokMenu: 10, kategoriMenu: 'Minuman', imageUrl: '/placeholder.png', updatedAt: new Date().toISOString() }
  ],
  kategoris: [
    { idKategori: 1, namaKategori: 'Minuman' },
    { idKategori: 2, namaKategori: 'Makanan' }
  ],
  banners: [
    { idBanner: 1, namaBanner: 'Promo Hari Ini', imageUrl: '/banner1.png' }
  ],
  customers: { data: [ { id: 1, name: 'Joko' }, { id: 2, name: 'Siti' } ] },
  transaksi: [
    { idTransaksi: 1, namaPelanggan: 'Joko', tanggal: new Date().toISOString(), totalHarga: 20000, statusBayar: 'Lunas' }
  ],
  admins: {
    result: [
      { idAdmin: 1, username: 'admin', password: 'admin123', namaPemilikCafe: 'Pemilik', namaCafe: 'CafeEasy', emailCafe: 'admin@cafe.com', alamatCafe: 'Jl. Contoh', deskripsiCafe: 'Cafe nyaman', noHpCafe: '081234567' , imageUrl: '/avatar.png'}
    ]
  }
};

export default dummy;
