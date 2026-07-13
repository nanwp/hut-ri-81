import type { Ref } from 'vue'

// Mengamati semua elemen .reveal di dalam container dan menambahkan
// kelas .tampak saat masuk viewport. Hormati prefers-reduced-motion.
export function useReveal(container: Ref<HTMLElement | null>) {
  onMounted(() => {
    const root = container.value ?? document.body
    const els = root.querySelectorAll<HTMLElement>('.reveal')
    if (!els.length) return

    const reduksi = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduksi || !('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('tampak'))
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('tampak')
            io.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -36px 0px' }
    )

    els.forEach((el) => io.observe(el))
    onUnmounted(() => io.disconnect())
  })
}
