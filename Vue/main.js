import {createApp, markRaw, defineAsyncComponent} from 'vue';
import { createPinia, PiniaVuePlugin  } from 'pinia'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'


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



app.use(ElementPlus)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.mount('#appVueThree')
