import axios from "axios";
import Vue from "vue";
import Cookie from "../service/cookie";

axios.defaults.baseURL = "http://127.0.0.1:8000/api/";
// no mundo real vem do .env
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Accept"] = "application/json";

axios.interceptors.request.use(function(config) {
  const token = Cookie.getToken();

  if (token) {
    config.headers.common["Authorization"] = token;
  }

  return config; // atualiza as configs do axios.
});
//Prototype depois de tudo se não ele não atualiza.
Vue.prototype.$axios = axios;
