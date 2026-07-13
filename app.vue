<template>
  <div class="situs">
    <NuxtRouteAnnouncer />
    <TheHeader />
    <NuxtPage />
    <TheFooter />
  </div>
</template>

<style scoped>
.situs {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.situs > :deep(main) {
  flex: 1;
}
</style>
