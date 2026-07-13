// Generate public/og.png (1200×630) untuk preview link WhatsApp/sosmed.
// Gaya poster festival: cream + blok warna vivid + starburst "81".
// Jalankan: node scripts/og.mjs — hasilnya ikut ter-copy saat `nuxt generate`.
import { readFile, writeFile } from 'node:fs/promises'
import sharp from 'sharp'

const site = JSON.parse(await readFile(new URL('../data/site.json', import.meta.url), 'utf8'))

const svg = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#fff3e0"/>

  <!-- strip warna festival atas -->
  <rect x="0" y="0" width="300" height="16" fill="#e8382e"/>
  <rect x="300" y="0" width="300" height="16" fill="#ffc414"/>
  <rect x="600" y="0" width="300" height="16" fill="#00a868"/>
  <rect x="900" y="0" width="300" height="16" fill="#2563eb"/>

  <!-- starburst 81 kanan-atas: tiga persegi bertumpuk -->
  <g transform="rotate(-10 1010 220)">
    <g stroke="#1e1611" stroke-width="5">
      <rect x="905" y="115" width="210" height="210" fill="#ffc414"/>
      <rect x="905" y="115" width="210" height="210" fill="#ffc414" transform="rotate(30 1010 220)"/>
      <rect x="905" y="115" width="210" height="210" fill="#ffc414" transform="rotate(60 1010 220)"/>
    </g>
    <text x="1010" y="268" font-family="'DejaVu Sans', sans-serif" font-weight="bold" font-size="135" text-anchor="middle" fill="#e8382e">81</text>
  </g>

  <!-- konfeti -->
  <circle cx="760" cy="120" r="24" fill="none" stroke="#00a868" stroke-width="5"/>
  <path d="M1010 440l22 38h-44z" fill="#f03d8a"/>
  <circle cx="920" cy="470" r="9" fill="#2563eb"/>

  <!-- blok teks kiri -->
  <text x="80" y="150" font-family="'DejaVu Sans', sans-serif" font-weight="bold" font-size="24" letter-spacing="7" fill="#996e00">DIRGAHAYU RI KE-${site.event.hutKe} ★ RW 01</text>
  <text x="76" y="262" font-family="'DejaVu Sans', sans-serif" font-weight="bold" font-size="88" letter-spacing="-2" fill="#1e1611">SEMARAK</text>
  <text x="80" y="360" font-family="'DejaVu Sans', sans-serif" font-weight="bold" font-size="88" letter-spacing="-2" fill="#ffc414">KEMERDEKAAN</text>
  <text x="76" y="356" font-family="'DejaVu Sans', sans-serif" font-weight="bold" font-size="88" letter-spacing="-2" fill="#e8382e">KEMERDEKAAN</text>
  <text x="80" y="428" font-family="'DejaVu Sans', sans-serif" font-weight="bold" font-size="29" fill="#6e5d4b">${site.event.rangeLabel} · ${site.event.penyelenggara}</text>

  <!-- strip headliner bawah -->
  <rect x="0" y="558" width="1200" height="72" fill="#e8382e"/>
  <rect x="0" y="552" width="1200" height="6" fill="#1e1611"/>
  <text x="600" y="604" font-family="'DejaVu Sans', sans-serif" font-weight="bold" font-size="26" letter-spacing="3" text-anchor="middle" fill="#fff6e7">★ MARDATILA GROUP LIVE · 6 SEPTEMBER ★ SEPAK BOLA ANTAR RT ★</text>
</svg>`

const png = await sharp(Buffer.from(svg)).png().toBuffer()
await writeFile(new URL('../public/og.png', import.meta.url), png)
console.log(`public/og.png dibuat (${(png.length / 1024).toFixed(0)} KB)`)
