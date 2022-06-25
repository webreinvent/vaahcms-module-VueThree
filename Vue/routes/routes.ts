let routes= <any> [];

import articles from "./vue-routes-articles";
import dashboard from "./vue-routes-dashboard";


routes = routes.concat(dashboard);
routes = routes.concat(articles);

console.log('--->', routes);

export default routes;
