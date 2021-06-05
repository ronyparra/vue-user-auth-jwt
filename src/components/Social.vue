<template>
  <div class="social-container">
    <v-btn fab outlined small><v-icon>mdi-facebook</v-icon></v-btn>
    <v-btn fab outlined small><v-icon>mdi-twitter</v-icon></v-btn>
    <v-btn fab outlined small><v-icon>mdi-instagram</v-icon></v-btn>
  </div>
</template>
<style  lang="scss">
.social-container {
  margin: 20px 0;
}
.social-container button {
  border: 1px solid #dddddd;
  border-radius: 50%;
  color: white;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
  height: 40px;
  width: 40px;
}
</style>
