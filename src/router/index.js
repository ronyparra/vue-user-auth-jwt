import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "Login" */ "../views/Login.vue"),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/recovery",
    name: "Recovery",
    component: () =>
      import(/* webpackChunkName: "Recovery" */ "../views/Recovery.vue"),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/",
    component: () =>
      import(/* webpackChunkName: "Dashboard" */ "../views/Dashboard.vue"),
    meta: {
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters["auth/isLogin"];
  if (to.path === "/login" && isAuthenticated) return next("/");
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (isAuthenticated) {
      return next();
    }
    return next("/login");
  }
  next();
});

export default router;
