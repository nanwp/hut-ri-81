<script setup lang="ts">
import eventsData from '~/data/events.json'
import site from '~/data/site.json'
import type { Acara } from '~/utils/model'

// Target utama: Hari Kemerdekaan. Setelah lewat, geser ke acara terdekat
// yang belum dimulai. Setelah semua usai: ucapan penutup.
const hariH = new Date(site.event.tahun, 7, 17).getTime()

const acara = [...(eventsData as Acara[])].sort(
  (a, b) => new Date(a.dateStart).getTime() - new Date(b.dateStart).getTime()
)

const sekarang = ref<number | null>(null)
let timer: ReturnType<typeof setInterval> | undefined

onMounted(() => {
  sekarang.value = Date.now()
  timer = setInterval(() => {
    sekarang.value = Date.now()
  }, 1000)
})

onUnmounted(() => clearInterval(timer))

const target = computed(() => {
  if (sekarang.value === null) return null
  if (sekarang.value < hariH) {
    return { label: 'Menuju Hari Kemerdekaan', kapan: `17 Agustus ${site.event.tahun}`, ms: hariH }
  }
  const berikutnya = acara.find((e) => new Date(e.dateStart).getTime() > sekarang.value!)
  if (!berikutnya) return null
  return {
    label: `Menuju ${berikutnya.title}`,
    kapan: `${berikutnya.dateLabel} · ${berikutnya.timeLabel}`,
    ms: new Date(berikutnya.dateStart).getTime()
  }
})

const usai = computed(() => {
  if (sekarang.value === null) return false
  return sekarang.value >= hariH && target.value === null
})

const sisa = computed(() => {
  if (!target.value || sekarang.value === null) return null
  const detikTotal = Math.max(0, Math.floor((target.value.ms - sekarang.value) / 1000))
  return {
    hari: Math.floor(detikTotal / 86400),
    jam: Math.floor((detikTotal % 86400) / 3600),
    menit: Math.floor((detikTotal % 3600) / 60),
    detik: detikTotal % 60
  }
})

const dua = (n: number) => String(n).padStart(2, '0')
</script>

<template>
  <div class="hitung" aria-live="off">
    <p v-if="usai" class="usai">
      Rangkaian acara telah usai — terima kasih, warga RW 01. Sampai jumpa tahun depan!
    </p>

    <template v-else>
      <div class="kotak-baris">
        <div class="kotak k-merah">
          <span class="angka">{{ sisa ? sisa.hari : '––' }}</span>
          <span class="satuan">Hari</span>
        </div>
        <div class="kotak k-biru">
          <span class="angka">{{ sisa ? dua(sisa.jam) : '––' }}</span>
          <span class="satuan">Jam</span>
        </div>
        <div class="kotak k-hijau">
          <span class="angka">{{ sisa ? dua(sisa.menit) : '––' }}</span>
          <span class="satuan">Menit</span>
        </div>
        <div class="kotak k-oranye">
          <span class="angka">{{ sisa ? dua(sisa.detik) : '––' }}</span>
          <span class="satuan">Detik</span>
        </div>
      </div>
      <p class="tuju">
        ★ {{ target ? `${target.label} — ${target.kapan}` : 'Menuju Hari Kemerdekaan' }}
      </p>
    </template>
  </div>
</template>

<style scoped>
.hitung {
  margin-top: 2.4rem;
}

.kotak-baris {
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
}

.kotak {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 4.4rem;
  padding: 0.6rem 0.8rem 0.55rem;
  background: var(--kartu);
  border: var(--tepi);
  border-radius: 12px;
  box-shadow: var(--pop-kecil);
  border-bottom-width: 5px;
}

.k-merah { border-bottom-color: var(--merah); }
.k-biru { border-bottom-color: var(--biru); }
.k-hijau { border-bottom-color: var(--hijau); }
.k-oranye { border-bottom-color: var(--oranye); }

.angka {
  font: 400 clamp(1.8rem, 5vw, 2.4rem) / 1 var(--font-display);
  color: var(--tinta);
  font-variant-numeric: tabular-nums;
}

.satuan {
  margin-top: 0.3rem;
  font-size: 0.6rem;
  font-weight: 800;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--tinta-2);
}

.tuju {
  margin-top: 0.9rem;
  font: 700 0.88rem/1.4 var(--font-body);
  color: var(--merah-teks);
}

.usai {
  font: italic 600 1.1rem/1.5 var(--font-body);
  color: var(--emas-teks);
}
</style>
