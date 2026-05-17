import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import ArticleMeta from './components/ArticleMeta.vue'
import AsideWidgets from './components/AsideWidgets.vue'
import Comments from './components/Comments.vue'
import ReadingProgress from './components/ReadingProgress.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('ArticleMeta', ArticleMeta)
    app.component('AsideWidgets', AsideWidgets)
    app.component('Comments', Comments)
    app.component('ReadingProgress', ReadingProgress)
  },
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'layout-top': () => h(ReadingProgress),
      'doc-before': () => h(ArticleMeta),
      'aside-outline-after': () => h(AsideWidgets),
      'doc-after': () => h(Comments)
    })
  }
}
