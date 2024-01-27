import { createPinia } from 'pinia'
import type { OnCreateAppSync } from 'vike-vue/types'

export { installPinia }

const installPinia: OnCreateAppSync = (pageContext): ReturnType<OnCreateAppSync> => {
  const pinia = createPinia()
  pageContext.app.use(pinia)
  Object.assign(pageContext, { pinia })
}
