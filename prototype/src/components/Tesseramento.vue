<template>
  <section>
    <h1>
      <span>Tesseramento</span>
      <button id="info_btn" class="btn btn-primary btn-circle-small" @click="info_active = true">
        <span class="material-icons-round">info</span>
      </button>
    </h1>
    <span v-if="stato_tesseramento === 2" class="material-icons-round danger">error</span>
    <span v-else-if="stato_tesseramento === 1" class="material-icons-round warning">error</span>
    <span v-else class="material-icons-round success">check_circle</span>
    <span class="state">Stato:&nbsp;
        <span
          v-bind:class="{ danger: (stato_tesseramento === 2), warning: (stato_tesseramento === 1), success: (stato_tesseramento === 0) }">
          {{ stato_tesseramento_text }}
        </span>
      </span>
    <span v-if="rinnovo_richiesto && !rinnovo_tesseramento" class="state">Da pagare: {{ costo_attuale() }}€ </span>
    <button id="renew" class="btn btn-primary btn-medium" v-if="stato_tesseramento !== 0 && !rinnovo_richiesto"
            @click="richiedi_rinnovo()">
      <span class="material-icons-round">autorenew</span>
      <span>Richiedi rinnovo</span>
    </button>
    <button id="pay" class="btn btn-primary btn-medium" v-if="rinnovo_richiesto && !rinnovo_tesseramento"
            @click="paga()">
      <span class="material-icons-round">payment</span>
      <span>Paga</span>
    </button>

    <transition name="fade">
      <info_modal v-if="info_active" title="Info tesseramento" v-on:close="info_active = false">
        <p>Il tesseramento per la tua categoria prevede il pagamento di una quota pari a {{ costo }}€ qualora effettuato
          entro il {{ chiusura }}; dopo tale data è previsto il pagamento di una mora per un totale di {{
            costo_mora
          }}€.</p>
        <p>Per altre informazioni sul tesseramento e sulle tessere libero ingresso fare riferimento alla circolare di
          tesseramento relativa alla stagione {{ stagione }} reperibile sul <a href="https://www.fip.it/cia/">sito
            CIA</a>.</p>
      </info_modal>
    </transition>
  </section>
</template>

<script>
import info_modal from "@/components/info_modal";
import Vue from "vue";

export default {
  name: "Tesseramento",
  components: {info_modal},
  data: function () {
    return {
      // data from "database"
      stagione: Vue.prototype.$stagione,
      rinnovo_richiesto: Vue.prototype.$rinnovo_richiesto,
      rinnovo_tesseramento: Vue.prototype.$rinnovo_tesseramento,
      chiusura: Vue.prototype.$chiusura_tesseramento.toLocaleDateString('it-IT', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }),
      costo: Vue.prototype.$costo_tesseramento.toFixed(2),
      costo_mora: Vue.prototype.$costo_tesseramento_mora.toFixed(2),
      scadenza_certificato: Vue.prototype.$scadenza_certificato.toLocaleDateString('it-IT', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }),

      // data to compute
      stato_tesseramento: null, // 0 = rinnovato, 1 = tesseramento aperto, 2 = tesseramento "chiuso"
      stato_tesseramento_text: '',

      // utils
      info_active: false,
      interval: null,
    }
  },
  beforeDestroy: function () {
    clearInterval(this.interval)
  },
  mounted: function () {
    this.stato_tesseramento = this.get_stato_tesseramento()
    this.interval = setInterval(() => {
      this.stato_tesseramento = this.get_stato_tesseramento()
    }, 30000)
  },
  watch: {
    // update "database"
    rinnovo_richiesto: function () {
      Vue.prototype.$rinnovo_richiesto = this.rinnovo_richiesto
    },
    rinnovo_tesseramento: function () {
      Vue.prototype.$rinnovo_tesseramento = this.rinnovo_tesseramento
      this.stato_tesseramento = 0
    },
    // coupling data
    stato_tesseramento: function () {
      if (this.stato_tesseramento === 2) this.stato_tesseramento_text = 'da rinnovare (con mora)'
      else if (this.stato_tesseramento === 1) this.stato_tesseramento_text = 'da rinnovare (entro il ' + this.chiusura + ')'
      else this.stato_tesseramento_text = 'rinnovato'
    },
  },
  methods: {
    get_stato_tesseramento() {
      let today = Date.now()
      if (!this.rinnovo_tesseramento) {
        if (today > Vue.prototype.$chiusura_tesseramento.getTime()) {
          return 2
        } else if (today > Vue.prototype.$apertura_tesseramento.getTime()) {
          return 1
        } else return 0
      } else return 0
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

<style lang="scss">
#tess_sect {
  h1 {
    padding-left: 30px;
  }

  #info_btn {
    margin: 0 0 0 20px !important;
    position: relative;
    top: -5px;
  }
}
</style>
