let routes= <any> [];

import dashboard from "./vue-routes-dashboard";
import articles from "./vue-routes-articles";


routes = routes.concat(dashboard);
routes = routes.concat(articles);

console.log('--->', routes);

export default routes;
