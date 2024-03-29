import {RouteMethods} from '../types';
import getRelationsRoute from './getRelationsRoute';
import insertOrganizationRoute from './insertOrganizationRoute';

const routes = [
  insertOrganizationRoute,
  getRelationsRoute,
];

export default (app) => {
  routes.forEach((route) => {
    if (route.method === RouteMethods.GET) {
      app.get(route.name, route.middlewares);
    } else if (route.method === RouteMethods.POST) {
      app.post(route.name, route.middlewares);
    }
  });
};
