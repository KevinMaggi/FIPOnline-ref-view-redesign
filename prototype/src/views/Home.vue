<template>
  <div id="home">
    <section>
      <h1 class="section_name"><span>Gare</span></h1>
      <router-link to="/partite" id="partite" class="btn btn-secondary">
        <span class="material-icons-round">sports</span>
        <span>Partite</span>
        <div id="dettaglio_partite">
          <span>da accettare: <span>{{ da_accettare }}</span></span><br/>
          <span>da disputare: <span>{{ da_disputare }}</span></span><br/>
          <span>da refertare: <span>{{ da_refertare }}</span></span>
        </div>
        <span v-if="da_accettare || da_refertare" class="material-icons-round bdg warning">error</span>
        <span v-else-if="da_pianificare()" class="material-icons-round bdg info">new_releases</span>
      </router-link>
      <div>
        <router-link to="/rimborsi" class="btn btn-secondary">
          <span class="material-icons-round">euro</span>
          <span>Rimborsi</span>
          <span v-if="new_rimborsi()" class="material-icons-round bdg info">new_releases</span>
        </router-link>
        <router-link to="/rapporti" class="btn btn-secondary">
          <span class="material-icons-round">assignment</span>
          <span>Rapporti</span>
          <span v-if="new_rapporti()" class="material-icons-round bdg info">new_releases</span>
        </router-link>
      </div>
    </section>
    <section>
      <h1 class="section_name"><span>Amministrazione</span></h1>
      <router-link to="/tesseramento" class="btn btn-secondary">
        <span class="material-icons-round">badge</span>
        <span>Tesseramento e certificato</span>
        <span v-if="tesseramento_success()" class="material-icons-round bdg success">check_circle</span>
        <span v-if="tesseramento_warning()" class="material-icons-round bdg warning">error</span>
        <span v-if="tesseramento_danger()" class="material-icons-round bdg danger">error</span>
      </router-link>
      <router-link to="/anagrafica" class="btn btn-secondary">
        <span class="material-icons-round">contact_page</span>
        <span>Anagrafica</span>
      </router-link>
    </section>
    <section>
      <h1 class="section_name"><span>Utenza</span></h1>
      <router-link to="/cambio-pw" class="btn btn-secondary">
        <span class="material-icons-round">vpn_key</span>
        <span>Cambio password</span>
      </router-link>
      <button v-on:click="logout" id="logout" class="btn btn-secondary">
        <span class="material-icons-round">power_settings_new</span>
        <span>Esci</span>
      </button>
    </section>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  name: "Home",
  data: function () {
    return {
      da_accettare: 0,
      da_disputare: 0,
      da_refertare: 0,
    }
  },
  computed: {},
  methods: {
    logout(e) {
      e.preventDefault()
      if (confirm("Sei sicuro di voler uscire?")) {
        Vue.prototype.$auth = false
        this.$router.push({path: '/accesso/login'})
      } else {
        document.getElementById('logout').blur()
      }
    },
    da_pianificare() {
    },
    new_rimborsi() {
    },
    new_rapporti() {
    },
    tesseramento_success() {
    },
    tesseramento_warning() {
    },
    tesseramento_danger() {
    },
  }
}
</script>

<style lang="scss" scoped>
@import "../styles/constants.scss";

$button-width: 150px;
$button-wider-min-width: 275px;
$button-wider-max-width: 448px;

#home {
  min-height: 100%;
  background-color: white;
  max-width: $max-main-width;
  margin: auto;
  padding: 15px;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

section {
  border: 4px dashed $primary;
  border-radius: 30px;
  margin: 25px 5px 0 5px;
  padding: 10px;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  position: relative;
  justify-content: space-around;

  .section_name {
    position: absolute;
    top: -20px;
    left: 0;
    width: 100%;
    text-align: center;
    font-size: 30px;
    font-weight: bold;
    line-height: 30px;
    color: $primary;

    span {
      margin: auto;
      padding: 0 20px;
      background-color: white;
    }
  }

  .btn {
    color: $primary;
    display: flex !important;
    flex-direction: column;
    font-size: 20px !important;
    line-height: 1.25;
    height: 125px;
    width: $button-width;
    font-weight: bold;
    border-radius: 25px !important;
    flex-grow: 1;
    position: relative;

    span {
      height: 60px;
      display: inline-flex;
      align-items: center;
      word-wrap: normal;
    }

    .material-icons-round {
      font-size: 48px;
    }

    .material-icons-round.bdg {
      font-size: 30px;
      height: 30px;
      position: absolute;
      top: 5px;
      right: 5px;
    }
  }

  .btn#partite {
    min-width: $button-wider-min-width;
    max-width: $button-wider-max-width;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    font-size: 24px !important;
    flex-grow: 10;

    #dettaglio_partite {
      border-left: 2px solid $primary;
      padding-left: 5px;
      padding-right: 20px;
      text-align: left;
      font-weight: normal;

      span {
        font-size: 15px;
        line-height: 20px;
        height: 20px;
      }
    }
  }

  > div {
    flex-grow: 1;
    min-width: $button-wider-min-width;
    flex-direction: row;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }

  #logout {
    color: $danger;
  }

  .danger {
    color: $danger;
  }

  .warning {
    color: $warning;
  }

  .success {
    color: $success;
  }

  .info {
    color: $info;
  }
}

@media screen and (max-width: 400px) {
  #home {
    padding: 0;
  }
  section {
    padding: 10px 5px;
    margin: 25px 5px 0 5px;

    * {
      font-size: smaller;
    }

    .btn {
      margin: 10px 5px !important;
      height: 100px;
      width: 125px;

      span {
        height: 40px;
      }
    }
  }
}
</style>
