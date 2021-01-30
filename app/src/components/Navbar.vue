<template>
  <nav>
    <v-app-bar app dark clipped-left color="primary">
      <div class="d-none d-md-flex align-center">
        <v-img
          alt="Logo ToDo"
          class="shrink ml-3"
          contain
          src="../assets/todo.png"
          transition="scale-transition"
          width="81"
        />
      </div>

      <v-spacer></v-spacer>
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn text dark v-on="on">
            <v-icon>mdi-account</v-icon>
            <span class="d-none d-md-flex mr-2">{{ user.first_name }}</span>
          </v-btn>
        </template>

        <v-list class="accent--text">
          <v-list-item
            v-for="(link, index) in links"
            router
            :key="index"
            :to="link.route"
          >
            <v-list-item-title class="accent--text">
              {{ link.title }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </nav>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Navbar",

  data: () => ({
    darkMode: false,

    links: [
      { title: "Meu perfil", route: "/perfil" },
      { title: "Sair", route: "/logout" },
    ],
  }),

  computed: {
    ...mapState({
      user: (state) => state.user.user,
    }),
  },

  methods: {
    /*async logOut() {
      await this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    },
    */
  },
};
</script>

<style>
#max-letter {
  font-size: 18px;
}
#min-letter {
  font-size: 14px;
}

#logout-button {
  margin-left: 27px;
  width: 40px;
  height: 40px;
}

#logout-mdi {
  color: #fafafa;
}
</style>
