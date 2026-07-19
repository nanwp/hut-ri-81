# Penekanan Mardatila Group — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Bintang tamu Mardatila Group menonjol di landing: pil emas klik-ke-panggung di hero, section panggung dengan lampu marquee + nama berpendar + chip hitung mundur, dan kartu timeline beraksen emas dengan pita "Bintang Tamu".

**Architecture:** Perubahan visual murni di tiga komponen landing. Semua teks data-driven dari acara `highlight: true` di `data/events.json` (field `headliner`, `dateLabel`, `dateStart` sudah ada — data tidak berubah). Anchor `#panggung` dibuat di Task 1 dan dipakai Task 2.

**Tech Stack:** Nuxt 3 static site, Vue SFC, CSS scoped. Tanpa test framework — verifikasi via `npm run generate` + grep HTML output + cek visual `npm run dev`.

## Global Constraints

- Copy persis: pil hero `★ {headliner} Live · {tanggal pendek}`; chip `{N} hari menuju malam panggung`; pita `Bintang Tamu: {headliner}`.
- Tidak ada hardcode "Mardatila Group" di komponen — selalu dari `event.headliner`.
- Semua animasi baru dimatikan saat `prefers-reduced-motion: reduce`.
- Nilai waktu-sekarang untuk hitung mundur hanya diambil di `onMounted` (hindari hydration mismatch).
- `data/events.json`, ticker hero, dan kalimat sub hero tidak berubah.

---

### Task 1: Section panggung (`PuncakHighlight.vue`) — anchor, marquee, pendar, hitung mundur

**Files:**
- Modify: `components/landing/PuncakHighlight.vue`

**Interfaces:**
- Consumes: `Acara` dari `utils/model.ts`; data `eventsData` (sudah diimpor komponen ini).
- Produces: anchor `id="panggung"` pada `<section>` — dipakai Task 2 sebagai `href="#panggung"`.

- [ ] **Step 1: Script — tambah hitung mundur hari**

Ganti blok `<script setup>` menjadi:

```ts
import eventsData from '~/data/events.json'
import type { Acara } from '~/utils/model'

const puncak = (eventsData as Acara[]).find((e) => e.highlight)
const malamSesi = puncak?.sessions?.at(-1)?.waktu ?? 'Malam'

// dihitung setelah mounted agar render server & client sama (pola HeroCountdown)
const sisaHari = ref<number | null>(null)

onMounted(() => {
  if (!puncak) return
  const selisih = new Date(puncak.dateStart).getTime() - Date.now()
  if (selisih > 0) sisaHari.value = Math.ceil(selisih / 86400000)
})
```

- [ ] **Step 2: Template — id, chip, deret bohlam**

Ubah tag pembuka section:

```html
<section v-if="puncak" id="panggung" class="puncak" aria-labelledby="judul-headliner">
```

Lalu sisipkan antara `<p class="live ...">...</p>` dan `<p class="eyebrow-p ...">`:

```html
<p v-if="sisaHari !== null" class="hitung-chip">
  ✦ {{ sisaHari }} hari menuju malam panggung
</p>

<div class="marquee reveal" style="--rd: 0.05s" aria-hidden="true">
  <span v-for="n in 9" :key="n" class="bohlam" :class="{ ganjil: n % 2 === 1 }"></span>
</div>
```

- [ ] **Step 3: Style — scroll anchor, chip, bohlam, pendar, reduced-motion**

Di `.puncak` tambahkan `scroll-margin-top: 4rem;`.
Di `.eyebrow-p` ubah `margin-top: 2rem;` → `margin-top: 1.1rem;` (marquee sudah memberi jarak).
Di `.headliner` tambahkan `animation: pendar 3s ease-in-out infinite;`.
Tambahkan blok baru setelah `.dot`/`@keyframes kedip`:

```css
.hitung-chip {
  width: fit-content;
  margin: 1.1rem auto 0;
  padding: 0.5rem 1.05rem;
  border: 2px solid #ffd23f;
  border-radius: 999px;
  font: 800 0.7rem/1 var(--font-body);
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #ffd23f;
}

.marquee {
  display: flex;
  justify-content: center;
  gap: 0.9rem;
  margin-top: 2.2rem;
}

.bohlam {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #ffd23f;
  box-shadow: 0 0 10px 2px rgba(255, 210, 63, 0.75);
  animation: nyala 1.2s steps(1) infinite;
}

.bohlam.ganjil {
  animation-delay: 0.6s;
}

@keyframes nyala {
  50% {
    background: #7a6320;
    box-shadow: none;
  }
}

@keyframes pendar {
  0%,
  100% {
    text-shadow: 0.05em 0.05em 0 #f03d8a;
  }
  50% {
    text-shadow: 0.05em 0.05em 0 #f03d8a, 0 0 32px rgba(240, 61, 138, 0.55);
  }
}

@media (prefers-reduced-motion: reduce) {
  .bohlam,
  .headliner {
    animation: none;
  }
}
```

- [ ] **Step 4: Verifikasi build**

Run: `npm run generate`
Expected: sukses; lalu `grep -c 'id="panggung"' .output/public/index.html` → `1`.

- [ ] **Step 5: Commit**

```bash
git add components/landing/PuncakHighlight.vue
git commit -m "feat: section panggung lebih meriah (marquee, pendar, hitung mundur)"
```

---

### Task 2: Pil emas di hero (`HeroSection.vue`)

**Files:**
- Modify: `components/landing/HeroSection.vue`

**Interfaces:**
- Consumes: anchor `#panggung` dari Task 1; `Acara` dari `utils/model.ts`.
- Produces: tidak ada.

- [ ] **Step 1: Script — data acara highlight + tanggal pendek**

Ganti blok `<script setup>` menjadi:

```ts
import eventsData from '~/data/events.json'
import site from '~/data/site.json'
import type { Acara } from '~/utils/model'

const puncak = (eventsData as Acara[]).find((e) => e.highlight)

// "6 September 2026" → "6 Sep"
const tanggalPendek = computed(() => {
  const [tgl, bulan] = (puncak?.dateLabel ?? '').split(' ')
  return `${tgl} ${(bulan ?? '').slice(0, 3)}`
})

const tickerItems = [
  `Dirgahayu Republik Indonesia ke-${site.event.hutKe}`,
  site.event.rangeLabel,
  site.event.fullName,
  'Mardatila Group live · 6 September'
]
```

- [ ] **Step 2: Template — pil ketiga**

Di dalam `<div class="pils lift l1">`, setelah pil biru, tambahkan:

```html
<a v-if="puncak?.headliner" href="#panggung" class="pil pil-emas">
  ★ {{ puncak.headliner }} Live · {{ tanggalPendek }}
</a>
```

- [ ] **Step 3: Style — pil emas berkedip**

Tambahkan setelah `.pil-biru`:

```css
.pil-emas {
  background: var(--emas);
  color: #1e1611;
  text-decoration: none;
  animation: pil-kedip 2.2s ease-in-out infinite;
}

@keyframes pil-kedip {
  50% {
    box-shadow: var(--pop-kecil), 0 0 14px 2px rgba(255, 210, 63, 0.8);
  }
}
```

(Warna teks `#1e1611` tetap gelap di kedua tema — pola sama dengan teks stiker starburst.)
Di blok `@media (prefers-reduced-motion: reduce)` yang sudah ada, tambahkan:

```css
.pil-emas {
  animation: none;
}
```

- [ ] **Step 4: Verifikasi build**

Run: `npm run generate`
Expected: sukses; `grep -c 'href="#panggung"' .output/public/index.html` → `1`; HTML memuat `★ Mardatila Group Live · 6 Sep`.

- [ ] **Step 5: Commit**

```bash
git add components/landing/HeroSection.vue
git commit -m "feat: pil emas bintang tamu di hero, klik scroll ke panggung"
```

---

### Task 3: Kartu timeline beraksen emas (`EventCard.vue`)

**Files:**
- Modify: `components/landing/EventCard.vue`

**Interfaces:**
- Consumes: `event.highlight: boolean`, `event.headliner: string | null` dari `Acara`.
- Produces: tidak ada.

- [ ] **Step 1: Script — aksen emas untuk kartu highlight**

Ganti computed `aksen` menjadi:

```ts
const aksen = computed(() =>
  props.event.highlight ? 'var(--emas)' : AKSEN[(props.event.order - 1) % AKSEN.length]
)
```

- [ ] **Step 2: Template — kelas kartu + pita bintang tamu**

Tag pembuka article menjadi:

```html
<article class="kartu" :class="{ puncak: event.highlight }" :style="{ '--aksen': aksen }">
```

Setelah `</h3>`, tambahkan:

```html
<p v-if="event.highlight && event.headliner" class="bintang">
  Bintang Tamu: <strong>{{ event.headliner }}</strong>
</p>
```

- [ ] **Step 3: Style — border emas, kontras nomor, pita**

Tambahkan setelah blok `.kartu:hover`:

```css
.kartu.puncak {
  border-top: 6px solid var(--emas);
}

.kartu.puncak .no {
  color: #1e1611;
}
```

Tambahkan setelah blok `.badge`:

```css
.bintang {
  width: fit-content;
  margin-top: 0.7rem;
  background: color-mix(in srgb, var(--emas) 22%, transparent);
  border: 2px solid var(--emas);
  border-radius: 999px;
  padding: 0.34rem 0.8rem;
  font: 700 0.72rem/1 var(--font-body);
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.bintang strong {
  font-weight: 900;
}
```

- [ ] **Step 4: Verifikasi build + visual**

Run: `npm run generate`
Expected: sukses; `grep -c "Bintang Tamu:" .output/public/index.html` → `1` (hanya kartu Puncak).
Lalu `npm run dev`, buka `/`: pil emas di hero terlihat & mengklik-nya scroll ke section panggung; bohlam berkedip bergantian; chip "XX hari menuju malam panggung" muncul; kartu #05 timeline beraksen emas dengan pita bintang tamu.

- [ ] **Step 5: Commit**

```bash
git add components/landing/EventCard.vue
git commit -m "feat: kartu acara puncak beraksen emas + pita bintang tamu"
```
