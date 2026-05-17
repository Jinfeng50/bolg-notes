<script setup lang="ts">
import { useData, useRoute } from 'vitepress'

const route = useRoute()
const { page } = useData()
const now = new Date()
const year = now.getFullYear()
const month = now.getMonth()
const today = now.getDate()

const monthLabel = new Intl.DateTimeFormat('zh-CN', {
  month: 'long',
  year: 'numeric'
}).format(now)

const firstDay = new Date(year, month, 1).getDay()
const daysInMonth = new Date(year, month + 1, 0).getDate()
const calendarDays = [
  ...Array.from({ length: firstDay }, () => ''),
  ...Array.from({ length: daysInMonth }, (_, index) => String(index + 1))
]

const popularPosts = [
  { text: 'Linux 排障笔记', link: '/notes/linux' },
  { text: 'Git 工作流笔记', link: '/notes/git' },
  { text: 'AI 学习记录', link: '/notes/ai' },
  { text: '项目实践整理', link: '/projects' },
  { text: '全部笔记索引', link: '/notes/' }
]

const issueUrl = () => {
  const issueTitle = encodeURIComponent(route.path)
  return `https://github.com/Jinfeng50/blog-notes/issues?q=${issueTitle}`
}
</script>

<template>
  <div class="aside-widgets">
    <section class="aside-widget">
      <h3>热门文章</h3>
      <a
        v-for="item in popularPosts"
        :key="item.link"
        class="aside-link"
        :href="item.link"
      >
        <span>{{ item.text }}</span>
      </a>
    </section>

    <section class="aside-widget">
      <h3>本文评论</h3>
      <a class="aside-link" :href="issueUrl()" target="_blank" rel="noreferrer">
        查看《{{ page.title }}》的讨论
      </a>
    </section>

    <section class="aside-widget">
      <h3>{{ monthLabel }}</h3>
      <div class="calendar-grid calendar-weekdays">
        <span v-for="day in ['日', '一', '二', '三', '四', '五', '六']" :key="day">{{ day }}</span>
      </div>
      <div class="calendar-grid">
        <span
          v-for="(day, index) in calendarDays"
          :key="`${day}-${index}`"
          :class="{ today: Number(day) === today }"
        >
          {{ day }}
        </span>
      </div>
    </section>
  </div>
</template>
