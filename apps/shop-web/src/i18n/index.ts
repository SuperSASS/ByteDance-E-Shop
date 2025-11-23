import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import config from './config.json'

// TODO: 暂时把翻译写在这里，以后会提取到 json 文件
const resources = {
  [config.languages[0].code]: {
    translation: {
      welcome: '你好，世界！',
      count: '当前计数：{{anb}}',
      switchLanguage: '切换到英文',
    },
    header: {
      title: '轻舟商城',
      home: '首页',
      products: '商品',
      orders: '订单',
      search: '搜索',
    },
    login: {
      welcome: '欢迎回来！',
      description: '登录以开始您的购物之旅。',
      forgotPassword: '忘记密码？',
      login: '登录',
      oauth: '或者使用',
      oauths: {
        apple: 'Apple',
        google: 'Google',
      },
      noAccount: '没有账号？',
      signUp: '立刻注册！',
      serviceAgreement: '点击继续，表示您同意我们的服务协议和隐私政策。',
    },
    user: {
      profile: '个人中心',
      settings: '设置',
      logout: '退出登录',
      notification: {
        title: '通知',
        unread: '{{count}}条未读',
        viewAll: '查看全部',
        noNotifications: '没有通知',
      },
    },
    settings: {
      toggleTheme: '切换主题',
    },
  },
  [config.languages[1].code]: {
    translation: {
      welcome: 'Hello World!',
      count: 'Count is {{anb}}',
      switchLanguage: 'Switch to Chinese',
    },
    header: {
      title: 'CockleBoat Store',
      home: 'Home',
      products: 'Products',
      orders: 'Orders',
      search: 'Search',
    },
    login: {
      welcome: 'Welcome back!',
      description: 'Login to start your shopping journey.',
      forgotPassword: 'Forgot password?',
      login: 'Login',
      oauth: 'Or use',
      oauths: {
        apple: 'Apple',
        google: 'Google',
      },
      noAccount: "Don't have an account?",
      signUp: 'Sign up now!',
      // TODO: 这里怎么实现超链接
      serviceAgreement:
        'By clicking continue, you agree to our Terms of Service and Privacy Policy.',
    },
    user: {
      profile: 'Profile',
      settings: 'Settings',
      logout: 'Logout',
      notification: {
        title: 'Notification',
        unread: '{{count}} unread',
        viewAll: 'View All',
        noNotifications: 'No notifications',
      },
    },
    settings: {
      toggleTheme: 'Toggle Theme',
    },
  },
}

i18n
  .use(LanguageDetector) // 自动检测浏览器语言
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: config.fallbackLng,
    interpolation: {
      escapeValue: false, // React 已经防范了 XSS，所以这里不需要
    },
  })

export default i18n
