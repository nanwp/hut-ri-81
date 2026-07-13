<script setup lang="ts">
const props = withDefaults(
  defineProps<{ items: string[]; warna?: 'merah' | 'kuning' | 'malam' }>(),
  { warna: 'merah' }
)

const teks = computed(() => props.items.map((t) => t.toUpperCase()))
</script>

<template>
  <div class="pita" :class="warna" aria-hidden="true">
    <div class="jalur">
      <!-- dua salinan identik: animasi -50% menghasilkan loop mulus -->
      <span v-for="n in 2" :key="n" class="isi">
        <template v-for="(t, i) in teks" :key="i">{{ t }}<i>★</i></template>
      </span>
    </div>
  </div>
</template>

<style scoped>
.pita {
  overflow: hidden;
  border-block: var(--tepi);
}

.merah {
  background: var(--merah);
  color: #fff6e7;
}

.kuning {
  background: var(--emas);
  color: #1e1611;
  border-color: #1e1611;
}

.malam {
  background: var(--malam);
  color: var(--malam-tinta);
}

.jalur {
  display: flex;
  width: max-content;
  animation: geser 26s linear infinite;
}

.isi {
  display: inline-flex;
  align-items: center;
  padding-block: 0.6rem;
  font: 800 0.78rem/1 var(--font-body);
  letter-spacing: 0.2em;
  white-space: nowrap;
}

.isi i {
  font-style: normal;
  padding-inline: 1.1rem;
}

@keyframes geser {
  to {
    transform: translateX(-50%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .jalur {
    animation: none;
  }
}
</style>
