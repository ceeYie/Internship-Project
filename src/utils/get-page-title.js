import defaultSettings from '@/settings'

const title = defaultSettings.title || '医院数据监控平台'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
