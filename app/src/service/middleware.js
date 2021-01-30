import Cookie from "js-cookie";

export default {
  redirectIfNotAuthenticated(to, from, next) {
    const token = Cookie.get("todolist_token");
    if (!token) {
      next({ name: "login" });
    }

    // Checar se o token está valido
    // 'v1/me'

    next();
  },
  redirectIfAuthenticated(to, from, next) {
    const token = Cookie.get("todolist_token");
    let n;
    if (token) {
      n = { name: "index" };
    }
    next(n);
  },
};
