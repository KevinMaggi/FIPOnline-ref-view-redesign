<template>
  <div id="recuperapw">
    <form autocomplete="on">
      <label class="row">
        <span class="col-md form-label">Tessera CIA:</span>
        <input class="col-md form-control" type="text" placeholder="A000000" id="tessera" name="tessera"
               spellcheck="false" autocomplete="username" autocapitalize="on" autocorrect="off" autofocus
               minlength="7" maxlength="7" pattern="[a,A][0-9]{6}" required
               v-model="tessera">
      </label>
      <label class="row">
        <span class="col-md form-label">Mail ufficiale:</span>
        <input class="col-md form-control" type="email" id="email" name="email"
               autocomplete="email"
               required
               v-model="email">
      </label>
      <div v-if="warning" class="alert alert-warning" role="alert">Compilare entrambi i campi</div>
      <div v-if="error" class="alert alert-danger" role="alert">Tessera CIA o mail errati</div>
      <button type="submit" name="recuperapw" id="recuperapw_btn" class="btn btn-primary" v-on:click="recuperapw">
        <span class="material-icons md-36">vpn_key</span>
        <span>Recupera password</span>
      </button>
    </form>
    <router-link to="/accesso/login">Torna al login</router-link>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  name: 'RecuperaPw',
  data: function () {
    return {
      tessera: '',
      email: '',
      error: false,
      warning: false
    }
  },
  methods: {
    recuperapw(e) {
      e.preventDefault()
      if (this.tessera === '' || this.email === '') {
        this.error = false
        this.warning = true
      } else if (this.tessera === Vue.prototype.$tessera && this.email === Vue.prototype.$email) {
        alert('Ti è stata inviata una email con le istruzioni per recuperare la tua password')
        this.$router.push({path: '/accesso/login'})
      } else {
        this.warning = false
        this.error = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
