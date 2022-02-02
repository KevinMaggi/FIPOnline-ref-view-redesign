<template>
  <div id="app">
    <navbar></navbar>
    <main id="page" v-bind:class="{ page: !isLoginPage() }">
      <router-view/>
    </main>
  </div>
</template>

<script>
import navbar from "@/components/navbar"

export default {
  name: 'App',
  components: {navbar},
  data: function () {
    return {
      auth: 'app.vue',
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
@import "styles/constants.scss";
@import "styles/style.scss";
@import "styles/material-icon.css";

html {
  overflow: auto;
}

html, body, #app {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;

  *:not(input) {
    user-select: none; /* supported by Chrome and Opera */
    -webkit-user-select: none; /* Safari */
    -webkit-touch-callout: none; /* Safari */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
  }
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

main {
  height: 100%;

  &.page {
    padding-top: $navbar-height;
  }

  #home, #tesseramento, #cambiopw, #anagrafica, #rapporti, #partite, #rimborsi, #pianificazione {
    min-height: 100%;
    background-color: white;
    max-width: $max-main-width;
    margin: auto;
    padding: 15px;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    position: relative;
  }
}
</style>
