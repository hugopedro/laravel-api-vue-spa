import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import VerifyEmail from "../views/VerifyEmail.vue";
import ForgotPassword from "../views/ForgotPassword.vue";
import ResetPassword from "../views/ResetPassword.vue";
import Home from "../views/Home.vue";
import Guard from "../service/middleware.js";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "index",
    component: Home,
  },
  {
    path: "/login",
    beforeEnter: Guard.redirectIfAuthenthicated,
    name: "login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/verificar-email",
    name: "VerifyEmail",
    component: VerifyEmail,
  },
  {
    path: "/esqueci-senha",
    name: "forgotPassword",
    component: ForgotPassword,
  },
  {
    path: "/resetar-senha",
    name: "resetPassword",
    component: ResetPassword,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
