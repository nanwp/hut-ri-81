# Kuota Maksimal per Tier Sponsor

Tanggal: 2026-07-19

## Tujuan

Tiap paket sponsor punya jumlah slot terbatas. Pengunjung melihat sisa slot di tiap
kartu paket, dan paket yang penuh tidak lagi bisa di-CTA. Selaras dengan copy
"Slot Terbatas" yang sudah ada di halaman sponsor.

## Data (`data/sponsors.json`)

Tiap objek di `tiers` mendapat field baru `maxSlots`:

| Tier     | maxSlots |
| -------- | -------- |
| Platinum | 2        |
| Gold     | 4        |
| Silver   | 6        |
| Bronze   | 10       |

Slot terisi **dihitung otomatis** dari array `sponsors` (dikelompokkan per `tier`).
Panitia cukup menambah entri sponsor seperti biasa — tidak ada penghitung manual.

## Model (`utils/model.ts`)

- `TierSponsor` mendapat `maxSlots: number`.
- Helper baru:

  ```ts
  export function sisaSlot(tier: TierSponsor, sponsors: Sponsor[]): number
  ```

  Mengembalikan `max(0, tier.maxSlots - jumlah sponsor bertier itu)`. Kalau data
  sponsor kelebihan (input manusia), hasilnya tetap 0 → tampil "Penuh", tidak minus.

## UI (`components/sponsor/SponsorTiers.vue`)

Di tiap kartu paket:

- Badge kecil di bawah harga: **"Sisa X slot"** saat masih tersedia, **"Penuh"**
  saat habis. Warna badge mengikuti aksen tier yang sudah ada.
- Saat penuh: tombol "Tanya paket ini →" diganti teks statis "Slot penuh"
  (bukan link), dan kartu diberi tampilan redup (opacity/desaturasi ringan)
  namun tetap terbaca.

## Di luar cakupan

- Landing strip, halaman donasi, dan `totalSponsor` tidak berubah.
- Tidak ada waiting list; paket penuh berarti CTA hilang.
