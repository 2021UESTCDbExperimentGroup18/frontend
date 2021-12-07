import { createApp } from "vue";
import App from "./App.vue";
import router from "./config/router";
import ElementPlus from "element-plus";
import "element-plus/lib/theme-chalk/index.css";
import "./assets/common.css";
import "./config/axios-init.js";

const app = createApp(App).use(router).use(ElementPlus);
app.mount("#app");
