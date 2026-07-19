<script setup lang="ts">
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
</script>

<template>
  <section class="hero">
    <FestiveTexture :opacity="0.055" />

    <!-- konfeti besar dekoratif -->
    <span class="deko d-lingkar" aria-hidden="true"></span>
    <span class="deko d-segitiga" aria-hidden="true"></span>

    <div class="wrap hero-in">
      <div class="pils lift l1">
        <span class="pil pil-merah">{{ site.event.rangeLabel }}</span>
        <span class="pil pil-biru">Karang Taruna · RW 01</span>
        <a v-if="puncak?.headliner" href="#panggung" class="pil pil-emas">
          ★ {{ puncak.headliner }} Live · {{ tanggalPendek }}
        </a>
      </div>

      <h1 class="judul">
        <span class="b1 lift l2">Semarak</span>
        <span class="b2 lift l3">Kemerdekaan</span>
      </h1>

      <p class="hero-sub lift l4">
        Festival rakyat HUT ke-{{ site.event.hutKe }} RI di lingkungan <strong>RW 01</strong> —
        padat, kolaboratif, dan merangkul seluruh usia. Lima mata acara, ditutup panggung dangdut
        <strong>Mardatila Group</strong>.
      </p>

      <div class="hero-cta lift l5">
        <a href="#acara" class="btn btn-primer">Lihat Rangkaian Acara</a>
        <NuxtLink to="/donasi" class="btn btn-garis">Dukung Acara</NuxtLink>
      </div>

      <HeroCountdown class="lift l6" />
    </div>

    <!-- stiker starburst: tiga persegi bertumpuk = bintang 12 sudut -->
    <div class="stiker lift l3" aria-hidden="true">
      <svg viewBox="0 0 200 200">
        <g class="putar">
          <rect x="35" y="35" width="130" height="130" class="bs" />
          <rect x="35" y="35" width="130" height="130" class="bs" transform="rotate(30 100 100)" />
          <rect x="35" y="35" width="130" height="130" class="bs" transform="rotate(60 100 100)" />
        </g>
        <text x="100" y="92" text-anchor="middle" class="s1">HUT RI</text>
        <text x="100" y="138" text-anchor="middle" class="s2">KE-{{ site.event.hutKe }}</text>
      </svg>
    </div>

    <TickerTape :items="tickerItems" warna="merah" />
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  overflow: hidden;
  background: var(--kertas);
}

.hero-in {
  position: relative;
  z-index: 2;
  padding-block: clamp(3.5rem, 9vh, 6.5rem) clamp(3.5rem, 8vh, 5.5rem);
}

.pils {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}

.pil {
  display: inline-block;
  padding: 0.45rem 0.95rem;
  border: var(--tepi);
  border-radius: 999px;
  font: 800 0.72rem/1 var(--font-body);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  box-shadow: var(--pop-kecil);
}

.pil-merah {
  background: var(--merah);
  color: #fff6e7;
}

.pil-biru {
  background: var(--biru);
  color: #fff6e7;
}

/* teks tetap gelap di kedua tema — pola sama dengan teks stiker starburst */
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

.judul {
  display: flex;
  flex-direction: column;
  margin-top: 1.6rem;
  font-size: clamp(3.4rem, 12.5vw, 8rem);
  max-width: 12ch;
}

.b2 {
  color: var(--merah);
  text-shadow: 0.06em 0.06em 0 var(--emas);
}

.hero-sub {
  margin-top: 1.6rem;
  max-width: 33rem;
  font-size: 1.06rem;
  font-weight: 500;
  color: var(--tinta-2);
}

.hero-sub strong {
  color: var(--tinta);
  font-weight: 800;
}

.hero-cta {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 2.2rem;
}

/* stiker starburst kanan-atas */
.stiker {
  position: absolute;
  z-index: 1;
  top: clamp(0.8rem, 4vw, 4.5rem);
  right: clamp(0.6rem, 4vw, 4rem);
  width: clamp(104px, 20vw, 220px);
  transform: rotate(-10deg);
}

/* layar sempit: stiker mengecil ke pojok, baris pills diberi ruang aman
   agar tidak tertimpa; judul mulai di bawah area stiker */
@media (max-width: 720px) {
  .stiker {
    top: 0.8rem;
    right: 0.8rem;
    width: 92px;
  }

  .pils {
    padding-right: 6.2rem;
  }

  .judul {
    margin-top: 2rem;
  }
}

.bs {
  fill: var(--emas);
  stroke: var(--tinta);
  stroke-width: 3;
}

.putar {
  transform-origin: 100px 100px;
  animation: pusing 40s linear infinite;
}

@keyframes pusing {
  to {
    transform: rotate(360deg);
  }
}

.s1,
.s2 {
  font-family: var(--font-display);
  fill: var(--tinta);
  font-size: 30px;
  letter-spacing: 1px;
}

.s2 {
  font-size: 40px;
  fill: var(--merah);
}

[data-theme='dark'] .s1 {
  fill: #1e1611;
}

[data-theme='dark'] .s2 {
  fill: #c22a21;
}

/* konfeti besar */
.deko {
  position: absolute;
  pointer-events: none;
}

.d-lingkar {
  width: 90px;
  height: 90px;
  border: 3px solid var(--hijau);
  border-radius: 50%;
  left: -30px;
  bottom: 18%;
}

.d-segitiga {
  right: 14%;
  bottom: 10%;
  width: 0;
  height: 0;
  border-left: 26px solid transparent;
  border-right: 26px solid transparent;
  border-bottom: 44px solid var(--pink);
  transform: rotate(14deg);
  opacity: 0.85;
}

@media (max-width: 720px) {
  .d-segitiga {
    display: none;
  }
}

/* orkestrasi load: reveal bertingkat */
.lift {
  opacity: 0;
  transform: translateY(22px);
  animation: naik 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  animation-delay: var(--d, 0s);
}

.stiker.lift {
  animation-name: naik-stiker;
}

.l1 { --d: 0.05s; }
.l2 { --d: 0.13s; }
.l3 { --d: 0.22s; }
.l4 { --d: 0.32s; }
.l5 { --d: 0.42s; }
.l6 { --d: 0.52s; }

@keyframes naik {
  to {
    opacity: 1;
    transform: none;
  }
}

@keyframes naik-stiker {
  to {
    opacity: 1;
    transform: rotate(-10deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .lift {
    animation: none;
    opacity: 1;
    transform: none;
  }

  .stiker.lift {
    transform: rotate(-10deg);
  }

  .pil-emas {
    animation: none;
  }
}
</style>
