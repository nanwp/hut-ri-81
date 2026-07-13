<script setup lang="ts">
useHead({ title: 'Semarak Kemerdekaan RW 01 — HUT RI ke-81' })

const halaman = ref<HTMLElement | null>(null)
useReveal(halaman)
</script>

<template>
  <main ref="halaman">
    <HeroSection />
    <EventTimeline />
    <!-- <KlasemenSection /> -->
    <PuncakHighlight />
    <DonationCta />
    <SponsorStrip />
  </main>
</template>
