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
                    v-model="newTodo"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-btn
                    color="success"
                    class="mb-7"
                    @click.stop.prevent="createTodo()"
                  >
                    Adicionar
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-col>
        </v-row>
        <v-row justify="center mr-12">
          <pagina-carregando v-if="loading" key="loading" />
        </v-row>
        <todo-card v-for="todo in todos" :key="todo.id" :todo="todo" />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "../components/Navbar";
import PaginaCarregando from "../components/PaginaCarregando.vue";
import TodoCard from "../components/Todos/TodoCard.vue";

export default {
  name: "Home",

  components: { Navbar, PaginaCarregando, TodoCard, TodoCard },

  data() {
    return {
      todos: [],
      loading: false,
      newTodo: "",
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
          this.todos = response.data.data.map((o) => ({
            ...o,
            state: "show",
          }));
        })
        .finally(() => {
          this.loading = false;
        });
    },
    createTodo() {
      if (!this.newTodo) {
        // faz com que nao permita mandar ao backend todo vazia, daí poupa o backend
        return;
      }
      const payload = {
        // primeira coisa é criar o payload
        label: this.newTodo,
      };
      this.$axios.post("v1/todos", payload).then((response) => {
        this.todos.unshift(response.data.data); // se tiver sucesso adiciona a todo na lista de todos
        this.newTodo = ""; // limpa o todo e unshift faz com que o item adicionado fique no topo da lista
      });
    },
    updateTodo(todo) {
      const payload = {
        label: todo.label,
      };
      this.$axios.put(`v1/todos/${todo.id}`, payload);
    },
    destroyTodo(todo) {
      this.$axios.delete(`v1/todos/${todo.id}`).then(() => {
        const idx = this.todos.findIndex((o) => o.id === todo.id);
        this.todos.splice(idx, 1);
      });
    },
  },
};
</script>

<style>
</style>