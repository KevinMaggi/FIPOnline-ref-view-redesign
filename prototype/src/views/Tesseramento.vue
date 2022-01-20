<template>
  <div id="tesseramento">
    <section id="tess_sect">
      <h1>
        <span>Tesseramento</span>
        <button id="info_btn" class="btn btn-primary" @click="info_active = true">
          <span class="material-icons-round">info</span>
        </button>
      </h1>
      <span v-if="tesseramento_danger()" class="material-icons-round danger">error</span>
      <span v-else-if="tesseramento_warning()" class="material-icons-round warning">error</span>
      <span v-else class="material-icons-round success">check_circle</span>
      <span class="state">Stato:&nbsp;
        <span
          v-bind:class="{ danger: tesseramento_danger(), warning: tesseramento_warning(), success: (!tesseramento_danger() && !tesseramento_warning()) }">{{
            stato_tesseramento_text
          }}</span>
      </span>
      <span v-if="rinnovo_richiesto && !rinnovo_tesseramento" class="state">Da pagare: {{ costo_attuale() }}€ </span>
      <button id="renew" class="btn btn-primary" v-if="stato_tesseramento !== 0 && !rinnovo_richiesto"
              @click="richiedi_rinnovo()">
        <span class="material-icons-round">autorenew</span>
        <span>Richiedi rinnovo</span>
      </button>
      <button id="pay" class="btn btn-primary" v-if="rinnovo_richiesto && !rinnovo_tesseramento" @click="paga()">
        <span class="material-icons-round">payment</span>
        <span>Paga</span>
      </button>
    </section>
    <hr>
    <section id="cert_sect">
      <h1>Certificato medico</h1>
      <span v-if="certificato_danger()" class="material-icons-round danger">error</span>
      <span v-else-if="certificato_warning()" class="material-icons-round warning">error</span>
      <span v-else class="material-icons-round success">check_circle</span>
      <span class="state">Stato:&nbsp;
        <span
          v-bind:class="{ danger: certificato_danger(), warning: certificato_warning(), success: (!certificato_warning() && !certificato_danger()) }">{{
            stato_certificato
          }}</span>
      </span>
      <span class="state">Scadenza: {{ scadenza }} </span>
    </section>

    <transition name="fade">
      <div class="overlay" v-if="info_active">
        <div id="info">
          <button id="info_close" class="btn btn-primary" @click="info_active = false">
            <span class="material-icons-round">clear</span>
          </button>
          <h2>Info tesseramento</h2>
          <p>Il tesseramento per la tua categoria prevede il pagamento di una quota pari a {{ costo }}€ qualora
            effettuato
            entro il {{ chiusura }}; dopo tale data è previsto il pagamento di una mora per un totale di
            {{ costo_mora }}€.</p>
          <p>Per altre informazioni sul tesseramento e sulle tessere libero ingresso fare riferimento alla circolare di
            tesseramento relativa alla stagione {{ stagione }} reperibile sul <a href="http://www.fip.it/cia/">sito
              CIA</a>.</p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  name: "Tesseramento",
  data: function () {
    return {
      rinnovo_richiesto: Vue.prototype.$rinnovo_richiesto,
      rinnovo_tesseramento: Vue.prototype.$rinnovo_tesseramento,
      stato_tesseramento: null,
      stato_tesseramento_text: null,
      scadenza: Vue.prototype.$scadenza_certificato.toLocaleDateString('it-IT', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }),
      chiusura: Vue.prototype.$chiusura_tesseramento.toLocaleDateString('it-IT', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }),
      costo: Vue.prototype.$costo_tesseramento.toFixed(2),
      costo_mora: Vue.prototype.$costo_tesseramento_mora.toFixed(2),
      stagione: Vue.prototype.$stagione,
      info_active: false,
    }
  },
  mounted: function () {
    if (this.tesseramento_danger()) this.stato_tesseramento = 2
    else if (this.tesseramento_warning()) this.stato_tesseramento = 1
    else this.stato_tesseramento = 0
  },
  watch: {
    rinnovo_richiesto: function () {
      Vue.prototype.$rinnovo_richiesto = this.rinnovo_richiesto
    },
    rinnovo_tesseramento: function () {
      Vue.prototype.$rinnovo_tesseramento = this.rinnovo_tesseramento
      this.stato_tesseramento = 0
    },
    stato_tesseramento: function () {
      if (this.tesseramento_danger()) this.stato_tesseramento_text = 'da rinnovare (con mora)'
      else if (this.tesseramento_warning()) this.stato_tesseramento_text = 'da rinnovare (entro il ' + this.chiusura + ')'
      else this.stato_tesseramento_text = 'rinnovato'
    }
  },
  computed: {
    stato_certificato: function () {
      if (this.certificato_danger()) return 'scaduto'
      else if (this.certificato_warning()) return 'in scadenza'
      else return 'in corso di validità'
    },
  },
  methods: {
    tesseramento_danger() {
      let today = Date.now()
      if (today > Vue.prototype.$chiusura_tesseramento.getTime() && !this.$rinnovo_tesseramento) {
        return true
      } else return false
    },
    tesseramento_warning() {
      let today = Date.now()
      if (today > Vue.prototype.$apertura_tesseramento.getTime() && today < Vue.prototype.$chiusura_tesseramento.getTime()) {
        return !this.$rinnovo_tesseramento;
      } else return false
    },
    certificato_danger() {
      let today = Date.now()
      if (today > Vue.prototype.$scadenza_certificato.getTime()) {
        return true
      } else return false
    },
    certificato_warning() {
      let today = Date.now()
      let alert = new Date(Vue.prototype.$scadenza_certificato)
      alert.setDate(alert.getDate() - 30)
      if (today > alert.getTime() && today < Vue.prototype.$scadenza_certificato.getTime()) {
        return true
      } else return false
    },
    costo_attuale() {
      let today = Date.now()
      if (today < Vue.prototype.$chiusura_tesseramento) return this.costo
      else return this.costo_mora
    },
    richiedi_rinnovo() {
      document.activeElement.blur()
      this.rinnovo_richiesto = true
    },
    paga() {
      if (confirm("Sarai indirizzato al connettore bancario per effettuare il pagamento.\nCliccando su 'conferma' simulerai il pagamento"))
        this.rinnovo_tesseramento = true
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../styles/constants.scss";

#tesseramento {
  justify-content: space-evenly;
  font-size: 20px;
}

#tesseramento #tess_sect {
  h1 {
    padding-left: 30px;
  }

  button {
    width: fit-content;
    margin: 5px auto !important;
  }
}

#tesseramento #tess_sect #info_btn, #tesseramento .overlay #info_close {
  width: 36px;
  height: 36px;
  padding: 0;
  border-radius: 36px !important;
  justify-content: center;
  margin: 0 0 0 20px !important;
  position: relative;
  top: -5px;

  * {
    margin: 0;
    font-size: 24px;
  }
}

#tesseramento #tess_sect, #tesseramento #cert_sect {
  display: flex;
  flex-direction: column;

  > .material-icons-round {
    font-size: 48px;
    margin: 10px;
  }

  .state {
    font-size: 20px;
    font-weight: bold;
    color: $primary;
    margin: 10px;
  }
}

hr {
  width: 75%;
  border-top: 4px dashed $primary;
  opacity: 1;
  background-color: white;
  margin: 10px auto;
}

.overlay {
  position: fixed;
  top: $navbar-height;
  left: 0;
  width: 100vw;
  height: calc(100vh - #{$navbar-height});
  background-color: rgba($secondary, 0.5);
  display: flex;
  padding: 20px;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

#tesseramento .overlay {
  #info {
    position: relative;
    border: 3px solid $primary;
    border-radius: 35px;
    background-color: $secondary;
    width: 50%;
    min-width: 300px;
    height: min-content;
    padding: 20px;
    color: $primary;

    #info_close {
      position: absolute;
      top: 10px;
      right: 10px;
    }
  }
}
</style>
