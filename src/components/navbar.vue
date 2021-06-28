<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">Home</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        {{ currentUser }}
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav me-auto">
          <router-link class="nav-link" to="/"></router-link>
        </div>
        <div class="navbar-nav" v-if="!isAuth">
          <router-link class="nav-link" to="/login">Login</router-link>
        </div>
        <div class="navbar-nav" v-if="!isAuth">
          <router-link class="nav-link" to="/register">Register</router-link>
        </div>
        <div class="navbar-nav">
          <router-link
            class="nav-link"
            to="/login"
            v-if="isAuth"
            @click="logout()"
          >
            {{ currentUser }} Logout <i class="fas fa-sign-out-alt"></i></router-link
          >
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
    };
  },
  methods: {
    logout() {
      localStorage.clear(),
     this.$store.dispatch("setIsAuth", false);
    },
  },
  computed: {
    ...mapGetters({
      currentUser: "currentUser",
      isAuth: "isAuth",

    }),
  },
};
</script>

<style>
</style>