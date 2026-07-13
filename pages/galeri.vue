<script setup lang="ts">
import gallery from '~/data/gallery.json'
import site from '~/data/site.json'

// Entri boleh berupa string URL saja, atau objek { src, caption, date }
type EntriFoto = string | { src: string; caption?: string; date?: string }

const hutLalu = site.event.hutKe - 1
const tahunLalu = site.event.tahun - 1

useHead({ title: `Galeri Kenangan — Semarak Kemerdekaan RW 01` })
useSeoMeta({
  description: `Kilas balik kemeriahan HUT RI ke-${hutLalu} tahun ${tahunLalu} di RW 01 — dan ajakan menjadi sponsor atau peserta tahun ini.`
})

const foto = (gallery.photos as EntriFoto[]).map((p) =>
  typeof p === 'string' ? { src: p, caption: undefined, date: undefined } : p
)

const halaman = ref<HTMLElement | null>(null)
useReveal(halaman)
</script>

<template>
  <main ref="halaman" class="galeri">
    <header class="wrap kepala">
      <p class="eyebrow lift l1">Kilas Balik · HUT RI ke-{{ hutLalu }}</p>
      <h1 class="lift l2">Kenangan Tahun Lalu<span class="titik">.</span></h1>
      <p class="sub lift l3">
        Begini meriahnya {{ tahunLalu }} di lingkungan RW 01 — dan tahun ini kami ingin lebih
        ramai lagi. Lihat, lalu ikutlah ambil bagian.
      </p>
    </header>

    <div class="wrap isi">
      <div v-if="foto.length" class="grid reveal">
        <figure v-for="(f, i) in foto" :key="`${f.src}-${i}`">
          <img :src="f.src" :alt="f.caption || `Dokumentasi HUT RI ke-${hutLalu} RW 01`" loading="lazy" />
          <figcaption v-if="f.caption">
            {{ f.caption }}<span v-if="f.date"> · {{ formatTanggal(f.date) }}</span>
          </figcaption>
        </figure>
      </div>

      <div v-else class="kosong reveal">
        <FestiveTexture :opacity="0.06" />
        <p class="kosong-judul">Foto kenangan sedang dikumpulkan.</p>
        <p class="kosong-sub">
          Panitia sedang merapikan dokumentasi HUT RI ke-{{ hutLalu }}. Punya foto kemeriahan
          tahun lalu? Kirimkan ke sekretariat Karang Taruna.
        </p>
      </div>

      <!-- ajakan: dari nostalgia ke aksi -->
      <section class="ajak reveal" aria-labelledby="judul-ajak">
        <FestiveTexture :opacity="0.07" />
        <div class="ajak-in">
          <p class="eyebrow gold">Tahun Ini Giliran Anda</p>
          <h2 id="judul-ajak">Jadikan {{ site.event.tahun }} lebih meriah.</h2>
          <p class="ajak-sub">
            Kemeriahan seperti ini hanya mungkin berkat sponsor dan warga yang ikut serta.
            Dukung sebagai sponsor/donatur, atau langsung daftar jadi peserta lomba.
          </p>
          <div class="ajak-cta">
            <NuxtLink to="/sponsor" class="btn btn-primer">Lihat Paket Sponsor</NuxtLink>
            <NuxtLink to="/#acara" class="btn btn-emas">Daftar Jadi Peserta</NuxtLink>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<style scoped>
.galeri {
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
}

/* grid foto — kolom mengalir, rasio dibiarkan natural */
.grid {
  columns: 1;
  column-gap: 1.2rem;
}

@media (min-width: 600px) {
  .grid {
    columns: 2;
  }
}

@media (min-width: 960px) {
  .grid {
    columns: 3;
  }
}

.grid figure {
  margin: 0 0 1.2rem;
  break-inside: avoid;
  background: var(--kartu);
  border: var(--tepi);
  border-radius: var(--radius);
  box-shadow: var(--pop-kecil);
  overflow: hidden;
}

.grid img {
  width: 100%;
  height: auto;
}

.grid figcaption {
  padding: 0.85rem 1.1rem;
  font-size: 0.85rem;
  color: var(--tinta-2);
}

.kosong {
  position: relative;
  overflow: hidden;
  background: var(--kertas-2);
  border: var(--tepi);
  border-radius: var(--radius);
  box-shadow: var(--pop);
  padding: clamp(3rem, 8vw, 5rem) clamp(1.5rem, 5vw, 3rem);
  text-align: center;
}

.kosong-judul {
  position: relative;
  font: 400 clamp(1.5rem, 4vw, 2.1rem) / 1.2 var(--font-display);
  text-transform: uppercase;
  color: var(--merah-teks);
}

.kosong-sub {
  position: relative;
  margin: 1rem auto 0;
  max-width: 28rem;
  color: var(--tinta-2);
}

/* CTA sponsor — bahasa visual "malam puncak" */
.ajak {
  position: relative;
  overflow: hidden;
  margin-top: clamp(3rem, 7vw, 5rem);
  background: var(--malam);
  color: var(--malam-tinta);
  border: var(--tepi);
  border-radius: var(--radius);
  box-shadow: var(--pop);
  padding: clamp(2.5rem, 7vw, 4.5rem) clamp(1.5rem, 5vw, 3.5rem);
  text-align: center;
}

.ajak :deep(.fete) {
  color: #ffd23f;
}

.ajak-in {
  position: relative;
  max-width: 38rem;
  margin-inline: auto;
}

.gold {
  color: #ffd23f;
}

.ajak h2 {
  margin-top: 0.8rem;
  font-weight: 700;
}

.ajak-sub {
  margin-top: 1.1rem;
  color: var(--malam-tinta-2);
}

.ajak-cta {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.8rem;
  margin-top: 2rem;
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
