<template>
  <v-app id="inspire">
    <v-app-bar app dark color="#ff416c"> 
      <v-toolbar-title>Inicio</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text @click="logout">Salir<v-icon class="ml-2">mdi-logout</v-icon></v-btn>
    </v-app-bar>
    <v-main>
      <transition>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </transition>
    </v-main>
  </v-app>
</template>
<script>
import { mapActions } from "vuex";
export default {
  methods:{
    ...mapActions('auth',['logout'])
  }
};
</script>
