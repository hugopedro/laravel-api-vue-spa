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
                <v-form>
                  <v-text-field
                    label="E-mail"
                    name="login"
                    prepend-icon="mdi-account"
                    type="text"
                    v-model="email"
                  ></v-text-field>
                  <v-text-field
                    id="password"
                    label="Senha"
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password"
                    v-model="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click.stop.prevent="login()"
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
import Cookie from "js-cookie";
export default {
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
    login() {
      const payload = {
        email: this.email,
        password: this.password,
      };

      this.$axios.post("v1/login", payload).then((response) => {
        const token = `${response.data.token_type}${response.data.access_token}`;
        Cookie.set("todolist_token", token, { expires: 30 });
      });
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
