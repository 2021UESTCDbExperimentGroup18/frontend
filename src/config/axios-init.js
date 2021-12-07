import axios from "axios";
import router from "./router.js";

let protocol = window.location.protocol; //协议
   let host = window.location.host; //主机
   let reg = /^localhost+/;
   if(reg.test(host)) {
      //若本地项目调试使用
       axios.defaults.baseURL = 'http://localhost:5000/api';
   } else {
       //动态请求地址             协议               主机
       axios.defaults.baseURL = protocol + "//" + host  +"/api";
   }
axios.defaults.headers.post["Content-Type"] = "application/json; charset=utf-8";
axios.defaults.crossDomain = true;
axios.defaults.withCredentials = true; //设置cross跨域 并设置访问权限 允许跨域携带cookie信息

// http request 拦截器
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

// http response 拦截器
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      console.log("axios:" + error.response.status);
      switch (error.response.status) {
        case 403: // 返回403 清除token信息并跳转到登录页面
          sessionStorage.clear();
          router.replace({
            path: "/login",
            query: { redirect: router.currentRoute.fullPath }, // 重新登录后，返回之前的页面
          });
          return ({
            showClose: true,
            message: "未登录，返回登陆界面",
            type: "error",
            duration: 3000,
          });
      }
    }
    return Promise.reject(error); // 返回接口的错误信息
  }
);
