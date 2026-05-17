<script setup lang="ts">
import { inBrowser } from 'vitepress'
import { onBeforeUnmount, onMounted, ref } from 'vue'

const visible = ref(false)

const updateVisible = () => {
  if (!inBrowser) return
  visible.value = window.scrollY > 600
}

const backToTop = () => {
  if (!inBrowser) return
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  updateVisible()
  window.addEventListener('scroll', updateVisible, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateVisible)
})
</script>

<template>
  <button
    v-show="visible"
    class="back-to-top"
    type="button"
    aria-label="返回顶部"
    @click="backToTop"
  >
    ↑
  </button>
</template>
