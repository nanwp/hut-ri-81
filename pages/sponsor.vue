<script setup lang="ts">
import site from '~/data/site.json'

useHead({ title: 'Sponsor — Semarak Kemerdekaan RW 01' })
useSeoMeta({
  description: `Paket sponsor ${site.event.name} HUT RI ke-${site.event.hutKe} RW 01: logo usaha Anda di panggung, spanduk, media publikasi, dan website acara.`
})

const pesan = encodeURIComponent(
  `Halo ${site.event.penyelenggara}, saya tertarik menjadi sponsor ${site.event.name} HUT RI ke-${site.event.hutKe}.\nNama usaha: \nPaket yang diminati (Platinum/Gold/Silver/Bronze): `
)
const waSponsor = `https://wa.me/${site.kontak.whatsappIntl}?text=${pesan}`

const halaman = ref<HTMLElement | null>(null)
useReveal(halaman)
</script>

<template>
  <main ref="halaman" class="sponsor-hal">
    <header class="wrap kepala">
      <p class="eyebrow lift l1">Kerja Sama Usaha</p>
      <h1 class="lift l2">Sponsor<span class="titik">.</span></h1>
      <p class="sub lift l3">
        Ribuan pasang mata warga RW 01 akan menghadiri rangkaian acara ini — dari upacara sampai
        panggung malam puncak. Tempatkan usaha Anda di tengah kemeriahannya: logo di panggung,
        spanduk, media publikasi, dan website ini.
      </p>
    </header>

    <div class="wrap isi">
      <SponsorTiers class="reveal" />

      <SponsorStrip class="strip reveal" :ajak="false" />

      <!-- ajakan penutup: bahasa visual "panggung malam" -->
      <section class="ajak reveal" aria-labelledby="judul-ajak">
        <FestiveTexture :opacity="0.07" />
        <div class="ajak-in">
          <p class="eyebrow gold">Slot Terbatas</p>
          <h2 id="judul-ajak">Amankan tempat usaha Anda.</h2>
          <p class="ajak-sub">
            Backdrop panggung dicetak jelang malam puncak — semakin awal bergabung, semakin lama
            logo Anda ikut terpasang di seluruh media acara.
          </p>
          <div class="ajak-cta">
            <a :href="waSponsor" target="_blank" rel="noopener" class="btn btn-primer">
              Hubungi Panitia via WhatsApp
            </a>
            <NuxtLink to="/galeri" class="btn btn-emas">Lihat Kemeriahan Tahun Lalu</NuxtLink>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<style scoped>
.sponsor-hal {
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
  max-width: 36rem;
}

.isi {
  margin-top: clamp(1rem, 3vw, 2rem);
}

/* SponsorTiers sudah punya margin atas sendiri; strip di bawahnya dirapikan */
.strip {
  padding-block: 0;
  border-top: 0;
  margin-top: clamp(3rem, 7vw, 5rem);
}

.strip :deep(.wrap) {
  padding-inline: 0;
}

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
