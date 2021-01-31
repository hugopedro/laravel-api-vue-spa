<template>
  <v-app id="inspire">
    <v-main class="back">
      <v-container class="justify-center ma-0 pa-0" fluid>
        <navbar />
        <v-row justify="center" class="mt-16">
          <h1 class="font-weight-light">Lista de tarefas</h1>
        </v-row>
        <v-row justify="center" class="mt-16" fluid>
          <v-col cols="6" justify="center" align="center">
            <v-form justify="center" align="center">
              <v-row justify="center" align="center">
                <v-col cols="6" justify="center" align="center">
                  <v-text-field
                    label="Digite o nome da sua lista"
                    outlined
                    type="text"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-btn color="success" class="mb-7"> Adicionar </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-col>
        </v-row>
        <v-row justify="center mr-12">
          <pagina-carregando v-if="loading" key="loading" />
        </v-row>
        <v-row justify="center" align="center" class="pb-4">
          <v-card class="mx-auto" tile>
            <v-list disabled>
              <v-list-item-group color="primary">
                <v-list-item v-for="todo in todos" :key="todo.id">
                  <v-list-item-content>
                    <v-list-item-title v-text="todo.label"></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "../components/Navbar";
import PaginaCarregando from "../components/PaginaCarregando.vue";

export default {
  name: "Home",

  components: { Navbar, PaginaCarregando },

  data() {
    return {
      todos: [],
      loading: false,
    };
  },

  created() {
    this.getTodos();
  },

  methods: {
    getTodos() {
      this.loading = true;
      this.$axios
        .get("v1/todos")
        .then((response) => {
          this.todos = response.data.data;
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>

<style>
</style>