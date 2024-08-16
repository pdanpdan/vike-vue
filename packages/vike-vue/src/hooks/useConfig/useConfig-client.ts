export { useConfig }

import type { PageContext } from 'vike/types'
import type { PageContextInternal } from '../../types/PageContext.js'
import type { ConfigFromHook } from '../../types/Config.js'
import { usePageContext } from '../usePageContext.js'
import { getPageContext } from 'vike/getPageContext'
import { applyHeadSettings } from '../../renderer/applyHeadSettings.js'
import { watchEffect } from 'vue'

function useConfig(): (config: ConfigFromHook) => void {
  // Vike hook
  let pageContext = getPageContext() as PageContext & PageContextInternal
  if (pageContext) return (config: ConfigFromHook) => setPageContextConfigFromHook(config, pageContext)

  // Component
  pageContext = usePageContext()
  return (config: ConfigFromHook) => {
    watchEffect(() => {
      if (!pageContext._headAlreadySetWrapper!.val) {
        setPageContextConfigFromHook(config, pageContext)
      } else {
        applyHead(config)
      }
    })
  }
}

function setPageContextConfigFromHook(config: ConfigFromHook, pageContext: PageContextInternal) {
  pageContext._configFromHook ??= {}
  Object.assign(pageContext._configFromHook, config)
}

function applyHead(config: ConfigFromHook) {
  const { title, lang } = config
  applyHeadSettings(title, lang)
}
