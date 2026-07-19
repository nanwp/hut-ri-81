# Penekanan Mardatila Group

Tanggal: 2026-07-19

## Tujuan

Bintang tamu "Mardatila Group" (acara highlight "Puncak Hiburan Warga", 6 September 2026)
lebih menonjol di landing page: terlihat sejak hero, section panggungnya lebih meriah,
dan kartunya di timeline berbeda dari kartu lain. Perubahan visual saja — tidak ada
perubahan struktur data; field `highlight` dan `headliner` di `data/events.json` sudah ada.

## 1. Hero — pil emas klik-ke-panggung (`components/landing/HeroSection.vue`)

- Pil ketiga di baris `.pils`: teks `★ Mardatila Group Live · 6 Sep`.
- Berupa `<a href="#panggung">` — mengklik scroll ke section panggung.
- Gaya menonjol dibanding pil merah/biru: latar emas (`--emas`), teks tinta,
  animasi kedip halus (pulse ringan), dimatikan saat `prefers-reduced-motion`.
- Teks pil diambil dari data acara highlight (`headliner` + tanggal), bukan hardcode.

## 2. Section panggung lebih meriah (`components/landing/PuncakHighlight.vue`)

- Section mendapat `id="panggung"` + `scroll-margin-top` agar anchor dari hero mendarat rapi.
- **Deret lampu marquee**: satu baris bohlam (elemen CSS berulang, ± 9 titik) di atas
  eyebrow "mempersembahkan", berkedip bergantian (nyala ganjil/genap) ala panggung
  pasar malam. Warna bohlam kuning `#ffd23f`.
- **Nama berpendar**: animasi pulse halus pada `text-shadow` judul `.headliner`
  (glow pink `#f03d8a` membesar-mengecil, siklus ± 3 detik).
- **Chip hitung mundur**: di bawah baris "Live on stage", chip "XX hari menuju malam
  panggung". Hari dihitung dari `dateStart` acara highlight; nilai waktu-sekarang diambil
  di `onMounted` (pola sama dengan `HeroCountdown`) agar tidak hydration mismatch;
  sebelum mounted chip tidak dirender. Jika hari-H sudah lewat, chip disembunyikan.
- Semua animasi baru dimatikan saat `prefers-reduced-motion: reduce`.

## 3. Kartu timeline (`components/landing/EventCard.vue`)

- Kartu dengan `event.highlight === true`:
  - Aksen `--aksen` di-override menjadi `var(--emas)` (menimpa rotasi warna).
  - Border kartu lebih tegas: `border-top` tebal emas (pola serupa kartu tier sponsor).
  - Pita di bawah judul: `Bintang Tamu: {{ event.headliner }}` — hanya dirender jika
    `headliner` tidak null; data-driven, tanpa hardcode nama.
- Badge "Puncak ★" yang sudah ada tetap.

## Di luar cakupan

- Tidak ada halaman baru.
- `data/events.json`, ticker hero, dan kalimat sub hero tidak berubah.
- Halaman donasi/sponsor/galeri tidak tersentuh.
