<template>
  <div id="home">
    <h1>Home</h1>
    <router-link to="/partite">partite</router-link>
    <router-link to="/rapporti">rapporti</router-link>
    <router-link to="/rimborsi">rimborsi</router-link>
    <router-link to="/tesseramento">tesseramento</router-link>
    <router-link to="/anagrafica">anagrafica</router-link>
    <router-link to="/cambio-pw">cambio pw</router-link>
    <button v-on:click="logout">Esci</button>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  name: "Home",
  methods: {
    logout(e) {
      e.preventDefault()
      Vue.prototype.$auth = false
      this.$router.push({path: '/accesso/login'})
    }
  }
}
</script>

<style lang="scss" scoped>
#home {
  height: calc(100% - 100px);
  background-color: white;
}
</style>
