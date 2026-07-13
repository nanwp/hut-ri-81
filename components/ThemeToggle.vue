<script setup lang="ts">
const { toggle } = useTheme()
</script>

<template>
  <button class="tombol-tema" type="button" aria-label="Ganti tema terang/gelap" @click="toggle">
    <!-- ikon dipilih lewat CSS berdasarkan [data-theme], jadi bebas hydration mismatch -->
    <svg class="ikon-surya" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4.2" />
      <path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5 5l1.6 1.6M17.4 17.4L19 19M19 5l-1.6 1.6M6.6 17.4L5 19" />
    </svg>
    <svg class="ikon-bulan" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" aria-hidden="true">
      <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4 8.5 8.5 0 1 0 20 14.5Z" />
    </svg>
  </button>
</template>

<style>
.tombol-tema {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border: 1px solid var(--garis);
  border-radius: 999px;
  background: transparent;
  color: var(--tinta);
  cursor: pointer;
  transition: border-color 0.2s, color 0.2s;
}

.tombol-tema:hover {
  border-color: var(--emas);
  color: var(--emas-teks);
}

.tombol-tema svg {
  width: 17px;
  height: 17px;
}

.tombol-tema .ikon-bulan {
  display: none;
}

[data-theme='dark'] .tombol-tema .ikon-bulan {
  display: block;
}

[data-theme='dark'] .tombol-tema .ikon-surya {
  display: none;
}
</style>
