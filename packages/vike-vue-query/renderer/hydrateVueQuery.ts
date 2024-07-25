import { hydrate } from '@tanstack/vue-query'
import type { OnBeforeRenderClientSync } from 'vike-vue/types'

export { hydrateVueQuery }

const hydrateVueQuery: OnBeforeRenderClientSync = (pageContext): ReturnType<OnBeforeRenderClientSync> => {
  if (!pageContext.isHydration) {
    return
  }
  const { vueQueryInitialState } = pageContext.fromHtmlRenderer
  const { queryClient } = pageContext
  if (!queryClient || !vueQueryInitialState) {
    // happens if SSR is off
    return
  }
  hydrate(queryClient, vueQueryInitialState)
}
