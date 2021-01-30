<template>
  <v-app id="inspire">
    <v-main class="back">
      <navbar />
      <p>HOME</p>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "../components/Navbar";

export default {
  name: "Home",

  components: { Navbar },
};
</script>

<style>
</style>