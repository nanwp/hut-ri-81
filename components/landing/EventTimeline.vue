<script setup lang="ts">
import eventsData from '~/data/events.json'
import type { Acara } from '~/utils/model'

const semua: Acara[] = [...(eventsData as Acara[])].sort((a, b) => a.order - b.order)

// chips diturunkan dari data — kategori tanpa acara tidak memunculkan chip
const kategori = [
  { key: 'semua', label: 'Semua' },
  ...[...new Set(semua.map((e) => e.category))].map((key) => ({
    key,
    label: KATEGORI_LABEL[key] ?? key
  }))
]

const aktif = ref('semua')

const tampil = computed(() =>
  aktif.value === 'semua' ? semua : semua.filter((e) => e.category === aktif.value)
)
</script>

<template>
  <section id="acara" class="acara">
    <div class="wrap">
      <header class="kepala reveal">
        <p class="eyebrow">Line-Up Acara</p>
        <h2>Rangkaian Acara</h2>
        <p class="sub">
          Lima mata acara dari 16 Agustus sampai 6 September 2026 — padat, kolaboratif, dan
          merangkul seluruh lapisan usia. Dari doa syukur sampai panggung dangdut.
        </p>
      </header>

      <div class="chips reveal" style="--rd: 0.1s">
        <button
          v-for="k in kategori"
          :key="k.key"
          type="button"
          class="chip"
          :class="{ aktif: aktif === k.key }"
          :aria-pressed="aktif === k.key"
          @click="aktif = k.key"
        >
          {{ k.label }}
        </button>
      </div>

      <TransitionGroup name="daftar" tag="ol" class="daftar reveal" style="--rd: 0.18s">
        <li v-for="e in tampil" :key="e.id">
          <EventCard :event="e" />
        </li>
      </TransitionGroup>
    </div>
  </section>
</template>

<style scoped>
.acara {
  padding-block: clamp(4rem, 9vw, 7rem);
}

.kepala {
  max-width: 36rem;
}

.kepala h2 {
  margin-top: 0.7rem;
}

.sub {
  margin-top: 1rem;
  color: var(--tinta-2);
  font-weight: 500;
}

.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-top: 2.2rem;
}

.chip {
  padding: 0.55rem 1.1rem;
  border-radius: 999px;
  border: var(--tepi);
  background: var(--kartu);
  color: var(--tinta);
  font: 800 0.78rem/1 var(--font-body);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  box-shadow: var(--pop-kecil);
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s, transform 0.15s, box-shadow 0.15s;
}

.chip:hover {
  transform: translate(-1px, -1px);
  box-shadow: 4px 4px 0 var(--tinta);
}

.chip:active {
  transform: translate(2px, 2px);
  box-shadow: 0 0 0 var(--tinta);
}

.chip.aktif {
  background: var(--tinta);
  color: var(--kertas);
}

.daftar {
  list-style: none;
  margin: 2.2rem 0 0;
  padding: 0;
  position: relative;
  display: grid;
  gap: 1.2rem;
}

/* transisi filter */
.daftar-move,
.daftar-enter-active,
.daftar-leave-active {
  transition: opacity 0.3s ease, transform 0.35s ease;
}

.daftar-enter-from,
.daftar-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.daftar-leave-active {
  position: absolute;
  width: 100%;
}
</style>
