<script setup lang="ts">
import donations from '~/data/donations.json'
import sponsorsData from '~/data/sponsors.json'
import type { Donatur, Sponsor, TierSponsor } from '~/utils/model'

useHead({ title: 'Top Donasi — Semarak Kemerdekaan RW 01' })
useSeoMeta({
  description:
    'Leaderboard donatur dan transparansi dana rangkaian acara HUT RI ke-81 RW 01. Dikelola oleh Karang Taruna RW 01.'
})

const peringkat: Donatur[] = [...(donations.donors as Donatur[])].sort(
  (a, b) => b.amount - a.amount
)
const tigaBesar = peringkat.slice(0, 3)
const sisanya = peringkat.slice(3)

// dana acara = donasi warga + paket sponsor (kas satu pintu, rincian tetap jelas)
const totalWarga = totalDonasi(peringkat)
const totalSpn = totalSponsor(
  sponsorsData.sponsors as Sponsor[],
  sponsorsData.tiers as TierSponsor[]
)
const total = totalWarga + totalSpn

const halaman = ref<HTMLElement | null>(null)
useReveal(halaman)
</script>

<template>
  <main ref="halaman" class="donasi">
    <header class="wrap kepala">
      <p class="eyebrow lift l1">Transparansi Dana</p>
      <h1 class="lift l2">Top Donasi<span class="titik">.</span></h1>
      <p class="sub lift l3">
        Apresiasi untuk para donatur yang menyalakan kemeriahan HUT RI ke-81 di RW 01. Rekap
        diperbarui berkala oleh Bendahara Karang Taruna.
      </p>
    </header>

    <div class="wrap isi">
      <DonationProgress
        class="reveal"
        :total="total"
        :target="donations.target"
        :updated-at="donations.updatedAt"
        :rincian="{ warga: totalWarga, sponsor: totalSpn }"
      />

      <section class="blok" aria-labelledby="judul-podium">
        <header class="blok-kepala reveal">
          <p class="eyebrow">Tiga Besar</p>
          <h2 id="judul-podium">Podium Donatur</h2>
        </header>
        <DonationPodium class="reveal" style="--rd: 0.1s" :donors="tigaBesar" />
      </section>

      <section v-if="sisanya.length" class="blok" aria-labelledby="judul-daftar">
        <header class="blok-kepala reveal">
          <p class="eyebrow">Peringkat Lengkap</p>
          <h2 id="judul-daftar">Daftar Donatur</h2>
        </header>
        <DonationTable class="reveal" style="--rd: 0.1s" :donors="sisanya" :offset="4" />
      </section>

      <ExpenseRecap
        class="blok reveal"
        :expenses="donations.expenses"
        :total-masuk="total"
        :rincian="{ warga: totalWarga, sponsor: totalSpn }"
      />

      <HowToDonate class="blok reveal" :channels="donations.channels" />
    </div>
  </main>
</template>

<style scoped>
.donasi {
  padding-block: clamp(3.5rem, 9vw, 6rem) clamp(4.5rem, 10vw, 7rem);
}

.kepala {
  max-width: 46rem;
}

.kepala h1 {
  margin-top: 0.8rem;
  font-weight: 900;
  letter-spacing: -0.025em;
}

.titik {
  color: var(--merah-teks);
}

.sub {
  margin-top: 1.2rem;
  color: var(--tinta-2);
  max-width: 34rem;
}

.isi {
  margin-top: clamp(2.5rem, 6vw, 4rem);
  display: grid;
  gap: clamp(3.5rem, 8vw, 5.5rem);
}

.blok-kepala h2 {
  margin-top: 0.6rem;
}

.blok > :last-child:not(header) {
  margin-top: 1.8rem;
}

/* orkestrasi load kepala halaman */
.lift {
  opacity: 0;
  transform: translateY(22px);
  animation: naik 0.85s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  animation-delay: var(--d, 0s);
}

.l1 { --d: 0.05s; }
.l2 { --d: 0.15s; }
.l3 { --d: 0.25s; }

@keyframes naik {
  to {
    opacity: 1;
    transform: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .lift {
    animation: none;
    opacity: 1;
    transform: none;
  }
}
</style>
