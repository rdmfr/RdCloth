# RdCloth Production Roadmap

Dokumen ini mencatat pekerjaan yang perlu diterapkan sebelum RdCloth digunakan sebagai toko online production. Status di bawah menggambarkan kondisi repository saat ini.

## Status Saat Ini

### Sudah tersedia

- Storefront React dengan katalog, cart, checkout, custom order, dan tracking order.
- Dashboard admin untuk produk, order, custom request, review, CMS, dan settings.
- Login admin berbasis session cookie `HttpOnly`.
- Endpoint perubahan data admin dilindungi middleware server.
- TypeScript validation melalui `npm run lint`.

### Masih bersifat prototype

- Data masih disimpan di memory dan seed file.
- Session admin masih disimpan di memory process.
- Pembayaran belum terhubung ke payment gateway.
- Akun customer belum memakai autentikasi production.
- Upload desain masih dikirim sebagai base64 melalui JSON.

## Prioritas Penerapan

### P0 - Wajib sebelum public launch

#### 1. Secret management

- Set `ADMIN_EMAIL` dan `ADMIN_PASSWORD` melalui environment platform deployment.
- Hapus password fallback dari production build.
- Jangan commit `.env`, credential, payment key, atau data customer.
- Tambahkan `.env.example` tanpa nilai rahasia.
- Gunakan password yang panjang dan unik; rotasi apabila pernah dibagikan.

#### 2. Persistent database

Pindahkan data berikut dari memory ke database:

- products dan product variants
- collections
- orders dan order timeline
- custom orders
- reviews
- homepage CMS
- store settings
- admin users dan sessions

Gunakan migration, index untuk `order.id`, `order.createdAt`, `product.slug`, dan backup terjadwal.

#### 3. Authentication dan authorization

- Simpan password admin dalam bentuk hash dengan Argon2id atau bcrypt.
- Simpan session di Redis atau database, bukan `Map` process.
- Tambahkan expiry, revocation, dan logout semua session.
- Tambahkan role permission: owner, order staff, catalog editor.
- Lindungi semua endpoint admin di backend; UI guard saja tidak cukup.
- Tambahkan rate limiting dan lockout sementara pada login gagal.
- Pastikan HTTPS aktif agar cookie `Secure` digunakan.

#### 4. Validasi dan keamanan API

- Validasi body, query, dan params dengan schema validator seperti Zod.
- Batasi nilai status order pada enum yang valid.
- Validasi harga, quantity, stock, rating, email, WhatsApp, dan URL gambar.
- Tambahkan security headers, terutama Content-Security-Policy, X-Content-Type-Options, dan Referrer-Policy.
- Batasi ukuran request berdasarkan endpoint, bukan satu limit besar untuk semua request.
- Tambahkan request logging tanpa mencatat password, token, atau data pembayaran.

#### 5. Privacy customer

- Jangan expose seluruh order melalui endpoint publik.
- Endpoint detail order harus membutuhkan kombinasi invoice dan verifikasi email/WhatsApp.
- Pastikan dashboard customer hanya menampilkan order milik customer tersebut.
- Batasi akses admin sesuai role dan catat akses data sensitif.

### P1 - Wajib untuk operasional harian

#### 6. Payment gateway

- Integrasikan payment gateway resmi, misalnya Midtrans atau Xendit.
- Status `PAID` hanya boleh berubah dari webhook yang tervalidasi.
- Verifikasi signature webhook dan cegah pemrosesan event duplikat.
- Simpan payment reference, amount, status, dan timestamp.
- Tambahkan alur refund dan pembayaran kedaluwarsa.

#### 7. Upload artwork

- Upload file langsung ke object storage.
- Validasi MIME type, extension, ukuran, dan image dimensions.
- Gunakan signed URL untuk file private.
- Jangan menyimpan file besar sebagai base64 di database atau request body.
- Tambahkan malware scanning bila workflow production memerlukannya.

#### 8. Dashboard admin

- Tambahkan filter tanggal, status, customer, dan pencarian invoice.
- Tambahkan pagination dan sorting untuk produk serta order.
- Tampilkan loading, empty, error, dan retry state.
- Tambahkan konfirmasi untuk delete, cancel, dan perubahan pembayaran.
- Tambahkan notifikasi order baru dan custom request baru.
- Tambahkan audit log untuk perubahan produk, harga, CMS, settings, dan status order.
- Tambahkan export order ke CSV.
- Tambahkan indikator stok per ukuran/warna dan peringatan stok rendah.
- Tambahkan chart omzet harian/bulanan setelah data database tersedia.

#### 9. Review moderation

- Review baru harus `pending` secara default.
- Hanya review yang disetujui yang memengaruhi rating dan tampil di storefront.
- Tambahkan anti-spam, rate limit, dan sanitasi komentar.

### P2 - Kualitas dan reliability

- Tambahkan automated tests untuk auth, permission, order, payment webhook, dan inventory.
- Tambahkan end-to-end test untuk login admin, create order, update status, dan logout.
- Tambahkan monitoring uptime, error tracking, dan alert.
- Tambahkan health check database dan dependency.
- Gunakan graceful shutdown.
- Tambahkan CI untuk lint, build, test, dan dependency vulnerability scan.
- Jadwalkan backup dan uji proses restore secara berkala.
- Buat privacy policy, terms of service, return policy, dan kebijakan pengelolaan data customer.

## Kontrak API yang Disarankan

### Public

- `GET /api/products`
- `GET /api/products/:idOrSlug` dengan hanya produk published
- `GET /api/collections`
- `GET /api/reviews?productId=...&approvedOnly=true`
- `POST /api/orders`
- `GET /api/orders/:id` dengan verifikasi customer
- `POST /api/custom-orders`
- `POST /api/reviews`
- `POST /api/subscribers`
- `GET /api/health`

### Admin only

- `GET /api/admin/me`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/admin/orders`
- `PATCH /api/admin/orders/:id/status`
- `GET /api/admin/custom-orders`
- `PATCH /api/admin/custom-orders/:id/status`
- `POST`, `PUT`, `DELETE /api/admin/products...`
- `PATCH /api/admin/reviews/:id/approve`
- `PUT /api/admin/cms`
- `PUT /api/admin/settings`

Endpoint admin sebaiknya memakai prefix `/api/admin` agar batas akses mudah diaudit. Migrasi route dapat dilakukan setelah database dan permission layer tersedia.

## Checklist Deployment

- [ ] Node.js dan dependency menggunakan versi yang didukung.
- [ ] `ADMIN_EMAIL` dan `ADMIN_PASSWORD` sudah diset di secret manager.
- [ ] Tidak ada `.env` atau credential di git.
- [ ] Database production sudah dibuat dan migration sudah dijalankan.
- [ ] Backup database dan restore test sudah berhasil.
- [ ] HTTPS dan domain sudah aktif.
- [ ] Cookie production menggunakan `Secure` dan `HttpOnly`.
- [ ] Rate limit login dan API aktif.
- [ ] Payment webhook menggunakan signature verification.
- [ ] Upload file memakai storage terpisah dan validasi file aktif.
- [ ] Monitoring dan alert sudah mengarah ke tim operasional.
- [ ] `npm run lint`, `npm run build`, dan automated tests lulus.
- [ ] Privacy policy dan return policy tersedia.

## Urutan Implementasi yang Direkomendasikan

1. Tambahkan database dan migration.
2. Pindahkan admin credential ke tabel user dengan password hash.
3. Pindahkan session ke Redis/database dan tambahkan rate limiting.
4. Tambahkan validasi schema dan security headers.
5. Pisahkan endpoint public dan admin.
6. Integrasikan payment gateway dan webhook.
7. Migrasikan upload artwork ke object storage.
8. Lengkapi filter, pagination, audit log, dan inventory dashboard.
9. Tambahkan automated tests dan monitoring.
10. Jalankan security review sebelum membuka akses publik.
