<template>
  <component :is="layout"></component>
</template>
<script>
import { mapGetters } from "vuex";
import Main from "./layout/Main";
import Login from "./layout/Login";
export default {
  components: {
    Main,
    Login,
  },
  computed: {
    ...mapGetters("auth", ["isLogin"]),
    layout() {
      return this.isLogin ? "Main" : "Login";
    },
  },
};
</script>
