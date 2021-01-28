<template>
  <div v-if="response.message">
    <h3>{{ response.message }}</h3>
  </div>
</template>

<script>
import messages from "../utils/messages";
export default {
  name: "VerifyEmail",
  data() {
    return {
      token: "",
      response: {
        color: "",
        message: "",
      },
    };
  },
  beforeRouteEnter(to, from, next) {
    if (!to?.query?.token) {
      // se nao existir o token na url redireciona para o login
      next({ name: "login" });
    }
    //se estiver tudo ok
    next();
  },
  created() {
    this.token = this.$route?.query?.token || "";
    this.verifyEmail();
  },
  methods: {
    // o segundo parâmetro é o payload, porem como só tem uma variavel pode-se fazer isso direto.
    verifyEmail() {
      this.$axios
        .post("v1/verify-email", { token: this.token })
        .then(() => {
          // this.response.color = "green"; nao estou me preocupando com supérfulos.
          this.response.message = "E-mail verificado com sucesso!";
        })
        .catch((e) => {
          const errorCode = e?.response?.data?.error || "ServerError";
          // this.response.color = "red";
          this.response.message = messages[errorCode];
        });
    },
  },
};
</script>

<style>
</style>