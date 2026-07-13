<script setup lang="ts">
import type { Pengeluaran } from '~/utils/model'

const props = defineProps<{
  expenses: Pengeluaran[]
  totalMasuk: number
  rincian?: { warga: number; sponsor: number }
}>()

const totalKeluar = computed(() => props.expenses.reduce((jumlah, e) => jumlah + e.amount, 0))
const saldo = computed(() => props.totalMasuk - totalKeluar.value)
</script>

<template>
  <section class="rekap" aria-labelledby="judul-rekap">
    <header class="kepala">
      <p class="eyebrow">Transparansi</p>
      <h2 id="judul-rekap">Penggunaan Dana</h2>
    </header>

    <ol v-if="expenses.length" class="daftar">
      <li v-for="(e, i) in expenses" :key="`${e.label}-${i}`">
        <span class="tanggal">{{ formatTanggal(e.date) }}</span>
        <span class="label">{{ e.label }}</span>
        <span class="jumlah">−{{ formatRupiah(e.amount) }}</span>
      </li>
    </ol>
    <p v-else class="kosong">Belum ada pengeluaran yang dicatat.</p>

    <dl class="ringkas">
      <div>
        <dt>Total masuk</dt>
        <dd>{{ formatRupiah(totalMasuk) }}</dd>
        <p v-if="rincian" class="rinci">
          Donasi warga {{ formatRupiah(rincian.warga) }}<br />
          Sponsor {{ formatRupiah(rincian.sponsor) }}
        </p>
      </div>
      <div>
        <dt>Total keluar</dt>
        <dd class="keluar">−{{ formatRupiah(totalKeluar) }}</dd>
      </div>
      <div class="saldo">
        <dt>Saldo kas</dt>
        <dd>{{ formatRupiah(saldo) }}</dd>
      </div>
    </dl>
  </section>
</template>

<style scoped>
.kepala h2 {
  margin-top: 0.7rem;
}

.daftar {
  list-style: none;
  margin: 1.8rem 0 0;
  padding: 0;
  border-bottom: 1px solid var(--garis);
}

.daftar li {
  display: flex;
  align-items: baseline;
  gap: 1rem;
  padding: 0.95rem 0.4rem;
  border-top: 1px solid var(--garis);
}

.tanggal {
  flex: none;
  width: 8.5rem;
  font-size: 0.82rem;
  color: var(--tinta-2);
}

.label {
  flex: 1;
  font-weight: 600;
  min-width: 0;
}

.jumlah {
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
  color: var(--tinta-2);
}

.kosong {
  margin-top: 1.8rem;
  font: italic 600 1rem/1.5 var(--font-body);
  color: var(--tinta-2);
}

.ringkas {
  display: grid;
  gap: 1rem;
  margin: 1.6rem 0 0;
}

@media (min-width: 640px) {
  .ringkas {
    grid-template-columns: 1fr 1fr 1fr;
  }
}

.ringkas div {
  background: var(--kartu);
  border: var(--tepi);
  border-radius: var(--radius);
  box-shadow: var(--pop-kecil);
  padding: 1.2rem 1.4rem;
}

.ringkas dt {
  font: 700 0.66rem/1 var(--font-body);
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--tinta-2);
}

.ringkas dd {
  margin: 0.5rem 0 0;
  font: 400 1.4rem/1.1 var(--font-display);
  font-variant-numeric: tabular-nums;
}

.rinci {
  margin-top: 0.6rem;
  font-size: 0.78rem;
  line-height: 1.6;
  color: var(--tinta-2);
  font-variant-numeric: tabular-nums;
}

.keluar {
  color: var(--tinta-2);
}

.saldo {
  border-top: 6px solid var(--emas);
}

.saldo dd {
  color: var(--merah-teks);
}

@media (max-width: 480px) {
  .tanggal {
    display: none;
  }
}
</style>
