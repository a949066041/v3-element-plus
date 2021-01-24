import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './router/before'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import './assets/styles/reset.css'
import 'animate.css'
import locale from 'element-plus/lib/locale/lang/zh-cn'

createApp(App)
  .use(store)
  .use(router)
  .use(ElementPlus, { size: 'small', locale })
  .mount('#app')
