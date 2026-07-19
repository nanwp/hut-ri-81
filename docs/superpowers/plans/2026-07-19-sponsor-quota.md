# Kuota Maksimal per Tier Sponsor — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Tiap paket sponsor punya kuota slot; kartu paket menampilkan sisa slot dan menjadi "Penuh" (CTA nonaktif, kartu redup) saat kuota habis.

**Architecture:** Kuota disimpan sebagai field `maxSlots` per tier di `data/sponsors.json`. Slot terisi dihitung otomatis dari array `sponsors` lewat helper murni `sisaSlot()` di `utils/model.ts` (auto-imported oleh Nuxt). Satu-satunya komponen yang berubah adalah `components/sponsor/SponsorTiers.vue`.

**Tech Stack:** Nuxt 3 static site, Vue SFC, TypeScript, data JSON statis. Tanpa test framework — verifikasi via `npm run generate` dan cek visual di `npm run dev`.

## Global Constraints

- Kuota: Platinum 2, Gold 4, Silver 6, Bronze 10 (dari spec — nilai persis).
- Copy UI: "Sisa X slot", "Penuh" (badge), "Slot penuh" (pengganti CTA) — bahasa Indonesia, konsisten dengan copy situs.
- Tidak ada penghitung manual di JSON; slot terisi selalu dihitung dari array `sponsors`.
- `sisaSlot` tidak boleh mengembalikan angka negatif (data kelebihan → 0).
- Landing strip, halaman donasi, dan `totalSponsor` tidak boleh berubah.

---

### Task 1: Data + model (`maxSlots` dan `sisaSlot`)

**Files:**
- Modify: `data/sponsors.json` (blok `tiers`)
- Modify: `utils/model.ts:42-59`

**Interfaces:**
- Consumes: interface `TierSponsor` dan `Sponsor` yang sudah ada di `utils/model.ts`.
- Produces: `TierSponsor.maxSlots: number`; `sisaSlot(tier: TierSponsor, sponsors: Sponsor[]): number` — dipakai Task 2 (auto-imported oleh Nuxt karena berada di `utils/`).

- [ ] **Step 1: Tambah `maxSlots` ke tiap tier di `data/sponsors.json`**

Tambahkan satu baris per tier, tepat setelah `"amount"`:

```json
    { "id": "platinum", "amount": 10000000, "maxSlots": 2, ... }
    { "id": "gold",     "amount": 7000000,  "maxSlots": 4, ... }
    { "id": "silver",   "amount": 3000000,  "maxSlots": 6, ... }
    { "id": "bronze",   "amount": 500000,   "maxSlots": 10, ... }
```

(Field lain — `label`, `benefits` — tidak berubah. Hanya sisipkan `"maxSlots": N,` setelah baris `"amount"` masing-masing tier.)

- [ ] **Step 2: Tambah field + helper di `utils/model.ts`**

Ubah interface `TierSponsor` menjadi:

```ts
export interface TierSponsor {
  id: string
  label: string
  amount: number
  maxSlots: number
  benefits: string[]
}
```

Tambahkan helper tepat setelah `totalSponsor`:

```ts
export function sisaSlot(tier: TierSponsor, sponsors: Sponsor[]): number {
  const terisi = sponsors.filter((s) => s.tier === tier.id).length
  return Math.max(0, tier.maxSlots - terisi)
}
```

- [ ] **Step 3: Verifikasi build**

Run: `npm run generate`
Expected: build sukses tanpa error TypeScript/JSON.

- [ ] **Step 4: Commit**

```bash
git add data/sponsors.json utils/model.ts
git commit -m "feat: kuota maxSlots per tier sponsor + helper sisaSlot"
```

---

### Task 2: UI kartu paket (`SponsorTiers.vue`)

**Files:**
- Modify: `components/sponsor/SponsorTiers.vue`

**Interfaces:**
- Consumes: `sisaSlot(tier, sponsors)` dan `TierSponsor`/`Sponsor` dari Task 1; `formatRupiah` (auto-import yang sudah ada).
- Produces: tidak ada — komponen daun.

- [ ] **Step 1: Script — muat array sponsors**

Di blok `<script setup>`, ubah bagian import/data menjadi:

```ts
import sponsorsData from '~/data/sponsors.json'
import site from '~/data/site.json'
import type { Sponsor, TierSponsor } from '~/utils/model'

const tiers = sponsorsData.tiers as TierSponsor[]
const sponsors = sponsorsData.sponsors as Sponsor[]
```

(Fungsi `waTier` tidak berubah.)

- [ ] **Step 2: Template — badge sisa slot + CTA kondisional**

Ganti isi `<article>` menjadi:

```html
<article
  v-for="t in tiers"
  :key="t.id"
  class="kartu-tier"
  :class="[t.id, { penuh: sisaSlot(t, sponsors) === 0 }]"
>
  <p class="t-label">{{ t.label }}</p>
  <p class="t-harga">{{ formatRupiah(t.amount) }}</p>
  <p class="t-slot" :class="{ habis: sisaSlot(t, sponsors) === 0 }">
    {{ sisaSlot(t, sponsors) === 0 ? 'Penuh' : `Sisa ${sisaSlot(t, sponsors)} slot` }}
  </p>
  <ul class="t-benefit">
    <li v-for="b in t.benefits" :key="b">{{ b }}</li>
  </ul>
  <a v-if="sisaSlot(t, sponsors) > 0" :href="waTier(t)" target="_blank" rel="noopener" class="t-cta">
    Tanya paket ini <span aria-hidden="true">→</span>
  </a>
  <p v-else class="t-cta t-mati">Slot penuh</p>
</article>
```

- [ ] **Step 3: Style — badge, kartu redup, CTA mati**

Tambahkan di `<style scoped>` (setelah blok `.t-harga`):

```css
.t-slot {
  align-self: flex-start;
  margin-top: 0.7rem;
  font: 800 0.68rem/1 var(--font-body);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--emas-teks);
  border: 1.5px solid currentColor;
  border-radius: 999px;
  padding: 0.32rem 0.7rem;
}

.platinum .t-slot { color: var(--ungu); }
.silver .t-slot { color: var(--biru); }
.bronze .t-slot { color: var(--oranye); }
.t-slot.habis { color: var(--tinta-2); }

.kartu-tier.penuh {
  opacity: 0.62;
  filter: saturate(0.35);
}

.t-mati {
  color: var(--tinta-2);
  border-bottom-color: var(--garis);
  margin-top: 1.4rem;
}
```

Catatan: `.t-mati` dipasang bersama kelas `.t-cta` yang sudah ada sehingga mewarisi tipografi/underline-nya; hanya warna dan garis yang diredam.

- [ ] **Step 4: Verifikasi build + visual**

Run: `npm run generate` → Expected: sukses.
Lalu `npm run dev`, buka `/sponsor`:
- Semua kartu menampilkan badge "Sisa X slot" (Bronze: "Sisa 9 slot" karena sudah ada 1 sponsor bronze).
- Uji keadaan penuh: sementara ubah `maxSlots` bronze ke `1` di JSON → kartu Bronze redup, badge "Penuh", CTA berganti teks "Slot penuh" tanpa link. Kembalikan ke `10` setelah cek.

- [ ] **Step 5: Commit**

```bash
git add components/sponsor/SponsorTiers.vue
git commit -m "feat: tampilkan sisa slot & keadaan penuh di kartu paket sponsor"
```
