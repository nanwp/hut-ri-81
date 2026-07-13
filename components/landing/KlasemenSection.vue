<script setup lang="ts">
import standings from '~/data/standings.json'
import type { BarisKlasemen } from '~/utils/model'

const peringkat = computed(() =>
  [...(standings.rows as BarisKlasemen[])].sort((a, b) => {
    const selisih = poinKlasemen(b) - poinKlasemen(a)
    return selisih !== 0 ? selisih : b.menang - a.menang
  })
)

const adaSkor = computed(() => peringkat.value.some((b) => b.main > 0))
</script>

<template>
  <section class="klasemen" aria-labelledby="judul-klasemen">
    <div class="wrap">
      <header class="kepala reveal">
        <p class="eyebrow">Perebutan Gelar Juara</p>
        <h2>Klasemen Sepak Bola Antar RT</h2>
        <p class="sub">{{ standings.catatan }}</p>
      </header>

      <div class="tabel-bungkus reveal" style="--rd: 0.12s">
        <table class="tabel">
          <thead>
            <tr>
              <th class="kiri" scope="col">RT</th>
              <th scope="col">Main</th>
              <th scope="col" title="Menang">M</th>
              <th scope="col" title="Seri">S</th>
              <th scope="col" title="Kalah">K</th>
              <th scope="col">Poin</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(b, i) in peringkat"
              :key="b.rt"
              :class="{ pemimpin: adaSkor && i === 0 }"
            >
              <th class="kiri" scope="row">
                {{ b.rt }}
                <span v-if="adaSkor && i === 0" class="badge">Memimpin</span>
              </th>
              <td>{{ b.main }}</td>
              <td>{{ b.menang }}</td>
              <td>{{ b.seri }}</td>
              <td>{{ b.kalah }}</td>
              <td class="poin">{{ poinKlasemen(b) }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p class="update reveal" style="--rd: 0.18s">
        Diperbarui {{ formatTanggal(standings.updatedAt) }}
      </p>
    </div>
  </section>
</template>

<style scoped>
.klasemen {
  padding-block: clamp(4rem, 9vw, 7rem);
  background: var(--kertas-2);
  border-top: var(--tepi);
}

.kepala {
  max-width: 38rem;
}

.kepala h2 {
  margin-top: 0.7rem;
}

.sub {
  margin-top: 1rem;
  color: var(--tinta-2);
  font-size: 0.95rem;
  font-weight: 500;
}

.tabel-bungkus {
  margin-top: 2.2rem;
  background: var(--kartu);
  border: var(--tepi);
  border-radius: var(--radius);
  box-shadow: var(--pop);
  overflow-x: auto;
}

.tabel {
  width: 100%;
  border-collapse: collapse;
  font-variant-numeric: tabular-nums;
}

.tabel th,
.tabel td {
  padding: 0.85rem clamp(0.55rem, 2vw, 1.4rem);
  text-align: center;
}

.kiri {
  text-align: left;
}

thead th {
  font: 800 0.66rem/1 var(--font-body);
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--tinta-2);
  border-bottom: var(--tepi);
}

tbody th {
  font: 400 1.05rem/1.3 var(--font-display);
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

tbody tr + tr {
  border-top: 1px solid var(--garis);
}

tbody td {
  color: var(--tinta-2);
  font-weight: 600;
}

.poin {
  font-weight: 800;
  color: var(--merah-teks);
}

.pemimpin {
  background: color-mix(in srgb, var(--emas) 22%, transparent);
}

.badge {
  display: inline-block;
  background: var(--emas);
  color: #1e1611;
  font: 800 0.56rem/1 var(--font-body);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  padding: 0.32rem 0.6rem;
  border: 2px solid #1e1611;
  border-radius: 999px;
  vertical-align: 0.25em;
  margin-left: 0.5rem;
}

.update {
  margin-top: 0.9rem;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--tinta-2);
}
</style>
