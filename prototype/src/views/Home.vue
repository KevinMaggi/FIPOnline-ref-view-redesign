<template>
  <div id="home">
    <home_section name="Gare">
      <home_button to="/partite" id="partite" icon="sports" label="Partite">
        <div id="dettaglio_partite">
          <span>da accettare:&nbsp;<span v-bind:class="{ warning: da_accettare() }">{{ da_accettare() }}</span></span>
          <br/>
          <span>da disputare:&nbsp;<span v-bind:class="{ info: da_pianificare() }">{{
              da_pianificare() + pianificate()
            }}</span></span>
          <br/>
          <span v-if="ruolo === 'ref'">da refertare:&nbsp;<span
            v-bind:class="{ warning: da_refertare() }">{{ da_refertare() }}</span></span>
        </div>

        <span v-if="da_accettare() || (ruolo === 'ref' && da_refertare())" class="material-icons-round bdg warning">error</span>
        <span v-else-if="da_pianificare()" class="material-icons-round bdg info">notification_important</span>
      </home_button>

      <div>
        <home_button to="/rimborsi" icon="euro" label="Rimborsi">
          <span v-if="new_rimborsi()" class="material-icons-round bdg info">new_releases</span>
        </home_button>

        <home_button v-if="ruolo === 'ref'" to="/rapporti" icon="assignment" label="Rapporti">
          <span v-if="new_rapporti()" class="material-icons-round bdg info">new_releases</span>
        </home_button>
      </div>
    </home_section>

    <home_section name="Amministrazione">
      <home_button to="/tesseramento" icon="badge"
                   :label="(ruolo ==='ref')?'Tesseramento e certificato':'Tesseramento'">
        <span v-if="stato_tesseramento === 2" class="material-icons-round bdg danger">error</span>
        <span v-else-if="stato_tesseramento === 1" class="material-icons-round bdg warning">error</span>
        <span v-else class="material-icons-round bdg success">check_circle</span>
      </home_button>

      <home_button to="/anagrafica" icon="contact_page" label="Anagrafica"></home_button>
    </home_section>

    <home_section name="Utenza">
      <home_button to="/cambio-pw" icon="vpn_key" label="Cambio password"></home_button>

      <button v-on:click="logout" id="logout" class="btn btn-secondary btn-home">
        <span class="material-icons-round">power_settings_new</span>
        <span>Esci</span>
      </button>
    </home_section>
  </div>
</template>

<script>
import Vue from "vue";
import home_button from "@/components/home_button";
import home_section from "@/components/home_section";

export default {
  name: "Home",
  components: {home_button, home_section},
  data: function () {
    return {
      ruolo: Vue.prototype.$ruolo,

      stato_tesseramento: null, // 0 = ok, 1 = warning, 2 = danger
    }
  },
  mounted: function () {
    this.stato_tesseramento = this.get_stato_tesseramento()
    this.interval = setInterval(() => {
      this.stato_tesseramento = this.get_stato_tesseramento()
    }, 30000)
  },
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
    da_accettare() {
      return Vue.prototype.$archivio_gare[0].gare.filter(gara => gara.stato === 0).length
    },
    da_pianificare() {
      return Vue.prototype.$archivio_gare[0].gare.filter(gara => {
        return gara.stato === 1
      }).length
    },
    pianificate() {
      return Vue.prototype.$archivio_gare[0].gare.filter(gara => {
        return (gara.stato === 2 && Date.now() < gara.datetime.getTime())
      }).length
    },
    da_refertare() {
      return Vue.prototype.$archivio_gare[0].gare.filter(gara => {
        let today = Date.now();
        return gara.stato === 2 && today > gara.datetime.getTime()
      }).length
    },
    new_rimborsi() {
      let flag = false
      Vue.prototype.$archivio_rimborsi[0].rimborsi.forEach(comitato => {
        if (comitato.liquidazioni.filter(liquidazione => !liquidazione.visualizzato).length !== 0)
          flag = true
      })
      return flag
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

#home {
  justify-content: space-around;

  #logout {
    color: $danger !important;
  }
}

@media screen and (max-width: 400px) {
  #home {
    padding: 0;
  }
}
</style>
