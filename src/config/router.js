import { createWebHistory, createRouter } from "vue-router";
import login from "../components/Login.vue";
import register from "../components/Register.vue";
import personal from "../components/Personal.vue";
import administer_info from "@/components/Administer_info";


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
    {
      path: "/personal",
      name: personal,
      component: personal,
    },
  {
    path: "/administer_info",
    name:administer_info,
    component: administer_info
  }
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
  } else if (!accessToken && (to.path !== "/login" && to.path !== "/register" && to.path !== "/personal")) {
    next("/login");
  } else {
    next();
  }
});

export default router;
