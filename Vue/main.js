import {createApp, markRaw, defineAsyncComponent} from 'vue';
import { createPinia, PiniaVuePlugin  } from 'pinia'

import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';


import App from './layouts/App.vue'
import router from './routes/router'


const app = createApp(App);

const pinia = createPinia();
pinia.use(({ store }) => {
    store.$router = markRaw(router)
});


app.use(pinia);
app.use(PiniaVuePlugin);
app.use(router);


app.use(PrimeVue);

app.mount('#appVueThree')
