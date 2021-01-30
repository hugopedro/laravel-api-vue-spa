<template>
  <v-app id="inspire">
    <v-main class="back">
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Login - Todo</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-tooltip bottom
                  >>
                  <span>Source</span>
                </v-tooltip>
              </v-toolbar>
              <div v-if="response.message" class="response.color ml-10 mt-4">
                <h3 color="danger">{{ response.message }}</h3>
              </div>
              <v-card-text>
                <ValidationObserver
                  ref="loginForm"
                  tag="form"
                  @submit.prevent="login"
                >
                  <!-- observa o formulário -->
                  <v-form>
                    <ValidationProvider
                      v-slot="{ errors }"
                      rules="required|email"
                      name="E-mail"
                    >
                      <v-text-field
                        label="E-mail"
                        name="login"
                        prepend-icon="mdi-account"
                        type="text"
                        v-model="email"
                      >
                      </v-text-field>
                      <div class="pb-4" justify="center" v-if="!!errors[0]">
                        <span style="color: crimson">{{ errors[0] }}</span>
                      </div>
                    </ValidationProvider>
                    <ValidationProvider
                      v-slot="{ errors }"
                      rules="required"
                      name="Password"
                    >
                      <v-text-field
                        id="password"
                        label="Senha"
                        name="password"
                        prepend-icon="mdi-lock"
                        type="password"
                        v-model="password"
                      ></v-text-field>
                      <div class="pb-4" justify="center" v-if="!!errors[0]">
                        <span style="color: crimson">{{ errors[0] }}</span>
                      </div>
                    </ValidationProvider>
                  </v-form>
                </ValidationObserver>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-row justify="center mr-12">
                  <pagina-carregando v-if="loading" key="loading" />
                </v-row>
                <v-btn
                  color="primary"
                  v-model="loading"
                  @click.stop.prevent="login()"
                  >Login</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Cookie from "../service/cookie";
import PaginaCarregando from "../components/PaginaCarregando";
import messages from "../utils/messages";
import { ValidationObserver, ValidationProvider } from "vee-validate";
export default {
  components: {
    ValidationObserver,
    ValidationProvider,
    PaginaCarregando,
  },
  props: {
    source: String,
  },
  data() {
    return {
      email: "",
      password: "",
      response: {
        color: "",
        message: "",
      },
      loading: false,
    };
  },
  methods: {
    async login() {
      const validator = await this.$refs.loginForm.validate();
      if (!validator) {
        this.loading = false;
        return;
      }

      const payload = {
        email: this.email,
        password: this.password,
      };

      this.resetResponse();
      this.loading = true;
      this.$axios
        .post("v1/login", payload)
        .then((response) => {
          const token = `${response.data.token_type}${response.data.access_token}`;
          Cookie.setToken(token);
          this.$store.commit("user/STORE_USER", response.data.data);
        })
        .catch((e) => {
          const errorCode = e?.response?.data?.error || "ServerError";
          this.response.color = "red";
          this.response.message = messages[errorCode];
          this.loading = false;
        });
    },
    resetResponse() {
      this.response.message = "";
    },
  },
};
</script>

<style scoped>
.back {
  background-image: url(../assets/background.png);
  background-size: cover;
}
</style>
