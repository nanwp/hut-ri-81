<script setup lang="ts">
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
</script>

<template>
  <section v-if="puncak" id="panggung" class="puncak" aria-labelledby="judul-headliner">
    <FestiveTexture :opacity="0.07" class="tex" />

    <div class="wrap puncak-in">
      <p class="live reveal">
        <span class="dot" aria-hidden="true"></span>
        Live on stage · {{ puncak.dateLabel }} · {{ malamSesi }}
      </p>

      <p v-if="sisaHari !== null" class="hitung-chip">
        ✦ {{ sisaHari }} hari menuju malam panggung
      </p>

      <div class="marquee reveal" style="--rd: 0.05s" aria-hidden="true">
        <span v-for="n in 9" :key="n" class="bohlam" :class="{ ganjil: n % 2 === 1 }"></span>
      </div>

      <p class="eyebrow-p reveal" style="--rd: 0.08s">Puncak Hiburan Warga mempersembahkan</p>

      <h2 id="judul-headliner" class="headliner reveal" style="--rd: 0.15s">
        {{ puncak.headliner ?? puncak.title }}
      </h2>

      <p class="genre reveal" style="--rd: 0.22s">
        ★ Panggung dangdut penutup rangkaian — hiburan rakyat untuk seluruh warga RW 01 ★
      </p>

      <ol class="lineup reveal" style="--rd: 0.3s">
        <li v-for="(mata, i) in puncak.lineup" :key="mata">
          <span class="li-no" aria-hidden="true">{{ String(i + 1).padStart(2, '0') }}</span>
          {{ mata }}
        </li>
      </ol>

      <div class="cta reveal" style="--rd: 0.38s">
        <NuxtLink to="/donasi" class="btn btn-emas">Dukung Panggung Ini</NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* "panggung malam" — gelap di kedua tema, headliner ala poster festival */
.puncak {
  position: relative;
  overflow: hidden;
  background: var(--malam);
  color: var(--malam-tinta);
  padding-block: clamp(4.5rem, 10vw, 7.5rem);
  text-align: center;
  border-block: var(--tepi);
  scroll-margin-top: 4rem;
}

.tex {
  color: #ffd23f;
}

.puncak-in {
  position: relative;
}

.live {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.5rem 1.05rem;
  border: 2px solid #ff6fae;
  border-radius: 999px;
  font: 800 0.7rem/1 var(--font-body);
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #ff6fae;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #ff6fae;
  animation: kedip 1.4s ease-in-out infinite;
}

@keyframes kedip {
  50% {
    opacity: 0.25;
  }
}

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

.eyebrow-p {
  margin-top: 1.1rem;
  font: 800 0.74rem/1 var(--font-body);
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: var(--malam-tinta-2);
}

.headliner {
  margin-top: 0.9rem;
  font-size: clamp(3rem, 12vw, 7.5rem);
  color: #ffd23f;
  text-shadow: 0.05em 0.05em 0 #f03d8a;
  line-height: 0.92;
  animation: pendar 3s ease-in-out infinite;
}

.genre {
  margin-top: 1.3rem;
  font: 600 0.95rem/1.5 var(--font-body);
  color: var(--malam-tinta-2);
  max-width: 34rem;
  margin-inline: auto;
}

.lineup {
  list-style: none;
  margin: 2.6rem auto 0;
  padding: 0;
  max-width: 32rem;
  border-top: 1px solid var(--malam-garis);
  text-align: left;
}

.lineup li {
  display: flex;
  align-items: baseline;
  gap: 1rem;
  padding: 0.95rem 0.3rem;
  border-bottom: 1px solid var(--malam-garis);
  font: 600 1.05rem/1.4 var(--font-body);
}

.li-no {
  font: 400 0.95rem/1 var(--font-display);
  color: #ffd23f;
  flex: none;
}

.cta {
  margin-top: 2.4rem;
}
</style>
