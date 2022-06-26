let routes= [];
let routes_list= [];

import List from '../pages/articles/List.vue'
import Form from '../pages/articles/Form.vue'

routes_list = {
    path: '/articles',
    name: 'articles.index',
    component: List,
    props: true,
    children:[
        {
            path: 'form',
            name: 'articles.form',
            component: Form,
            props: true,
        }
    ]
};

routes.push(routes_list);

export default routes;

