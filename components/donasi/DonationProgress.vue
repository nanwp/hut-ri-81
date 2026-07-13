<script setup lang="ts">
const props = defineProps<{
  total: number
  target: number
  updatedAt: string
  rincian?: { warga: number; sponsor: number }
}>()

const persen = computed(() => Math.min(100, Math.round((props.total / props.target) * 100)))

// animasikan lebar bar dari 0 setelah mount
const lebar = ref(0)
onMounted(() => {
  requestAnimationFrame(() => {
    lebar.value = persen.value
  })
})
</script>

<template>
  <section class="progres" aria-label="Progres pengumpulan dana">
    <div class="atas">
      <div>
        <p class="label">Terkumpul</p>
        <p class="total">{{ formatRupiah(total) }}</p>
        <p class="target">dari target {{ formatRupiah(target) }}</p>
        <p v-if="rincian" class="rinci">
          {{ formatRupiah(rincian.warga) }} donasi warga · {{ formatRupiah(rincian.sponsor) }} sponsor
        </p>
      </div>
      <p class="pct" aria-hidden="true">{{ persen }}<span>%</span></p>
    </div>

    <div
      class="bar"
      role="progressbar"
      :aria-valuenow="total"
      :aria-valuemax="target"
      aria-valuemin="0"
      :aria-valuetext="`${formatRupiah(total)} dari target ${formatRupiah(target)}`"
    >
      <i :style="{ width: lebar + '%' }"></i>
    </div>

    <p class="update">
      Diperbarui {{ formatTanggal(updatedAt) }} · dikelola Bendahara Karang Taruna RW 01
    </p>
  </section>
</template>

<style scoped>
.progres {
  background: var(--kartu);
  border: var(--tepi);
  border-top: 6px solid var(--merah);
  border-radius: var(--radius);
  box-shadow: var(--pop);
  padding: clamp(1.6rem, 4vw, 2.6rem);
}

.atas {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
}

.label {
  font: 700 0.7rem/1 var(--font-body);
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--tinta-2);
}

.total {
  margin-top: 0.55rem;
  font: 400 clamp(2rem, 6vw, 3.2rem) / 1.05 var(--font-display);
  color: var(--merah-teks);
  font-variant-numeric: tabular-nums;
}

.target {
  margin-top: 0.35rem;
  color: var(--tinta-2);
  font-size: 0.92rem;
}

.rinci {
  margin-top: 0.4rem;
  font-size: 0.8rem;
  color: var(--emas-teks);
  font-variant-numeric: tabular-nums;
}

.pct {
  font: 400 clamp(2.4rem, 7vw, 4rem) / 1 var(--font-display);
  color: var(--pink);
  flex: none;
}

.pct span {
  font-size: 0.45em;
}

.bar {
  height: 18px;
  margin-top: 1.8rem;
  border-radius: 999px;
  border: var(--tepi);
  background: var(--kertas-2);
  overflow: hidden;
}

.bar i {
  display: block;
  height: 100%;
  background: linear-gradient(90deg, var(--merah), var(--oranye));
  border-radius: inherit;
  transition: width 1.3s cubic-bezier(0.22, 1, 0.36, 1);
}

.update {
  margin-top: 0.9rem;
  font-size: 0.8rem;
  color: var(--tinta-2);
}
</style>
