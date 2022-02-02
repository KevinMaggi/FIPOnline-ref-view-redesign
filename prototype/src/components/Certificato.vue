<template>
  <section>
    <h1>Certificato medico</h1>
    <span v-if="stato_certificato === 2" class="material-icons-round danger">error</span>
    <span v-else-if="stato_certificato === 1" class="material-icons-round warning">error</span>
    <span v-else class="material-icons-round success">check_circle</span>
    <span class="state">Stato:&nbsp;
        <span
          v-bind:class="{ danger: (stato_certificato === 2), warning: (stato_certificato === 1), success: (stato_certificato === 0) }">
          {{ stato_certificato_text }}</span>
      </span>
    <span class="state">Scadenza: {{ scadenza_certificato }} </span>
  </section>
</template>

<script>
import Vue from "vue";

export default {
  name: "Certificato",
  data: function () {
    return {
      // data from "database"
      scadenza_certificato: Vue.prototype.$scadenza_certificato.toLocaleDateString('it-IT', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }),

      // data to compute
      stato_certificato: null, // 0 = valido, 1 = in scadenza, 2 = scaduto
      stato_certificato_text: '',
    }
  },
  mounted: function () {
    this.stato_certificato = this.get_stato_certificato()
  },
  watch: {
    // coupling data
    stato_certificato: function () {
      if (this.stato_certificato === 2) this.stato_certificato_text = 'scaduto'
      else if (this.stato_certificato === 1) this.stato_certificato_text = 'in scadenza'
      else this.stato_certificato_text = 'in corso di validità'
    }
  },
  methods: {
    get_stato_certificato() {
      let today = Date.now()
      if (today > Vue.prototype.$scadenza_certificato.getTime()) return 2
      else {
        let alert = new Date(Vue.prototype.$scadenza_certificato)
        alert.setDate(alert.getDate() - 30)
        if (today > alert.getTime()) return 1
        else return 0
      }
    }
  }
}
</script>

<style scoped>

</style>
