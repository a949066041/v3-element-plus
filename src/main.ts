import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './router/before'
import store from './store'
import ElementPlus from 'element-plus/lib/index'
import 'element-plus/lib/theme-chalk/index.css'
import './assets/styles/reset.css'
import './assets/styles/base.scss'
import 'animate.css'
import locale from 'element-plus/lib/locale/lang/zh-cn'

createApp(App)
  .use(store)
  .use(router)
  .use(ElementPlus, { locale })
  .mount('#app')
