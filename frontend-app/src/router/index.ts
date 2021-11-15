import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "dashboard",
    component: () =>
      import(/* webpackChunkName: "dashboard" */ "../views/dashboard.vue"),
  },
  {
    path: "/questions",
    name: "questions",
    component: () =>
      import(/* webpackChunkName: "questions" */ "../views/questions.vue"),
  },
  {
    path: "/questions/add",
    name: "add-question",
    component: () =>
      import(
        /* webpackChunkName: "add-question" */ "../views/add-question.vue"
      ),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
