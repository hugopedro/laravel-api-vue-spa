<template>
  <v-app id="inspire">
    <v-main class="back">
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Registrar</v-toolbar-title>
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
                  ref="registerForm"
                  tag="form"
                  @submit.prevent="register()"
                >
                  <v-form>
                    <ValidationProvider
                      v-slot="{ errors }"
                      rules="required"
                      name="Primeiro Nome"
                    >
                      <v-text-field
                        label="Nome"
                        name="FirstName"
                        prepend-icon="mdi-account"
                        type="text"
                        v-model="firstName"
                      ></v-text-field>
                      <div class="pb-4" justify="center" v-if="!!errors[0]">
                        <span style="color: crimson">{{ errors[0] }}</span>
                      </div>
                    </ValidationProvider>
                    <v-text-field
                      label="Sobrenome"
                      name="Sobrenome"
                      prepend-icon="mdi-account"
                      type="text"
                      v-model="lastName"
                    ></v-text-field>
                    <ValidationProvider
                      v-slot="{ errors }"
                      rules="required"
                      name="E-mail"
                    >
                      <v-text-field
                        label="E-mail"
                        name="email"
                        prepend-icon="mdi-account"
                        type="text"
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
                        prepend-icon="mdi-lock"
                        type="password"
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
                        @click.stop.prevent="register()"
                        >Registrar</v-btn
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
  name: "Register",
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  data() {
    return {
      submitted: false,
      successful: false,
      message: "",
      FirstName: "",
      LastName: "",
      email: "",
      password: "",
      response: {
        color: "",
        message: "",
      },
    };
  },
  methods: {
    async register() {
      const validator = await this.$refs.registerForm.validate();

      if (!validator) {
        return;
      }

      const payload = {
        first_name: this.firstName,
        last_name: this.lastName,
        email: this.email,
        password: this.password,
      };

      this.$axios
        .post("v1/register", payload)
        .then(() => {
          this.response.color = "green";
          this.response.message = "Seu cadastro foi feito com sucesso.";
        })
        .catch((e) => {
          const errorCode = e?.response?.data?.error || "ServerError";
          this.response.color = "red";
          this.response.message = messages[errorCode];
        });
    },
  },
};
</script>

<style scoped>
.back {
  background-image: url(../assets/register.jpg);
  background-size: cover;
}
</style>