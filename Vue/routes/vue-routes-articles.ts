let routes= <any> [];
let routes_list= <any> {};

import Default from '../layouts/Default.vue';
import List from '../pages/articles/List.vue'

routes_list = {
    path: '/articles',
    component: Default,
    props: true,
    children: [
        {
            path: '/',
            name: 'articles.index',
            component: List,
            props: true,
        },

    ]
};

routes.push(routes_list);

export default routes;

