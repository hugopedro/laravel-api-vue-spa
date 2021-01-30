<template>
  <v-app id="inspire">
    <v-main class="back">
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Recuperar Senha</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-tooltip bottom>
                  <span>Source</span>
                </v-tooltip>
              </v-toolbar>
              <div v-if="response.message" class="response.color ml-10 mt-4">
                <h3 color="danger">{{ response.message }}</h3>
              </div>
              <v-card-text>
                <ValidationObserver
                  ref="resetPasswordForm"
                  tag="form"
                  @submit.prevent="resetPassword()"
                >
                  <v-form>
                    <ValidationProvider
                      v-slot="{ errors }"
                      rules="required|email"
                      name="E-mail"
                    >
                      <v-text-field
                        label="E-mail"
                        name="email"
                        prepend-icon="mdi-account"
                        type="text"
                        placeholder="Digite seu E-mail"
                        v-model="email"
                      ></v-text-field>
                      <div class="pb-4" justify="center" v-if="!!errors[0]">
                        <span style="color: crimson">{{ errors[0] }}</span>
                      </div>
                    </ValidationProvider>
                    <ValidationProvider
                      v-slot="{ errors }"
                      :rules="{
                        required: true,
                        regex: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/,
                      }"
                      name="Senha"
                    >
                      <v-text-field
                        label="Senha"
                        name="password"
                        prepend-icon="mdi-account"
                        type="text"
                        placeholder="Digite sua Senha"
                        v-model="password"
                      ></v-text-field>
                      <div class="pb-4" justify="center" v-if="!!errors[0]">
                        <span style="color: crimson">{{ errors[0] }}</span>
                      </div>
                    </ValidationProvider>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        type="submit"
                        color="primary"
                        @click.stop.prevent="resetPassword()"
                        >Alterar Senha</v-btn
                      >
                    </v-card-actions>
                  </v-form>
                </ValidationObserver>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";
import messages from "../utils/messages";

export default {
  name: "ResetPassword",
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  data() {
    return {
      submitted: false,
      successful: false,
      message: "",
      email: "",
      token: "",
      password: "",
      response: {
        color: "",
        message: "",
      },
    };
  },
  methods: {
    async resetPassword() {
      const validator = await this.$refs.resetPasswordForm.validate();
      if (!validator) {
        return;
      }

      this.resetResponse();

      const payload = {
        email: this.email,
        password: this.password,
        token: this.token,
      };

      this.$axios
        .post("v1/reset-password", payload)
        .then(() => {
          this.response.color = "green";
          this.response.message = "Senha alterada com sucesso";
          this.resetForm();
        })
        .catch((e) => {
          const errorCode = e?.response?.data?.error || "ServerError";
          this.response.color = "red";
          this.response.message = messages[errorCode];
        });
    },
    resetResponse() {
      this.response.message = "";
    },
    resetForm() {
      this.$refs.resetPasswordForm.reset();
      this.email = "";
      this.password = "";
      this.token = "";
    },
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
  },
};
</script>

<style scoped>
.back {
  background-image: url(../assets/register.jpg);
  background-size: cover;
}
</style>