<script setup lang="ts">
import sponsorsData from '~/data/sponsors.json'
import type { Sponsor, TierSponsor } from '~/utils/model'

// ajak=false saat dipakai di halaman /sponsor (paketnya sudah di halaman itu)
withDefaults(defineProps<{ ajak?: boolean }>(), { ajak: true })

const tiers = sponsorsData.tiers as TierSponsor[]
const sponsors = sponsorsData.sponsors as Sponsor[]

// tampilkan tier yang punya sponsor; Platinum selalu tampil (slot kosong = alat jualan)
const grup = tiers
  .map((t) => ({ tier: t, daftar: sponsors.filter((s) => s.tier === t.id) }))
  .filter((g) => g.daftar.length > 0 || g.tier.id === 'platinum')
</script>

<template>
  <section class="sponsor" aria-labelledby="judul-sponsor">
    <div class="wrap">
      <header class="kepala reveal">
        <p class="eyebrow">Didukung Oleh</p>
        <h2 id="judul-sponsor">Sponsor Acara</h2>
      </header>

      <div class="grup-daftar reveal" style="--rd: 0.1s">
        <div v-for="g in grup" :key="g.tier.id" class="grup">
          <p class="tier-label" :class="g.tier.id">{{ g.tier.label }}</p>
          <div class="badges">
            <template v-if="g.daftar.length">
              <component
                :is="s.url ? 'a' : 'div'"
                v-for="s in g.daftar"
                :key="s.name"
                class="badge-sponsor"
                v-bind="s.url ? { href: s.url, target: '_blank', rel: 'noopener' } : {}"
              >
                <img v-if="s.logo" :src="s.logo" :alt="s.name" />
                <span v-else>{{ s.name }}</span>
              </component>
            </template>
            <NuxtLink v-else to="/sponsor" class="badge-sponsor slot-kosong">
              Slot {{ g.tier.label }} masih tersedia — jadilah sponsor utama
            </NuxtLink>
          </div>
        </div>
      </div>

      <p v-if="ajak" class="ajak-kecil reveal" style="--rd: 0.16s">
        Ingin logo usaha Anda tampil di panggung, spanduk, dan halaman ini?
        <NuxtLink to="/sponsor">Lihat paket sponsor →</NuxtLink>
      </p>
    </div>
  </section>
</template>

<style scoped>
.sponsor {
  padding-block: clamp(4rem, 9vw, 6.5rem);
  border-top: 1px solid var(--garis);
}

.kepala h2 {
  margin-top: 0.7rem;
}

.grup-daftar {
  display: grid;
  gap: 1.8rem;
  margin-top: 2.2rem;
}

.tier-label {
  font: 700 0.66rem/1 var(--font-body);
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--tinta-2);
}

.tier-label.platinum {
  color: var(--ungu);
}

.tier-label.gold {
  color: var(--emas-teks);
}

.badges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-top: 0.8rem;
}

.badge-sponsor {
  display: inline-flex;
  align-items: center;
  min-height: 3.4rem;
  padding: 0.8rem 1.5rem;
  background: var(--kartu);
  border: var(--tepi);
  border-radius: var(--radius);
  box-shadow: var(--pop-kecil);
  text-decoration: none;
  font: 400 1.05rem/1.2 var(--font-display);
  text-transform: uppercase;
  letter-spacing: 0.03em;
  color: var(--tinta);
  transition: transform 0.15s, box-shadow 0.15s, color 0.2s;
}

a.badge-sponsor:hover {
  transform: translate(-1px, -1px);
  box-shadow: 4px 4px 0 var(--tinta);
  color: var(--merah-teks);
}

/* logo dibuat sewarna tinta agar tak merusak palet; warna asli muncul saat hover */
.badge-sponsor img {
  max-height: 2.2rem;
  width: auto;
  filter: grayscale(1) contrast(0.85);
  opacity: 0.85;
  transition: filter 0.25s, opacity 0.25s;
}

.badge-sponsor:hover img {
  filter: none;
  opacity: 1;
}

.slot-kosong {
  border-style: dashed;
  box-shadow: none;
  font: italic 600 0.9rem/1.4 var(--font-body);
  text-transform: none;
  letter-spacing: 0;
  color: var(--tinta-2);
}

.slot-kosong:hover {
  color: var(--ungu);
  box-shadow: none;
  transform: none;
}

.ajak-kecil {
  margin-top: 2rem;
  font-size: 0.92rem;
  color: var(--tinta-2);
}

.ajak-kecil a {
  color: var(--merah-teks);
  font-weight: 600;
  text-decoration: none;
  border-bottom: 1px solid var(--emas);
  padding-bottom: 0.15rem;
}

.ajak-kecil a:hover {
  color: var(--emas-teks);
}
</style>
