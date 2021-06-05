<template>
  <v-btn
    class="font-weight-bolt rounded-xl"
    tile
    :height="height"
    min-width="14em"
    :outlined="outlined"
    dark
    :block="block"
    @click="$emit('click')"
    :color="!outlined ? '#ff4b2b' : ''"
    ><slot /></v-btn
  >
</template>
<script>
export default {
    props:{
        outlined: Boolean,
        block: Boolean,
        height:{
          type: String,
          default: '3em'
        }
    }
}
</script>
