import Cookie from "js-cookie";

export default {
  redirectIfAuthenthicated(to, from, next) {
    const token = Cookie.get("todolist_token");
    let n;
    if (token) {
      n = { name: "index" };
    }
    next(n);
  },
};
