<script setup lang="ts">
import type { Acara } from '~/utils/model'

const props = defineProps<{ event: Acara }>()

const nomor = computed(() => String(props.event.order).padStart(2, '0'))

// tiap kartu dapat warna aksen sendiri, berputar mengikuti urutan acara
const AKSEN = ['var(--merah)', 'var(--biru)', 'var(--hijau)', 'var(--oranye)', 'var(--ungu)', 'var(--pink)']
const aksen = computed(() => AKSEN[(props.event.order - 1) % AKSEN.length])
</script>

<template>
  <article class="kartu" :style="{ '--aksen': aksen }">
    <p class="no" aria-hidden="true">{{ nomor }}</p>

    <div class="isi">
      <p class="kat">
        <span class="chip-kat">{{ KATEGORI_LABEL[event.category] ?? event.category }}</span>
        <span class="lvl">{{ event.level }}</span>
      </p>
      <h3>
        {{ event.title }}
        <span v-if="event.highlight" class="badge">Puncak ★</span>
      </h3>
      <p class="desk">{{ event.description }}</p>

      <ul v-if="event.sessions" class="sesi">
        <li v-for="s in event.sessions" :key="s.waktu">
          <b>{{ s.waktu }}</b>
          <span>{{ s.judul }}</span>
        </li>
      </ul>

      <a v-if="event.formUrl" :href="event.formUrl" target="_blank" rel="noopener" class="daftar">
        Daftar sekarang <span aria-hidden="true">→</span>
      </a>
    </div>

    <p class="waktu">
      <strong>{{ event.dateLabel }}</strong>
      <span>{{ event.timeLabel }}</span>
    </p>
  </article>
</template>

<style scoped>
.kartu {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-areas:
    'no waktu'
    'isi isi';
  gap: 0.9rem 1.2rem;
  background: var(--kartu);
  border: var(--tepi);
  border-radius: var(--radius);
  box-shadow: var(--pop);
  padding: clamp(1.3rem, 3.5vw, 1.9rem);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.kartu:hover {
  transform: translate(-2px, -2px);
  box-shadow: 7px 7px 0 var(--tinta);
}

@media (min-width: 760px) {
  .kartu {
    grid-template-columns: 4.4rem 1fr auto;
    grid-template-areas: 'no isi waktu';
    gap: 1.5rem;
    align-items: start;
  }
}

.no {
  grid-area: no;
  align-self: start;
  justify-self: start;
  background: var(--aksen);
  color: #fff6e7;
  font: 400 1.7rem/1 var(--font-display);
  padding: 0.45rem 0.6rem 0.35rem;
  border: var(--tepi);
  border-radius: 10px;
  box-shadow: var(--pop-kecil);
  transform: rotate(-5deg);
}

.isi {
  grid-area: isi;
  max-width: 38rem;
}

.kat {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.55rem;
  margin-bottom: 0.7rem;
}

.chip-kat {
  display: inline-block;
  background: color-mix(in srgb, var(--aksen) 16%, transparent);
  border: 2px solid var(--aksen);
  border-radius: 999px;
  padding: 0.28rem 0.7rem;
  font: 800 0.64rem/1 var(--font-body);
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.lvl {
  font: 700 0.7rem/1 var(--font-body);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--tinta-2);
}

.badge {
  display: inline-block;
  background: var(--pink);
  color: #fff6e7;
  font: 800 0.62rem/1 var(--font-body);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  padding: 0.38rem 0.7rem;
  border: 2px solid var(--tinta);
  border-radius: 999px;
  vertical-align: 0.35em;
  margin-left: 0.45rem;
  transform: rotate(2deg);
}

.desk {
  margin-top: 0.6rem;
  color: var(--tinta-2);
  font-size: 0.95rem;
  font-weight: 500;
}

.sesi {
  list-style: none;
  margin: 0.9rem 0 0;
  padding: 0;
  display: grid;
  gap: 0.45rem;
}

.sesi li {
  display: flex;
  align-items: baseline;
  gap: 0.6rem;
  font-size: 0.9rem;
  font-weight: 500;
}

.sesi b {
  flex: none;
  background: var(--kertas-2);
  border: 2px solid var(--garis-kuat);
  border-radius: 8px;
  padding: 0.2rem 0.55rem;
  font: 800 0.66rem/1.2 var(--font-body);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  white-space: nowrap;
}

.daftar {
  display: inline-block;
  margin-top: 1rem;
  font: 800 0.82rem/1 var(--font-body);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--merah-teks);
  text-decoration: none;
  border-bottom: 3px solid var(--emas);
  padding-bottom: 0.25rem;
  transition: color 0.2s, border-color 0.2s;
}

.daftar:hover {
  color: var(--tinta);
  border-bottom-color: var(--aksen);
}

.waktu {
  grid-area: waktu;
  align-self: start;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  text-align: center;
  border: 2px dashed var(--garis-kuat);
  border-radius: 12px;
  padding: 0.7rem 1rem;
}

.waktu strong {
  font: 400 1.02rem/1.15 var(--font-display);
  text-transform: uppercase;
  letter-spacing: 0.02em;
  white-space: nowrap;
}

.waktu span {
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--tinta-2);
}
</style>
