import axios from "axios";

axios.defaults.baseURL =
  env === "development"
    ? "/api"
    : window.location.protocol + "//" + window.location.host; // 配置axios请求的地址
axios.defaults.headers.post["Content-Type"] = "application/json; charset=utf-8";
axios.defaults.crossDomain = true;
axios.defaults.withCredentials = true; //设置cross跨域 并设置访问权限 允许跨域携带cookie信息

// http request 拦截器
axios.interceptors.request.use(
  (config) => {
    if (sessionStorage.getItem("accessToken")) {
      config.headers.Authorization = sessionStorage.getItem("accessToken");
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

// http response 拦截器
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      console.log("axios:" + error.response.status);
      switch (error.response.status) {
        case 403: // 返回403 清除token信息并跳转到登录页面
          sessionStorage.clear();
          router.replace({
            path: "/login",
            query: { redirect: router.currentRoute.fullPath }, // 重新登录后，返回之前的页面
          });
          Message({
            showClose: true,
            message: "未登录，返回登陆界面",
            type: "error",
            duration: 3000,
          });
      }
    }
    return Promise.reject(error); // 返回接口的错误信息
  }
);
