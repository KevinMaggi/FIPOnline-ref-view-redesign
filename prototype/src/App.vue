<template>
  <div id="app">
    <div id="nav" v-if="!isLoginPage()">
      <nav></nav>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data: function () {
    return {
      auth: 'app.vue'
    }
  },
  methods: {
    isLoginPage: function () {
      return (this.$route.path.startsWith('/accesso'))
    }
  }
}
</script>

<style lang="scss">
@import '~bootstrap/scss/bootstrap.scss';
@import '~bootstrap-vue/dist/bootstrap-vue.css';

@import "styles/bootstrap_overrule.scss";

html, body, #app {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

body {
  background-color: $primary;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

#nav {
  height: 100px;
  background-color: $primary;
}
</style>
