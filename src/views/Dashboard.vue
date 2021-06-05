<template>
  <v-container
    class="fill-height d-flex flex-column justify-center align-center"
  >
    Hola {{ getUserInfo.nombre }} has iniciado sesion
  </v-container>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("auth", ["getUserInfo"]),
  },
};
</script>
