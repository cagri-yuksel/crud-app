<template>
  <div class="container">
    <div class="container m-5 d-flex justify-content-center">
      <div class="card d-flex flex-column">
        <div
          class="
            card-body
            d-flex
            justify-content-center
            flex-column
            align-items-center
          "
        >
          <h4>Sign in</h4>
          <h4>{{ info }}</h4>
        </div>

        <div class="card-body">
          <div class="input-group input">
            <span class="input-group-text" id="inputGroup-sizing-default"
              >Username</span
            >
            <input
              type="text"
              class="form-control"
              aria-label="Sizing example input "
              aria-describedby="inputGroup-sizing-default"
              v-model="loginData.username"
            />
          </div>
        </div>
        <div class="card-body">
          <div class="input-group input">
            <span class="input-group-text" id="inputGroup-sizing-default"
              >Password</span
            >
            <input
              type="text"
              class="form-control"
              aria-label="Sizing example input "
              aria-describedby="inputGroup-sizing-default"
              v-model="loginData.password"
            />
          </div>
        </div>
        <div class="card-body">
          <div class="d-grid">
            <button class="btn btn-primary" type="button" @click="login()">
              Sign in
            </button>
          </div>
        </div>
        <div class="card-body">
          <hr />
        </div>
        <div class="card-body">
          <div class="d-grid">
            <button
              class="btn btn-primary"
              type="button"
              @click="this.$router.push({ name: 'register' })"
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      loginData: {
        username: "",
        password: "",
      },
      info: "",
    };
  },
  methods: {
    login() {
      axios
        .post("http://localhost:9999/api/login", {
          username: this.loginData.username,
          password: this.loginData.password,
        })
        .then((res) => {
          console.log(res);
          JSON.stringify(localStorage.setItem("token", res.data.token));
          JSON.stringify(localStorage.setItem("username", res.data.username));
          this.$store.dispatch("setCurrentUser", res.data.username);

          this.$store.dispatch("setIsAuth", true);

          this.$router.push({ name: "home" });
        })
        .catch((error) => {
          console.log(error.response);
          this.info = error.response.data;
        });
    },
  },
};
</script>


<style>
</style>