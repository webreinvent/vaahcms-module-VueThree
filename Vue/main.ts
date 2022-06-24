import { createApp } from 'vue'
import { createPinia } from 'pinia'

import Default from './layouts/Default.vue'
import router from './router'

const app = createApp(Default)

app.use(createPinia())
app.use(router)

app.mount('#appVueThree')
