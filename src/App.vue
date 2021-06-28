<template>
<navbar></navbar>
  <router-view></router-view>
</template>

<script>

import navbar from './components/navbar.vue';
export default {
  components: { navbar },
  data() {
    return {
      
    };
  },
  created(){
    if (localStorage.getItem("username")) {
        this.$store.dispatch("setIsAuth", true);
      
    } else {
        this.$store.dispatch("setIsAuth", false);
    }
  }
  
};
</script>

<style>
</style>