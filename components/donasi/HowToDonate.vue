<script setup lang="ts">
import site from '~/data/site.json'

interface Kanal {
  type: string
  label: string
  detail: string
  holder: string | null
}

defineProps<{ channels: Kanal[] }>()

const pesan = encodeURIComponent(
  `Halo Bendahara ${site.event.penyelenggara}, saya ingin konfirmasi donasi untuk ${site.event.name} HUT RI ke-${site.event.hutKe}.\nNama (boleh Hamba Allah): \nNominal: Rp \nAsal RT: `
)
const waUrl = `https://wa.me/${site.kontak.whatsappIntl}?text=${pesan}`
</script>

<template>
  <section class="cara" aria-labelledby="judul-cara">
    <header class="kepala">
      <p class="eyebrow">Ikut Mendukung</p>
      <h2 id="judul-cara">Cara Berdonasi</h2>
    </header>

    <div class="kanal">
      <article v-for="k in channels" :key="k.type" class="kartu-kanal">
        <p class="k-label">{{ k.label }}</p>
        <p class="k-detail">{{ k.detail }}</p>
        <p v-if="k.holder" class="k-holder">a.n. {{ k.holder }}</p>
      </article>
    </div>

    <div class="konfirmasi">
      <a :href="waUrl" target="_blank" rel="noopener" class="btn btn-primer">
        <svg class="ikon-wa" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-2.9.8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.6-6.1c-.3-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.3-.7.8-.8 1-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.6-1.2.1-.2 0-.4 0-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.2s.9 2.5 1.1 2.7c.1.2 1.8 2.8 4.5 3.9 1.7.7 2.3.8 3.1.7.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2 0-.1-.2-.2-.5-.3Z" />
        </svg>
        Konfirmasi Donasi via WhatsApp
      </a>
      <p class="konfirmasi-sub">
        Pesan sudah terisi otomatis — tinggal lengkapi nama, nominal, dan asal RT.
      </p>
    </div>

    <p class="nota">
      Nomor rekening &amp; QRIS resmi akan diumumkan oleh panitia. Seluruh dana dikelola secara
      transparan dan direkap berkala di halaman ini.
    </p>
  </section>
</template>

<style scoped>
.kepala h2 {
  margin-top: 0.7rem;
}

.kanal {
  display: grid;
  gap: 1rem;
  margin-top: 1.8rem;
}

@media (min-width: 640px) {
  .kanal {
    grid-template-columns: 1fr 1fr;
  }
}

.kartu-kanal {
  background: var(--kartu);
  border: var(--tepi);
  border-radius: var(--radius);
  box-shadow: var(--pop-kecil);
  padding: 1.6rem;
}

.k-label {
  font: 800 0.7rem/1 var(--font-body);
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--emas-teks);
}

.k-detail {
  margin-top: 0.8rem;
  font: 400 1.6rem/1.2 var(--font-display);
  text-transform: uppercase;
  letter-spacing: 0.02em;
  color: var(--tinta);
}

.k-holder {
  margin-top: 0.4rem;
  font-size: 0.88rem;
  color: var(--tinta-2);
}

.konfirmasi {
  margin-top: 2rem;
}

.ikon-wa {
  width: 18px;
  height: 18px;
}

.konfirmasi-sub {
  margin-top: 0.7rem;
  font-size: 0.85rem;
  color: var(--tinta-2);
}

.nota {
  margin-top: 1.6rem;
  font-size: 0.88rem;
  color: var(--tinta-2);
  max-width: 44rem;
}
</style>
