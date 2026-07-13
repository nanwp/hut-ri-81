<script setup lang="ts">
import type { Donatur } from '~/utils/model'

defineProps<{
  donors: Donatur[]
  /** peringkat pertama pada daftar ini (setelah podium = 4) */
  offset: number
}>()
</script>

<template>
  <ol class="tabel" :start="offset">
    <li v-for="(d, i) in donors" :key="`${d.name}-${i}`">
      <span class="rank" aria-hidden="true">{{ offset + i }}</span>
      <span class="nama">
        {{ d.name }}<em v-if="d.rt"> · {{ d.rt }}</em>
      </span>
      <span class="jumlah">{{ formatRupiah(d.amount) }}</span>
    </li>
  </ol>
</template>

<style scoped>
.tabel {
  list-style: none;
  margin: 0;
  padding: 0;
  border-bottom: 1px solid var(--garis);
}

.tabel li {
  display: flex;
  align-items: baseline;
  gap: 1rem;
  padding: 0.95rem 0.4rem;
  border-top: 1px solid var(--garis);
}

.rank {
  flex: none;
  width: 2.2rem;
  font: 400 1.1rem/1 var(--font-display);
  color: var(--oranye);
}

.nama {
  flex: 1;
  font-weight: 600;
  min-width: 0;
}

.nama em {
  font-style: normal;
  font-weight: 400;
  font-size: 0.85rem;
  color: var(--tinta-2);
}

.jumlah {
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  color: var(--merah-teks);
  white-space: nowrap;
}
</style>
