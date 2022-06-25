let routes= <any> [];
let routes_list= <any> {};

import List from '../pages/articles/List.vue'

routes_list = {
    path: '/articles',
    name: 'articles.index',
    component: List,
    props: true,
};

routes.push(routes_list);

export default routes;

