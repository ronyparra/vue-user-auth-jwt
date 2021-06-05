<template>
  <v-text-field
    background-color="#eee"
    full-width
    filled
    solo
    flat
    dense
    append
    :rules="rules"
    :value="value"
    :type="type"
    :placeholder="placeholder"
    :append-icon="password ? icon : ''"
    @input="$emit('input', $event)"
    @click:append="changeIcon"
  ></v-text-field>
</template>
<script>
export default {
  data: () => ({
    rules: [v=>!!v || 'Obligatorio'],
    icon: "mdi-eye",
    type: "text",
  }),
  props: {
    password: Boolean,
    value: String,
    placeholder: String,
  },
  methods: {
    changeIcon() {
      if (this.type === "text") {
        this.type = "password";
        this.icon = "mdi-eye";
      } else {
        this.type = "text";
        this.icon = "mdi-eye-off";
      }
    },
  },
};
</script>
