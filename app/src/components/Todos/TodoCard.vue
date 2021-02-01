<template>
  <v-row justify="center" align="center" class="pb-4">
    <v-row v-if="isShowing" class="ml-12">
      {{ todo.label }} - {{ todo.state }} <br />
      <v-btn
        color="success"
        class="mb-7"
        @click.stop.prevent="changeStateToUpdate()"
      >
        Editar
      </v-btn>
      <v-btn
        color="success"
        class="mb-7"
        @click.stop.prevent="changeStateToDelete()"
      >
        Deletar
      </v-btn>
    </v-row>
    <v-row v-if="isUpdating" class="ml-12">
      Updating - {{ todo.state }} <br />
      <v-btn
        color="success"
        class="mb-7"
        @click.stop.prevent="changeStateToShow()"
      >
        Cancelar
      </v-btn></v-row
    >
    <v-row v-if="isDeleting" class="ml-12">
      Deleting - {{ todo.state }} <br />
      <v-btn
        color="success"
        class="mb-7"
        @click.stop.prevent="changeStateToShow()"
      >
        Cancelar
      </v-btn></v-row
    >
  </v-row>
</template>

<script>
export default {
  name: "Todocard",
  data() {
    return {};
  },
  props: {
    todo: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    isShowing() {
      return this.todo.state === "show";
    },
    isUpdating() {
      return this.todo.state === "update";
    },
    isDeleting() {
      return this.todo.state === "delete";
    },
  },
  methods: {
    changeStateToShow() {
      this.todo.state = "show";
    },
    changeStateToUpdate() {
      this.todo.state = "update";
    },
    changeStateToDelete() {
      this.todo.state = "delete";
    },
  },
};
</script>

<style>
</style>