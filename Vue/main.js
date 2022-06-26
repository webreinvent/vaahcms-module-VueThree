import {createApp, markRaw} from 'vue';
import { createPinia } from 'pinia'
import Oruga from '@oruga-ui/oruga-next'

import { bulmaConfig } from '@oruga-ui/theme-bulma'



import App from './layouts/App.vue'
import routerConfig from './routes/config'

const app = createApp(App);

const pinia = createPinia();
pinia.use(({ store }) => {
    store.$router = markRaw(routerConfig)
});


app.use(pinia);
app.use(routerConfig);

const orugaConfig = {
    iconPack: 'fas',
    ...bulmaConfig
}



app.use(Oruga, orugaConfig);





import vaah from './vaahvue/vue-three/vaah';
app.use(vaah);

app.mount('#appVueThree')
