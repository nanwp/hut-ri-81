<script setup lang="ts">
import donations from '~/data/donations.json'
import sponsorsData from '~/data/sponsors.json'
import type { Donatur, Sponsor, TierSponsor } from '~/utils/model'

// total dana mencakup donasi kolektif, bukan cuma yang masuk leaderboard
const total =
  totalDonasi(donations.donors as Donatur[]) +
  totalSponsor(sponsorsData.sponsors as Sponsor[], sponsorsData.tiers as TierSponsor[])
const persen = Math.min(100, Math.round((total / donations.target) * 100))
</script>

<template>
  <section class="dcta">
    <FestiveTexture :opacity="0.06" />

    <div class="wrap dcta-in reveal">
      <p class="eyebrow">Gotong Royong</p>
      <h2>Dukung Kemeriahan Acara</h2>
      <p class="ajak">
        Seluruh rangkaian dibiayai swadaya warga — dari hadiah lomba tiap RT sampai panggung
        dangdut Mardatila Group. Sekecil apa pun, dukungan Anda ikut menyalakan kemeriahan RW 01.
      </p>

      <div class="bar" aria-hidden="true">
        <i :style="{ width: persen + '%' }"></i>
      </div>
      <p class="angka">
        <strong>{{ formatRupiah(total) }}</strong> terkumpul dari target
        {{ formatRupiah(donations.target) }}
      </p>

      <NuxtLink to="/donasi" class="btn btn-primer">Lihat Top Donasi &amp; Cara Berdonasi</NuxtLink>
    </div>
  </section>
</template>

<style scoped>
.dcta {
  position: relative;
  overflow: hidden;
  background: var(--kertas-2);
  border-top: var(--tepi);
  padding-block: clamp(4.5rem, 10vw, 7rem);
  text-align: center;
}

.dcta-in {
  position: relative;
  max-width: 40rem;
}

.dcta-in h2 {
  margin-top: 0.7rem;
}

.ajak {
  margin-top: 1.1rem;
  color: var(--tinta-2);
}

.bar {
  height: 16px;
  margin-top: 2.2rem;
  border-radius: 999px;
  border: var(--tepi);
  background: var(--kartu);
  overflow: hidden;
}

.bar i {
  display: block;
  height: 100%;
  background: linear-gradient(90deg, var(--merah), var(--oranye));
  border-radius: inherit;
}

.angka {
  margin-top: 0.8rem;
  font-size: 0.92rem;
  font-weight: 600;
  color: var(--tinta-2);
}

.angka strong {
  color: var(--merah-teks);
  font-weight: 800;
  font-variant-numeric: tabular-nums;
}

.dcta-in .btn {
  margin-top: 2rem;
}
</style>
