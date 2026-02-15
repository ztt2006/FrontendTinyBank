import axios from "axios";
import store from "@/stores";
import { increaseLoading, decreaseLoading } from "@/stores/loading";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";
const request = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  withCredentials: true,
});

// 添加请求拦截器
request.interceptors.request.use(
  function (config) {
    store.dispatch(increaseLoading());
    return config;
  },
  function (error) {
    store.dispatch(decreaseLoading());
    return Promise.reject(error);
  },
);

// 添加响应拦截器
request.interceptors.response.use(
  function (response) {
    store.dispatch(decreaseLoading());
    const { data } = response;

    if (data.code === 40100) {
      if (
        !response.request.responseURL.includes("user/get/login") &&
        !window.location.pathname.includes("/user/login")
      ) {
        window.location.href = `/user/login?redirect=${window.location.href}`;
      }
    } else if (data.code !== 0) {
      throw new Error(data.message ?? "服务器错误");
    }
    return data;
  },
  function (error) {
    store.dispatch(decreaseLoading());
    return Promise.reject(error);
  },
);

export default request;
