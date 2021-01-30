import Cookie from "../service/cookie";

export default {
  redirectIfNotAuthenticated(to, from, next) {
    const token = Cookie.getToken();
    if (!token) {
      next({ name: "login" });
    }

    // Checar se o token está valido
    // 'v1/me'

    next();
  },
  redirectIfAuthenticated(to, from, next) {
    const token = Cookie.getToken();
    let n;
    if (token) {
      n = { name: "index" };
    }
    next(n);
  },
};
