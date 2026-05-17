<script setup lang="ts">
import { useRoute } from 'vitepress'

const route = useRoute()

const editUrl = () => {
  const path = route.path.replace(/^\//, '').replace(/\/$/, '/index')
  return `https://github.com/Jinfeng50/blog-notes/edit/main/docs/${path}.md`
}

const isArticlePage = () => route.path.startsWith('/notes/') && route.path !== '/notes/'
</script>

<template>
  <section v-if="isArticlePage()" class="article-actions">
    <div>
      <p>继续探索</p>
      <h2>这篇笔记有帮助吗？</h2>
    </div>
    <div class="article-action-links">
      <a href="/notes/">全部笔记</a>
      <a href="/tags">相关标签</a>
      <a :href="editUrl()" target="_blank" rel="noreferrer">编辑本文</a>
    </div>
  </section>
</template>
