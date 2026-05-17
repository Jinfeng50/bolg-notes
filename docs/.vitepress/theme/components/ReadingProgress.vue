<script setup lang="ts">
import { inBrowser, useRoute } from 'vitepress'
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'

const route = useRoute()
const progress = ref(0)

const updateProgress = () => {
  if (!inBrowser) return

  const scrollTop = window.scrollY
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
  progress.value = scrollHeight > 0 ? Math.min(100, (scrollTop / scrollHeight) * 100) : 0
}

onMounted(() => {
  updateProgress()
  window.addEventListener('scroll', updateProgress, { passive: true })
  window.addEventListener('resize', updateProgress)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateProgress)
  window.removeEventListener('resize', updateProgress)
})

watch(() => route.path, () => {
  progress.value = 0
  requestAnimationFrame(updateProgress)
})
</script>

<template>
  <div class="reading-progress" :style="{ width: `${progress}%` }" />
</template>
