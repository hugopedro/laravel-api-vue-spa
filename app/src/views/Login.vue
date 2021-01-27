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
              <v-card-text>
                <ValidationObserver
                  ref="loginForm"
                  tag="form"
                  @submit.stop.prevent="login"
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
                <v-btn color="primary" type="submit">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
// import Cookie from "js-cookie";
import { ValidationObserver, ValidationProvider } from "vee-validate";
export default {
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  props: {
    source: String,
  },
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async login() {
      const validator = await this.$refs.loginForm.validate();
      if (!validator) {
        return;
      }
      console.log("Login");
      return;
      /*
      const payload = {
        email: this.email,
        password: this.password,
      };

      this.$axios.post("v1/login", payload).then((response) => {
        const token = `${response.data.token_type}${response.data.access_token}`;
        Cookie.set("todolist_token", token, { expires: 30 });
        this.$store.commit("user/STORE_USER", response.data.data);
      }); */
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
