<template>
  <div
    :class="isMobile ? 'container-mobile' : 'container-desktop'"
    id="container"
  >
    <v-overlay :value="isLoginLoading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <div class="form-container sign-up-container" v-if="!isMobile">
      <v-form ref="formCreate">
        <v-container
          class="d-flex flex-column justify-center align-center px-10"
        >
          <h1>Crear Cuenta</h1>
          <Social />
          <span>o use su correo electronico para registrarse</span>

          <div class="inputs">
            <TextField placeholder="Usuaro" v-model="form.username" />
            <TextField
              password
              placeholder="Contraseña"
              v-model="form.password"
            />
          </div>
          <v-alert dense type="error" v-if="response">
            {{ response }}
          </v-alert>
          <Btn @click="crear">Registrarse</Btn>
        </v-container>
      </v-form>
    </div>
    <div :class="'form-container ' + mobileStyle">
      <v-form ref="form">
        <v-container
          class="d-flex fill-height flex-column justify-center align-center px-10"
        >
          <h1>Login</h1>
          <Social />
          <span>o use una cuenta</span>
          <div class="inputs">
            <TextField placeholder="Usuario" v-model="form.username" />
            <TextField
              placeholder="Contraseña"
              password
              v-model="form.password"
            />
          </div>
          <v-alert dense type="error" v-if="response">
            {{ response }}
          </v-alert>
          <div class="d-flex flex-column align-center">
            <a class="mt-n2" @click="$router.push('/recovery')"
              >Olvido su contraseña?</a
            >
            <Btn class="my-n2" @click="login">Iniciar Sesion</Btn>
          </div>
        </v-container>
      </v-form>
    </div>
    <div class="overlay-container" v-if="!isMobile">
      <div class="overlay">
        <div class="overlay-panel overlay-left">
          <h1>Bienvenido!</h1>
          <p>
            Para mantenerse conectado con nosotros, inicie sesión con su
            información personal
          </p>
          <Btn outlined @click="loginPanel">Iniciar Sesion</Btn>
        </div>
        <div class="overlay-panel overlay-right">
          <h1>Hey, hola!</h1>
          <p>Ingrese sus datos personales y comience su viaje con nosotros</p>
          <Btn outlined @click="registerPanel">Registrarse</Btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Social from "../components/Social";
import TextField from "../components/TextField";
import Btn from "../components/Button";
export default {
  data: () => ({
    container: null,
    form: {
      username: "",
      password: "",
    },
    response: null,
  }),
  components: {
    Btn,
    Social,
    TextField,
  },
  methods: {
    ...mapActions("auth", ["loginAction", "createUser"]),
    registerPanel() {
      this.container.classList.add("right-panel-active");
    },
    loginPanel() {
      this.container.classList.remove("right-panel-active");
    },

    async login() {
      if (!this.$refs.form.validate()) return null;
      this.response = await this.loginAction(this.form);
    },
    async crear() {
      if (!this.$refs.formCreate.validate()) return null;
      this.form.nombre = this.form.username;
      this.form.apellido = this.form.username;
      this.response = await this.createUser(this.form);
      if (!this.response) {
        this.login();
      }
    },
  },
  computed: {
    ...mapGetters("auth", ["isLoginLoading"]),
    isMobile() {
      return this.$vuetify.breakpoint.smAndDown;
    },
    mobileStyle() {
      return this.isMobile ? "sign-in-container-mobile" : "sign-in-container";
    },
  },
  mounted() {
    this.container = document.getElementById("container");
  },
};
</script>

<style scoped lang="scss">
.inputs {
  width: 100%;
}

h1 {
  font-weight: bold;
  margin: 0;
}

p {
  font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
}

span {
  font-size: 12px;
}

a {
  color: #333;
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
}

.container-desktop {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  align-content: center;
  overflow: hidden;
  width: 768px;
  max-width: 100%;
  min-height: 480px;
}
.container-mobile {
  background-color: #fff;
  position: relative;
  align-content: center;
  width: 100vw;
  height: 100vh;
}
.form-container {
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
}

.sign-in-container {
  left: 0;
  width: 50%;
  z-index: 2;
}
.sign-in-container-mobile {
  left: 0;
  width: 100%;
  z-index: 2;
}
.container.right-panel-active .sign-in-container {
  transform: translateX(100%);
}

.sign-up-container {
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
}

.container-desktop.right-panel-active .sign-up-container {
  transform: translateX(100%);
  opacity: 1;
  z-index: 5;
  animation: show 0.6s;
}

@keyframes show {
  0%,
  49.99% {
    opacity: 0;
    z-index: 1;
  }

  50%,
  100% {
    opacity: 1;
    z-index: 5;
  }
}

.overlay-container {
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
}

.container-desktop.right-panel-active .overlay-container {
  transform: translateX(-100%);
}

.overlay {
  background: #ff416c;
  background: -webkit-linear-gradient(to right, #ff4b2b, #ff416c);
  background: linear-gradient(to right, #ff4b2b, #ff416c);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  color: #ffffff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.container-desktop.right-panel-active .overlay {
  transform: translateX(50%);
}

.overlay-panel {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.overlay-left {
  transform: translateX(-20%);
}

.container-desktop.right-panel-active .overlay-left {
  transform: translateX(0);
}

.overlay-right {
  right: 0;
  transform: translateX(0);
}

.container-desktop.right-panel-active .overlay-right {
  transform: translateX(20%);
}

.social-container {
  margin: 20px 0;
}

.social-container a {
  border: 1px solid #dddddd;
  border-radius: 50%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
  height: 40px;
  width: 40px;
}
</style>
