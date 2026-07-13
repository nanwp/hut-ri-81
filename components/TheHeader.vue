<script setup lang="ts">
import site from '~/data/site.json'
</script>

<template>
  <header class="hdr">
    <!-- strip warna festival sebagai pembuka -->
    <div class="strip" aria-hidden="true"></div>

    <div class="wrap hdr-in">
      <NuxtLink to="/" class="brand">
        <span class="brand-num" aria-hidden="true">81</span>
        <span class="brand-txt">
          <strong>{{ site.event.name }}</strong>
          <small>RW 01 · Karang Taruna</small>
        </span>
      </NuxtLink>

      <nav class="nav" aria-label="Navigasi utama">
        <NuxtLink to="/">Beranda</NuxtLink>
        <NuxtLink to="/galeri">Galeri</NuxtLink>
        <NuxtLink to="/sponsor">Sponsor</NuxtLink>
        <NuxtLink to="/donasi">Top Donasi</NuxtLink>
      </nav>

      <ThemeToggle class="tema" />
    </div>
  </header>
</template>

<style scoped>
.hdr {
  position: sticky;
  top: 0;
  z-index: 50;
  background: color-mix(in srgb, var(--kertas) 88%, transparent);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: var(--tepi);
  transition: background-color 0.35s ease;
}

.strip {
  height: 7px;
  background: linear-gradient(
    90deg,
    var(--merah) 0 25%,
    var(--emas) 25% 50%,
    var(--hijau) 50% 75%,
    var(--biru) 75% 100%
  );
  border-bottom: var(--tepi);
}

.hdr-in {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding-block: 0.65rem;
}

.brand {
  margin-right: auto;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  min-width: 0;
}

.brand-num {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  flex: none;
  background: var(--merah);
  color: #fff6e7;
  font: 400 1.15rem/1 var(--font-display);
  border: var(--tepi);
  border-radius: 10px;
  box-shadow: var(--pop-kecil);
  transform: rotate(-4deg);
  transition: transform 0.2s;
}

.brand:hover .brand-num {
  transform: rotate(3deg) scale(1.05);
}

.brand-txt {
  display: flex;
  flex-direction: column;
  line-height: 1.1;
  min-width: 0;
}

.brand-txt strong {
  font-family: var(--font-display);
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  font-size: 1rem;
  white-space: nowrap;
}

.brand-txt small {
  font-size: 0.64rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--tinta-2);
}

.nav {
  display: flex;
  align-items: center;
  gap: clamp(0.35rem, 1.6vw, 0.9rem);
}

.nav a {
  text-decoration: none;
  font-size: 0.82rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--tinta-2);
  padding: 0.42rem 0.7rem;
  border: 2px solid transparent;
  border-radius: 999px;
  transition: color 0.2s, background-color 0.2s, border-color 0.2s;
}

.nav a:hover {
  color: var(--tinta);
  border-color: var(--garis-kuat);
}

.nav a.router-link-exact-active {
  background: var(--emas);
  color: #1e1611;
  border-color: #1e1611;
}

/* layar sempit: dua baris yang disengaja —
   baris 1 brand + toggle, baris 2 nav pills yang bisa digeser */
@media (max-width: 680px) {
  .hdr-in {
    display: grid;
    grid-template-columns: 1fr auto;
    grid-template-areas:
      'brand tema'
      'nav nav';
    row-gap: 0.55rem;
    padding-block: 0.6rem;
  }

  .brand {
    grid-area: brand;
    margin-right: 0;
  }

  .tema {
    grid-area: tema;
    justify-self: end;
  }

  .nav {
    grid-area: nav;
    justify-content: flex-start;
    flex-wrap: nowrap;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    margin-inline: calc(var(--pad-x) * -1);
    padding-inline: var(--pad-x);
  }

  .nav::-webkit-scrollbar {
    display: none;
  }

  .nav a {
    flex: none;
    white-space: nowrap;
    font-size: 0.74rem;
    padding: 0.38rem 0.62rem;
  }

  .brand-txt strong {
    font-size: 0.92rem;
  }
}
</style>
