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
          <h4>Register</h4>
          <h3>{{ info }}</h3>
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
            <button class="btn btn-primary" type="button" @click="register()">
              Register
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
              @click="this.$router.push({ name: 'login' })"
            >
              Sign in
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
      info: null,
    };
  },
  methods: {
    register() {
      axios
        .post("http://localhost:9999/api/register", {
          username: this.loginData.username,
          password: this.loginData.password,
        })
        .then((e) => {
          console.log(e.data);
           this.info = e.data.error;
        })
        .catch((r) => {
          console.log(r.response);
          this.info = r.response;
        });
    },
  },
};
</script>


<style>
</style>