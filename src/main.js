import '@/assets/css/main.css'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { createPinia } from 'pinia'

const app = createApp(App)

app.use(Toast)
app.use(router)
app.use(createPinia())

app.mount('#app')
