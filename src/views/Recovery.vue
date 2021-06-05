<template>
  <v-card flat>
    <v-toolbar flat dense>
      <v-toolbar-title class="title flex text-center"
        >Recuperar Contraseña</v-toolbar-title
      >
    </v-toolbar>
    <v-stepper v-model="e1" flat>
      <v-stepper-header>
        <v-stepper-step color="#ff416c" :complete="e1 > 1" step="1">
          Seleccionar usuario
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step color="#ff416c" :complete="e1 > 2" step="2">
          Actualizar contraseña
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step color="#ff416c" step="3">
          Finalizar proceso
        </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <v-form ref="formUser" @submit.prevent="">
            <TextField placeholder="Usuario" v-model="form.username" />
          </v-form>
          <Btn height="2.5em" @click="validateUser">Continuar</Btn>
          <v-btn text @click="$router.push('/login')">
            Cancelar
          </v-btn>
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-form ref="formPass" @submit.prevent="">
              <v-alert dense type="error" v-if="response">{{response}}</v-alert>
            <TextField placeholder="Nueva Contraseña" v-model="form.password" />
            <TextField
              password
              placeholder="Repetir Contraseña"
              v-model="form.password2"
            />
          </v-form>
          <Btn height="2.5em" @click="validatePass">Continuar</Btn>
          <v-btn text @click="e1 = 1">
            Atras
          </v-btn>
        </v-stepper-content>

        <v-stepper-content step="3">
          <v-card
            flat
            height="200px"
            class="d-flex justify-center align-center"
          >
            <div class="font-weight-medium text-h6">
              La contraseña ha sido recuperada existosamente!
            </div>
          </v-card>

          <Btn block height="2.5em" @click="$router.push('/login')">Iniciar Sesion</Btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-card>
</template>
<script>
import TextField from "../components/TextField";
import Btn from "../components/Button";
import { mapActions } from "vuex";
export default {
  data: () => ({
    form: {
      username: "",
      password: "",
      password2: "",
    },
    e1: 1,
    response: null
  }),
  components: {
    TextField,
    Btn,
  },
  methods: {
    ...mapActions("auth", ["updateUserPassword"]),
    validateUser() {
      if (!this.$refs.formUser.validate()) return null;
      this.e1 = 2;
    },
    async validatePass() {
      if (!this.$refs.formPass.validate()) return null;
      if (this.form.password !== this.form.password2)
        return alert("Las contraseñas son diferentes");
      this.response = await this.updateUserPassword(this.form);
      if (!this.response) {
        this.e1 = 3;
      }
    },

  },
};
</script>
