import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import VerifyEmail from "../views/VerifyEmail.vue";
import ForgotPassword from "../views/ForgotPassword.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
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
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
