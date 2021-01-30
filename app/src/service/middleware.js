import Cookie from "../service/cookie";
import axios from "axios";
import store from "../store";

export default {
  async redirectIfNotAuthenticated(to, from, next) {
    const token = Cookie.getToken();
    if (!token) {
      next({ name: "login" });
    }

    // Checar se o token está valido, afinal o usuario pode editar o token e ir na pagina protegida.
    // 'v1/me'
    await axios
      .get("v1/me")
      .then((response) => {
        if (!store?.state?.user?.id) {
          // garante que só vai ler se valer a pena, evita requisicao desnecessaria
          store.commit("user/STORE_USER", response.data.data); // user/ pois lá tem o namespace user
        }
      })
      .catch(() => {
        Cookie.deleteToken();
        next({ name: "login" });
      });

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
