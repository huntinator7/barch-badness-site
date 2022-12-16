import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

// import Home from "@/views/Home.vue";
import BarchBadnessRoutes from "./barchBadness";

Vue.use(VueRouter);

// const addPrefix = (prefix: string, routes: RouteConfig[]): RouteConfig[] => {
//   return routes.map((r) => ({ ...r, path: `/${prefix}${r.path}` }));
// };

const routes: RouteConfig[] = [
  {
    path: "/",
    name: "Home",
    component: () => import(/* webpackChunkName: "home" */ "../views/Home.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue"),
  },
  ...BarchBadnessRoutes,
];

const router = new VueRouter({
  routes,
});

// console.log(routes);

export default router;
