<script setup lang="ts">
const now = new Date()
const year = now.getFullYear()
const month = now.getMonth()
const today = now.getDate()

const monthLabel = new Intl.DateTimeFormat('en', {
  month: 'long',
  year: 'numeric'
}).format(now)

const firstDay = new Date(year, month, 1).getDay()
const daysInMonth = new Date(year, month + 1, 0).getDate()
const calendarDays = [
  ...Array.from({ length: firstDay }, () => ''),
  ...Array.from({ length: daysInMonth }, (_, index) => String(index + 1))
]

const popularComments = [
  { text: 'Git workflow notes', link: '/notes/git' },
  { text: 'Linux commands', link: '/notes/linux' },
  { text: 'AI learning log', link: '/notes/ai' }
]
</script>

<template>
  <div class="aside-widgets">
    <section class="aside-widget">
      <h3>Hot Discussions</h3>
      <a
        v-for="item in popularComments"
        :key="item.link"
        class="hot-comment"
        :href="item.link"
      >
        <span>{{ item.text }}</span>
      </a>
    </section>

    <section class="aside-widget">
      <h3>{{ monthLabel }}</h3>
      <div class="calendar-grid calendar-weekdays">
        <span v-for="day in ['S', 'M', 'T', 'W', 'T', 'F', 'S']" :key="day">{{ day }}</span>
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
