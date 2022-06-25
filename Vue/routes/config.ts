import { createRouter,  createWebHashHistory  } from 'vue-router'
var qs = require('qs');


import routes from "./routes";

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
    parseQuery(query) {
        return qs.parse(query);
    },
    stringifyQuery(query) {
        let result = qs.stringify(query,
            {
                arrayFormat: 'brackets',
                encode: false,
                skipNulls: true
            });
        return result ? ('?' + result) : '';
    }
})

export default router
