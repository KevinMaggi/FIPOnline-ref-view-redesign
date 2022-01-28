<template>
  <div id="app">
    <nav id="nav" v-if="!isLoginPage()">
      <img id="logo_nav" src="@/assets/Logo_bianco_150.png" alt="Logo FIP"/>
      <span id="tessera">Tessera CIA: <span id="numero_tessera">{{ tessera }}</span></span>
      <div id="back" role="navigation">
        <div v-if="!isHome() && !isPianificazione()" id="back_home" @click="$router.push({ path: '/' })"
             class="back" role="link" tabindex="0" aria-label="Torna alla home">
          <span class="material-icons-round">navigate_before</span>
          <span class="material-icons-round">home</span>
        </div>
        <div v-else-if="isPianificazione()" id="back_partite" @click="$router.go(-1)"
             class="back" role="link" tabindex="0" aria-label="Torna alle partite">
          <span class="material-icons-round">navigate_before</span>
          <span class="material-icons-round">sports</span>
        </div>
      </div>
    </nav>
    <main id="page" v-bind:class="{ page: !isLoginPage() }">
      <router-view/>
    </main>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  name: 'App',
  data: function () {
    return {
      auth: 'app.vue',
      tessera: Vue.prototype.$tessera
    }
  },
  methods: {
    isLoginPage: function () {
      return (this.$route.path.startsWith('/accesso'))
    },
    isHome: function () {
      return (this.$route.path === '/')
    },
    isPianificazione: function () {
      return (this.$route.path.startsWith('/pianificazione'))
    },
  }
}
</script>

<style lang="scss">
@import '~bootstrap/scss/bootstrap.scss';
@import '~bootstrap-vue/dist/bootstrap-vue.css';

@import "styles/bootstrap_overrule.scss";
@import "styles/constants.scss";
@import "styles/style.scss";

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

nav {
  height: $navbar-height;
  background-color: $primary;
  position: fixed;
  top: 0;

  width: 100%;
  max-width: $max-main-width;
  box-sizing: content-box;
  padding: 0 calc(50% - #{$max-main-width / 2});
  z-index: 100;

  img {
    margin: 7.5px auto;
    display: block;
    max-height: 35px;
  }

  span#tessera {
    font-size: 14px;
    color: white;
    display: block;

    span#numero_tessera {
      font-style: italic;
    }
  }
}

main {
  height: 100%;
}

main.page {
  padding-top: $navbar-height;
}

div#back {
  position: fixed;
  top: 0;
  color: white;
  margin: ($navbar-height - $back-button-height) / 2;
  cursor: pointer;

  span {
    transition-property: margin;
    transition-duration: 0.15s;
  }

  &:hover {
    color: $secondary;

    span:last-of-type {
      margin-left: -10px;
    }
  }

  #back_home, #back_partite {
    height: $back-button-height;
    display: flex;
    align-items: center;

    span {
      font-size: 36px;
      line-height: 36px;
    }
  }
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
</style>
