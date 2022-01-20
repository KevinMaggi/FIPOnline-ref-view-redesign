<template>
  <div id="tesseramento">
    <section id="tess_sect">
      <h1>
        <span>Tesseramento</span>
        <button id="info" class="btn btn-primary">
          <span class="material-icons-round">info</span>
        </button>
      </h1>
      <span v-if="tesseramento_danger()" class="material-icons-round danger">error</span>
      <span v-else-if="tesseramento_warning()" class="material-icons-round warning">error</span>
      <span v-else class="material-icons-round success">check_circle</span>
      <span class="state">Stato:&nbsp;
        <span
          v-bind:class="{ danger: tesseramento_danger(), warning: tesseramento_warning(), success: (!tesseramento_danger() && !tesseramento_warning()) }">{{
            stato_tesseramento
          }}</span>
      </span>
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
  </div>
</template>

<script>
import Vue from "vue";

export default {
  name: "Tesseramento",
  data: function () {
    return {
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
    }
  },
  computed: {
    stato_tesseramento: function () {
      if (this.tesseramento_danger()) return 'da rinnovare (con mora)'
      else if (this.tesseramento_warning()) return 'da rinnovare (entro il ' + this.chiusura + ')'
      else return 'rinnovato'
    },
    stato_certificato: function () {
      if (this.certificato_danger()) return 'scaduto'
      else if (this.certificato_warning()) return 'in scadenza'
      else return 'in corso di validità'
    }
  },
  methods: {
    tesseramento_danger() {
      let today = Date.now()
      if (today > Vue.prototype.$chiusura_tesseramento.getTime() && !Vue.prototype.$rinnovo_tesseramento) {
        return true
      } else return false
    },
    tesseramento_warning() {
      let today = Date.now()
      if (today > Vue.prototype.$apertura_tesseramento.getTime() && today < Vue.prototype.$chiusura_tesseramento.getTime()) {
        return !Vue.prototype.$rinnovo_tesseramento;
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
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../styles/constants.scss";

#tesseramento {
  justify-content: space-evenly;
}

#tesseramento #tess_sect {
  h1 {
    padding-left: 30px;
  }

  #info {
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
}

#tesseramento #tess_sect, #tesseramento #cert_sect {
  display: flex;
  flex-direction: column;

  .material-icons-round {
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

</style>
