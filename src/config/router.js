import { createWebHistory, createRouter } from "vue-router";
import login from "../components/Login.vue";
import register from "../components/Register.vue";

const routes = [
  {
    path: "/login",
    name: "login",
    component: login,
  },
  {
    path: "/register",
    name: register,
    component: register,
  },
  //   {
  //     path: "/personal",
  //     name: Personal,
  //     component: Personal,
  //   },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const accessToken = window.sessionStorage.getItem("accessToken");
  if (accessToken) {
    if (Object.keys(from.query).length !== 0) {
      let redirect = from.query.redirect;
      if (to.path === redirect) {
        next();
      } else {
        next({ path: redirect });
      }
    }
  }

  if (accessToken && to.path !== "/login") {
    next();
  } else if (accessToken && to.path === "/login") {
    next({ path: from.fullPath });
  } else if (!accessToken && (to.path !== "/login" && to.path !== "/register")) {
    next("/login");
  } else {
    next();
  }
});

export default router;
