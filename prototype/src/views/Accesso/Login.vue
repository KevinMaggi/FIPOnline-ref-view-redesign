<template>
  <div id="login">
    <form autocomplete="on">
      <label class="row label-big">
        <span class="col-md">Tessera CIA:</span>
        <input class="col-md form-control input-big" type="text" placeholder="A000000" id="tessera" name="tessera"
               spellcheck="false" autocomplete="username" autocapitalize="on" autocorrect="off" autofocus
               minlength="7" maxlength="7" pattern="[a,A][0-9]{6}" required
               v-model="tessera">
      </label>
      <label class="row label-big">
        <span class="col-md">Password:</span>
        <input class="col-md form-control input-big" type="password" id="pw" name="password"
               autocomplete="current-password"
               required
               v-model="password">
      </label>
      <div v-if="warning" class="alert alert-warning" role="alert">Compilare entrambi i campi</div>
      <div v-if="error" class="alert alert-danger" role="alert">Tessera CIA o password errati</div>
      <button type="submit" name="login" id="login_btn" class="btn btn-primary btn-big" v-on:click="login">
        <span class="material-icons-round">login</span>
        <span>Entra</span>
      </button>
    </form>
    <router-link to="/accesso/recupera-pw">Recupera password</router-link>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  name: "Login",
  data: function () {
    return {
      tessera: '',
      password: '',
      error: false,
      warning: false
    }
  },
  methods: {
    login(e) {
      e.preventDefault()
      document.getElementById('login_btn').blur()
      if (this.tessera === '' || this.password === '') {
        this.error = false
        this.warning = true
      } else if (this.tessera === Vue.prototype.$tessera && this.password === Vue.prototype.$pw) {
        Vue.prototype.$auth = true
        this.$router.push({path: '/'})
      } else {
        this.warning = false
        this.error = true
      }
    }
  }
}
</script>

<style scoped>

</style>
