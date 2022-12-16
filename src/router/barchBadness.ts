import { RouteConfig } from "vue-router";
import BarchBadness from "@/views/BarchBadness/BarchBadness.vue";

const routes: RouteConfig[] = [
  {
    path: "/barchbadness",
    component: BarchBadness,
    children: [
      {
        path: "",
        name: "Overview",
        component: () =>
          import(
            /* webpackChunkName: "bboverview" */ "../views/BarchBadness/Overview.vue"
          ),
      },
      {
        path: "day/:day",
        name: "Day",
        component: () =>
          import(
            /* webpackChunkName: "bbday" */ "../views/BarchBadness/Day.vue"
          ),
      },
      {
        path: "days",
        name: "Days",
        component: () =>
          import(
            /* webpackChunkName: "bbdays" */ "../views/BarchBadness/Days.vue"
          ),
      },
      {
        path: "winners",
        name: "Winners",
        component: () =>
          import(
            /* webpackChunkName: "bbwinners" */ "../views/BarchBadness/Winners.vue"
          ),
      },
    ],
  },
];

export default routes;
