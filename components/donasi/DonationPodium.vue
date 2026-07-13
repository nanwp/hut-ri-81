<script setup lang="ts">
import type { Donatur } from '~/utils/model'

defineProps<{ donors: Donatur[] }>()
</script>

<template>
  <ol class="podium">
    <li v-for="(d, i) in donors" :key="`${d.name}-${i}`" :class="`p${i + 1}`">
      <span class="rank" aria-hidden="true">{{ i + 1 }}</span>
      <p class="nama">{{ d.name }}</p>
      <p v-if="d.rt" class="rt">{{ d.rt }}</p>
      <p class="jumlah">{{ formatRupiah(d.amount) }}</p>
    </li>
  </ol>
</template>

<style scoped>
.podium {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 1rem;
}

/* mobile: urutan 1-2-3 dari atas; desktop: susunan podium 2-1-3 */
@media (min-width: 760px) {
  .podium {
    grid-template-columns: 1fr 1.15fr 1fr;
    align-items: end;
    gap: 1.2rem;
  }

  .p1 { order: 2; }
  .p2 { order: 1; }
  .p3 { order: 3; }
}

.podium li {
  background: var(--kartu);
  border: var(--tepi);
  border-top: 6px solid var(--biru);
  border-radius: var(--radius);
  box-shadow: var(--pop);
  padding: 1.7rem 1.4rem;
  text-align: center;
}

.p1 {
  border-top-color: var(--merah);
  padding-block: 2.5rem;
}

.p3 {
  border-top-color: var(--hijau);
}

.rank {
  display: inline-block;
  font: 400 2.2rem/1 var(--font-display);
  color: #1e1611;
  background: var(--emas);
  border: 2px solid #1e1611;
  border-radius: 12px;
  padding: 0.4rem 0.85rem 0.3rem;
  transform: rotate(-4deg);
}

.p1 .rank {
  font-size: 3rem;
  background: var(--merah);
  color: #fff6e7;
}

.nama {
  margin-top: 0.9rem;
  font: 400 1.15rem/1.25 var(--font-display);
  text-transform: uppercase;
  letter-spacing: 0.02em;
}

.p1 .nama {
  font-size: 1.35rem;
}

.rt {
  margin-top: 0.15rem;
  font-size: 0.8rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--tinta-2);
}

.jumlah {
  margin-top: 0.6rem;
  font-weight: 800;
  color: var(--merah-teks);
  font-variant-numeric: tabular-nums;
}
</style>
