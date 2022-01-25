<template>
  <div id="home">
    <section>
      <h1 class="section_name"><span>Gare</span></h1>
      <router-link to="/partite" id="partite" class="btn btn-secondary btn-home">
        <span class="material-icons-round">sports</span>
        <span>Partite</span>
        <div id="dettaglio_partite">
          <span>da accettare:&nbsp;<span v-bind:class="{ alert: da_accettare }">{{ da_accettare }}</span></span><br/>
          <span>da disputare:&nbsp;<span v-bind:class="{ info: da_pianificare() }">{{ da_disputare }}</span></span><br/>
          <span>da refertare:&nbsp;<span v-bind:class="{ warning: da_refertare }">{{ da_refertare }}</span></span>
        </div>
        <span v-if="da_accettare || da_refertare" class="material-icons-round bdg warning">error</span>
        <span v-else-if="da_pianificare()" class="material-icons-round bdg info">new_releases</span>
      </router-link>
      <div>
        <router-link to="/rimborsi" class="btn btn-secondary btn-home">
          <span class="material-icons-round">euro</span>
          <span>Rimborsi</span>
          <span v-if="new_rimborsi()" class="material-icons-round bdg info">new_releases</span>
        </router-link>
        <router-link v-if="ruolo === 'ref'" to="/rapporti" class="btn btn-secondary btn-home">
          <span class="material-icons-round">assignment</span>
          <span>Rapporti</span>
          <span v-if="new_rapporti()" class="material-icons-round bdg info">new_releases</span>
        </router-link>
      </div>
    </section>
    <section>
      <h1 class="section_name"><span>Amministrazione</span></h1>
      <router-link to="/tesseramento" class="btn btn-secondary btn-home">
        <span class="material-icons-round">badge</span>
        <span v-if="ruolo === 'ref'">Tesseramento e certificato</span>
        <span v-else>Tesseramento</span>
        <span v-if="stato_tesseramento === 2" class="material-icons-round bdg danger">error</span>
        <span v-else-if="stato_tesseramento === 1" class="material-icons-round bdg warning">error</span>
        <span v-else class="material-icons-round bdg success">check_circle</span>
      </router-link>
      <router-link to="/anagrafica" class="btn btn-secondary btn-home">
        <span class="material-icons-round">contact_page</span>
        <span>Anagrafica</span>
      </router-link>
    </section>
    <section>
      <h1 class="section_name"><span>Utenza</span></h1>
      <router-link to="/cambio-pw" class="btn btn-secondary btn-home">
        <span class="material-icons-round">vpn_key</span>
        <span>Cambio password</span>
      </router-link>
      <button v-on:click="logout" id="logout" class="btn btn-secondary btn-home">
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
      ruolo: Vue.prototype.$ruolo,
      da_accettare: 0,
      da_disputare: 0,
      da_refertare: 0,

      stato_tesseramento: null, // 0 = ok, 1 = warning, 2 = danger
    }
  },
  mounted: function () {
    this.stato_tesseramento = this.get_stato_tesseramento()
    this.interval = setInterval(() => {
      this.stato_tesseramento = this.get_stato_tesseramento()
    }, 30000)
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
      return false
    },
    new_rimborsi() {
      return false
    },
    new_rapporti() {
      return Vue.prototype.$archivio_rapporti[0].rapporti.filter(rapporto => !rapporto.visualizzato).length !== 0;
    },
    get_stato_tesseramento() {
      let today = Date.now()
      if (this.ruolo === 'ref') {
        if (today > Vue.prototype.$scadenza_certificato.getTime() ||
          (!Vue.prototype.$rinnovo_tesseramento && today > Vue.prototype.$chiusura_tesseramento.getTime())
        ) return 2
        else {
          let alert = new Date(Vue.prototype.$scadenza_certificato)
          alert.setDate(alert.getDate() - 30)
          if (today > alert.getTime() ||
            (!Vue.prototype.$rinnovo_tesseramento && today > Vue.prototype.$apertura_tesseramento.getTime())
          ) return 1
          else return 0
        }
      } else {
        if (!Vue.prototype.$rinnovo_tesseramento && today > Vue.prototype.$chiusura_tesseramento.getTime()) return 2
        else if (!Vue.prototype.$rinnovo_tesseramento && today > Vue.prototype.$apertura_tesseramento.getTime()) return 1
        else return 0
      }
    },
  }
}
</script>

<style lang="scss" scoped>
@import "../styles/constants.scss";

$button-width: 150px;
$button-wider-min-width: 275px;
$button-wider-max-width: 448px;

#home section {
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

    span {
      margin: auto;
      padding: 0 20px;
      background-color: white;
    }
  }

  .btn-home {
    color: $primary;
    display: flex !important;
    flex-direction: column;
    font-size: $text-big !important;
    line-height: 1.25;
    height: 125px;
    width: $button-width;
    font-weight: bold;
    border-radius: 25px !important;
    flex-grow: 1;
    position: relative;
    margin: 10px !important;

    span {
      height: 60px;
      display: inline-flex;
      align-items: center;
      word-wrap: normal;
    }

    .material-icons-round {
      font-size: 48px;
    }

    &#partite {
      min-width: $button-wider-min-width;
      max-width: $button-wider-max-width;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-evenly;
      font-size: $subtitle !important;
      flex-grow: 10;

      #dettaglio_partite {
        border-left: 2px solid $primary;
        padding-left: 5px;
        padding-right: 20px;
        text-align: left;
        font-weight: normal;

        span {
          font-size: $text-small;
          line-height: 20px;
          height: 20px;

          span {
            font-style: italic;
          }

          .alert, .info {
            font-weight: bold;
          }
        }
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
}

@media screen and (max-width: 400px) {
  #home {
    padding: 0;
  }
  #home section {
    padding: 10px 5px;
    margin: 20px 5px 5px 5px;

    h1 {
      font-size: $subtitle;
    }

    .btn-home {
      font-size: $text-medium !important;
      margin: 10px 5px !important;
      height: 100px;
      width: 125px;

      &#partite {
        font-size: $subsubtitle !important;
      }

      span {
        height: 40px;
      }
    }
  }
}
</style>
