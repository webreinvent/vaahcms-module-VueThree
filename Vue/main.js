import {createApp, markRaw, defineAsyncComponent} from 'vue';
import { createPinia, PiniaVuePlugin  } from 'pinia'

import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/bootstrap4-light-blue/theme.css';
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


//----------PrimeVue
app.use(PrimeVue);

import Toolbar from 'primevue/toolbar';
import Button from 'primevue/button';
import SplitButton from 'primevue/splitbutton';
import Panel from 'primevue/panel';
import Badge from 'primevue/badge';
import Paginator from 'primevue/paginator';
import Divider from 'primevue/divider';
import Dropdown from 'primevue/dropdown';
import DataTable from 'primevue/datatable';
import Column from 'primevue/Column';


app.component('Toolbar', Toolbar);
app.component('Button', Button);
app.component('SplitButton', SplitButton);
app.component('Panel', Panel);
app.component('Badge', Badge);
app.component('Paginator', Paginator);
app.component('Divider', Divider);
app.component('Dropdown', Dropdown);
app.component('DataTable', DataTable);
app.component('Column', Column);


//----------/PrimeVue




app.mount('#appVueThree')
