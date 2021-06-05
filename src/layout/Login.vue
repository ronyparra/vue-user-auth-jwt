<template>
  <v-app>
    <v-main>
        <div class="main">
      <router-view />
        </div>
    </v-main>
  </v-app>
</template>
<style scoped>
.main {
  background: #f6f5f7;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: "Montserrat", sans-serif;
  height: 100vh;
}
</style>
