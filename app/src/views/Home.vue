<template>
  <nav>
    <!-- EM CONSTRUÇAO -->
    <v-app-bar app clipped-left color="blue lighten-5">
      <div class="d-none d-md-flex align-center">
        <v-img
          alt="Logo Todo"
          class="shrink ml-3"
          contain
          src="../assets/todo.png"
          transition="scale-transition"
          width="156"
          height="50"
        />
      </div>

      <v-btn
        id="logout-button"
        fab
        color="blue lighten-5"
        @click.prevent="logOut"
      >
        <v-icon id="logout-mdi">mdi-power-standby</v-icon>
      </v-btn>
    </v-app-bar>
  </nav>
</template>

<script>
export default {
  name: "Home",

  data: () => ({
    darkMode: false,
  }),

  methods: {
    async logOut() {
      await this.$store.dispatch("auth/logout");
      this.$router.push("/login");
    },
  },
};
</script>

<style>
</style>