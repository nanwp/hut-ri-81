<script setup lang="ts">
import type { Donatur } from '~/utils/model'

const props = defineProps<{ entries: Donatur[] }>()

const total = computed(() => totalDonasi(props.entries))
const warga = computed(() =>
  props.entries.reduce((jumlah, d) => jumlah + (d.contributors ?? 0), 0)
)
</script>

<template>
  <section class="kolektif" aria-label="Donasi terkumpul warga">
    <ul class="daftar">
      <li v-for="(d, i) in entries" :key="`${d.name}-${i}`">
        <div class="kiri">
          <p class="nama">
            {{ d.name }}<em v-if="d.rt"> · RT {{ d.rt }}</em>
          </p>
          <p v-if="d.note" class="ket">{{ d.note }}</p>
        </div>
        <div class="kanan">
          <p class="jumlah">{{ formatRupiah(d.amount) }}</p>
          <p v-if="d.contributors" class="warga">{{ d.contributors }} warga</p>
        </div>
      </li>
    </ul>

    <p class="total">
      <strong>{{ formatRupiah(total) }}</strong>
      terkumpul<template v-if="warga"> dari {{ warga }} warga</template>
    </p>
  </section>
</template>

<style scoped>
.kolektif {
  background: var(--kartu);
  border: var(--tepi);
  border-top: 6px solid var(--emas);
  border-radius: var(--radius);
  box-shadow: var(--pop-kecil);
  padding: clamp(1.3rem, 3.5vw, 2rem);
}

.daftar {
  list-style: none;
  margin: 0;
  padding: 0;
}

.daftar li {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.9rem 0;
  border-top: 1px solid var(--garis);
}

.daftar li:first-child {
  border-top: 0;
  padding-top: 0;
}

.kiri {
  min-width: 0;
}

.nama {
  font-weight: 700;
}

.nama em {
  font-style: normal;
  font-weight: 400;
  font-size: 0.85rem;
  color: var(--tinta-2);
}

.ket {
  margin-top: 0.25rem;
  font-size: 0.82rem;
  line-height: 1.5;
  color: var(--tinta-2);
}

.kanan {
  flex: none;
  text-align: right;
}

.jumlah {
  font-weight: 800;
  font-variant-numeric: tabular-nums;
  color: var(--merah-teks);
  white-space: nowrap;
}

.warga {
  margin-top: 0.2rem;
  font-size: 0.78rem;
  color: var(--tinta-2);
  white-space: nowrap;
}

.total {
  margin-top: 1.2rem;
  padding-top: 1.1rem;
  border-top: 1px solid var(--garis);
  font-size: 0.85rem;
  line-height: 1.65;
  color: var(--tinta-2);
}

.total strong {
  color: var(--emas-teks);
  font-weight: 800;
  font-variant-numeric: tabular-nums;
}
</style>
