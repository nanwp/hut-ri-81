<script setup lang="ts">
import site from '~/data/site.json'

const tickerItems = [
  'Merdeka!',
  `HUT RI ke-${site.event.hutKe}`,
  site.event.rangeLabel,
  site.event.penyelenggara,
  'Gotong royong, meriah bersama'
]
</script>

<template>
  <footer class="kaki">
    <TickerTape :items="tickerItems" warna="kuning" />

    <div class="wrap kaki-in">
      <div class="k-brand">
        <p class="k-nama">{{ site.event.name }} <span>RW 01</span></p>
        <p class="k-tag">{{ site.event.tagline }}</p>
        <p class="k-tag">Diselenggarakan oleh {{ site.event.penyelenggara }}.</p>
      </div>

      <div class="k-kolom">
        <h3>Kontak</h3>
        <ul>
          <li>{{ site.kontak.sekretariat }}</li>
          <li>WhatsApp: {{ site.kontak.whatsapp }}</li>
          <li><a :href="`mailto:${site.kontak.email}`">{{ site.kontak.email }}</a></li>
        </ul>
      </div>

      <div class="k-kolom">
        <h3>Media Sosial</h3>
        <ul>
          <li v-for="s in site.sosmed" :key="s.label">
            <a :href="s.url" target="_blank" rel="noopener">{{ s.label }} — {{ s.handle }}</a>
          </li>
        </ul>
      </div>

      <div class="k-kolom">
        <h3>Panitia Inti</h3>
        <ul>
          <li v-for="p in site.panitia" :key="p.peran">{{ p.peran }}: {{ p.nama }}</li>
        </ul>
      </div>
    </div>

    <div class="wrap k-bawah">
      <p>© {{ site.event.tahun }} {{ site.event.penyelenggara }} · Dirgahayu Republik Indonesia ke-{{ site.event.hutKe }}</p>
    </div>
  </footer>
</template>

<style scoped>
.kaki {
  background: var(--malam);
  color: var(--malam-tinta-2);
  margin-top: auto;
}

.kaki-in {
  display: grid;
  gap: 2.2rem;
  padding-block: 3.2rem 2.4rem;
}

@media (min-width: 640px) {
  .kaki-in {
    grid-template-columns: 1fr 1fr;
  }
}

@media (min-width: 980px) {
  .kaki-in {
    grid-template-columns: 1.4fr 1fr 1fr 1fr;
  }
}

.k-nama {
  font: 400 1.7rem/1 var(--font-display);
  text-transform: uppercase;
  letter-spacing: 0.02em;
  color: var(--malam-tinta);
}

.k-nama span {
  color: #ffd23f;
}

.k-tag {
  font-size: 0.88rem;
  margin-top: 0.6rem;
  max-width: 26rem;
}

.k-kolom h3 {
  font: 800 0.7rem/1 var(--font-body);
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #ffd23f;
  margin-bottom: 0.9rem;
}

.k-kolom ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0.45rem;
  font-size: 0.88rem;
}

.k-kolom a {
  color: inherit;
  text-decoration: none;
  border-bottom: 1px solid var(--malam-garis);
  transition: color 0.2s, border-color 0.2s;
}

.k-kolom a:hover {
  color: #ffd23f;
  border-bottom-color: #ffd23f;
}

.k-bawah {
  border-top: 1px solid var(--malam-garis);
  padding-block: 1.2rem;
  font-size: 0.78rem;
}
</style>
