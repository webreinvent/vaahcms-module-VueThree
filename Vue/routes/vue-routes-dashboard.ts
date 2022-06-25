let routes= <any> [];
let routes_list= <any> {};

import Default from '../layouts/Default.vue';
import Dashboard from '../pages/dashboard/Dashboard.vue'

routes_list = {
    path: '/',
    component: Default,
    props: true,
    children: [
        {
            path: '/',
            name: 'dashboard',
            component: Dashboard,
            props: true,
        },

    ]
};

routes.push(routes_list);

export default routes;

