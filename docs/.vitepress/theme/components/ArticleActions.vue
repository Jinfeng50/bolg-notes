<script setup lang="ts">
import { inBrowser, useRoute } from 'vitepress'
import { ref } from 'vue'

const route = useRoute()
const copied = ref(false)

const editUrl = () => {
  const path = route.path.replace(/^\//, '').replace(/\/$/, '/index')
  return `https://github.com/Jinfeng50/blog-notes/edit/main/docs/${path}.md`
}

const isArticlePage = () => route.path.startsWith('/notes/') && route.path !== '/notes/'

const relatedPosts = () => [
  { title: 'Git 工作流笔记', link: '/notes/git', desc: '版本控制与协作命令' },
  { title: 'Linux 排障笔记', link: '/notes/linux', desc: '端口、进程和命令行' },
  { title: 'AI 学习记录', link: '/notes/ai', desc: '模型能力和提示词实践' }
].filter((post) => post.link !== route.path).slice(0, 2)

const copyLink = async () => {
  if (!inBrowser) return

  await navigator.clipboard?.writeText(window.location.href)
  copied.value = true
  window.setTimeout(() => {
    copied.value = false
  }, 1600)
}
</script>

<template>
  <section v-if="isArticlePage()" class="article-actions">
    <div class="article-actions-head">
      <div>
        <p>继续探索</p>
        <h2>这篇笔记有帮助吗？</h2>
      </div>
      <div class="article-action-links">
        <button type="button" @click="copyLink">
          {{ copied ? '已复制' : '复制链接' }}
        </button>
        <a href="/notes/">全部笔记</a>
        <a href="/tags">相关标签</a>
        <a :href="editUrl()" target="_blank" rel="noreferrer">编辑本文</a>
      </div>
    </div>

    <div class="related-posts">
      <a v-for="post in relatedPosts()" :key="post.link" :href="post.link">
        <span>{{ post.title }}</span>
        <small>{{ post.desc }}</small>
      </a>
    </div>
  </section>
</template>
