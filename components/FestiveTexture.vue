<script setup lang="ts">
// Konfeti geometris sebagai tekstur latar halus (pengganti motif batik
// dari desain lama). Parent harus position: relative; warna ikut currentColor.
const props = defineProps<{ opacity?: number }>()
const patternId = useId()
</script>

<template>
  <svg class="fete" aria-hidden="true" :style="{ opacity: props.opacity ?? 0.06 }">
    <defs>
      <pattern :id="patternId" width="140" height="140" patternUnits="userSpaceOnUse">
        <g fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="24" cy="26" r="9" />
          <path d="M96 18l7 12h-14z" />
          <path d="M40 96h16M48 88v16" />
          <path d="M118 84l3.5 7 7.5 1-5.5 5.5 1.5 7.5-7-3.5-7 3.5 1.5-7.5-5.5-5.5 7.5-1z" />
          <path d="M10 128c6-8 12 8 18 0" />
          <circle cx="76" cy="130" r="4" fill="currentColor" stroke="none" />
          <circle cx="132" cy="34" r="4" fill="currentColor" stroke="none" />
        </g>
      </pattern>
    </defs>
    <rect width="100%" height="100%" :fill="`url(#${patternId})`" />
  </svg>
</template>

<style scoped>
.fete {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  color: var(--tinta);
  pointer-events: none;
}
</style>
