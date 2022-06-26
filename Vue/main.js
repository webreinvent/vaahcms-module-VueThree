import {createApp} from 'vue';
import { createPinia } from 'pinia'
import Oruga from '@oruga-ui/oruga-next'

import { bulmaConfig } from '@oruga-ui/theme-bulma'



import App from './layouts/App.vue'
import routerConfig from './routes/config'

const app = createApp(App);



const orugaConfig = {
    iconPack: 'fas',
    ...bulmaConfig
}



app.use(Oruga, orugaConfig);
app.use(createPinia());
app.use(routerConfig);


import vaah from './vaahvue/vue-three/vaah';
app.use(vaah);

app.mount('#appVueThree')
