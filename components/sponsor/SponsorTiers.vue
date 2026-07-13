<script setup lang="ts">
import sponsorsData from '~/data/sponsors.json'
import site from '~/data/site.json'
import type { TierSponsor } from '~/utils/model'

const tiers = sponsorsData.tiers as TierSponsor[]

function waTier(t: TierSponsor): string {
  const pesan = encodeURIComponent(
    `Halo ${site.event.penyelenggara}, saya berminat mengambil paket sponsor ${t.label} (${formatRupiah(t.amount)}) untuk ${site.event.name} HUT RI ke-${site.event.hutKe}.\nNama usaha: `
  )
  return `https://wa.me/${site.kontak.whatsappIntl}?text=${pesan}`
}
</script>

<template>
  <section id="paket" class="paket" aria-labelledby="judul-paket">
    <header class="kepala">
      <p class="eyebrow">Paket Sponsor</p>
      <h2 id="judul-paket">Empat Kelas Dukungan</h2>
      <p class="sub">
        Logo usaha Anda tampil di media publikasi dan panggung — berjenjang sesuai paket.
        Detailnya selalu bisa dibicarakan dengan panitia.
      </p>
    </header>

    <div class="kartu-grid">
      <article v-for="t in tiers" :key="t.id" class="kartu-tier" :class="t.id">
        <p class="t-label">{{ t.label }}</p>
        <p class="t-harga">{{ formatRupiah(t.amount) }}</p>
        <ul class="t-benefit">
          <li v-for="b in t.benefits" :key="b">{{ b }}</li>
        </ul>
        <a :href="waTier(t)" target="_blank" rel="noopener" class="t-cta">
          Tanya paket ini <span aria-hidden="true">→</span>
        </a>
      </article>
    </div>
  </section>
</template>

<style scoped>
.paket {
  margin-top: clamp(3rem, 7vw, 5rem);
  scroll-margin-top: 5rem;
}

.kepala {
  max-width: 36rem;
}

.kepala h2 {
  margin-top: 0.7rem;
}

.sub {
  margin-top: 1rem;
  color: var(--tinta-2);
}

.kartu-grid {
  display: grid;
  gap: 1rem;
  margin-top: 2.2rem;
}

@media (min-width: 640px) {
  .kartu-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (min-width: 1080px) {
  .kartu-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.kartu-tier {
  display: flex;
  flex-direction: column;
  background: var(--kartu);
  border: var(--tepi);
  border-top: 6px solid var(--emas);
  border-radius: var(--radius);
  box-shadow: var(--pop);
  padding: 1.6rem 1.5rem;
}

.kartu-tier.platinum {
  border-top-color: var(--ungu);
}

.kartu-tier.silver {
  border-top-color: var(--biru);
}

.kartu-tier.bronze {
  border-top-color: var(--oranye);
}

.t-label {
  font: 800 0.7rem/1 var(--font-body);
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: var(--emas-teks);
}

.platinum .t-label {
  color: var(--ungu);
}

.silver .t-label {
  color: var(--biru);
}

.bronze .t-label {
  color: var(--oranye);
}

.t-harga {
  margin-top: 0.7rem;
  font: 400 1.8rem/1.1 var(--font-display);
  font-variant-numeric: tabular-nums;
}

.t-benefit {
  list-style: none;
  margin: 1.2rem 0 0;
  padding: 0;
  flex: 1;
}

.t-benefit li {
  position: relative;
  padding: 0.55rem 0 0.55rem 1.4rem;
  font-size: 0.9rem;
  color: var(--tinta-2);
}

.t-benefit li + li {
  border-top: 1px solid var(--garis);
}

.t-benefit li::before {
  content: '★';
  position: absolute;
  left: 0;
  font-size: 0.7rem;
  color: var(--emas-teks);
}

.t-cta {
  display: inline-block;
  margin-top: 1.4rem;
  font: 800 0.82rem/1 var(--font-body);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--merah-teks);
  text-decoration: none;
  border-bottom: 3px solid var(--emas);
  padding-bottom: 0.25rem;
  align-self: flex-start;
  transition: color 0.2s, border-color 0.2s;
}

.t-cta:hover {
  color: var(--tinta);
  border-bottom-color: var(--merah);
}
</style>
