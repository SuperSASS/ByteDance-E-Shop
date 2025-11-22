import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// 暂时把翻译写在这里，以后会提取到 json 文件
const resources = {
  en: {
    translation: {
      welcome: 'Hello World!',
      count: 'Count is {{anb}}',
      'switch-language': 'Switch to Chinese',
    },
  },
  zh: {
    translation: {
      welcome: '你好，世界！',
      count: '当前计数：{{anb}}',
      'switch-language': '切换到英文',
    },
  },
}

i18n
  .use(LanguageDetector) // 自动检测浏览器语言
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React 已经防范了 XSS，所以这里不需要
    },
  })

export default i18n
