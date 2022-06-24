import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Oruga from '@oruga-ui/oruga-next'
import { bulmaConfig } from '@oruga-ui/theme-bulma'

import Default from './layouts/Default.vue'
import router from './router'

const app = createApp(Default);

app.use(Oruga, bulmaConfig);
app.use(createPinia())
app.use(router)

app.mount('#appVueThree')
