<template>
  <div id="partite">
    <h1>Partite</h1>
    <stagione v-on:change_season="season_changed($event)"></stagione>

    <div class="accordion accordion-flush" id="list">
      <div class="accordion-item">
        <h2 class="accordion-header" id="da_accettare">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                  data-bs-target="#da_accettare_body" aria-expanded="false" aria-controls="da_accettare_body">
            Da accettare: {{ numero_da_accettare() }}
          </button>
        </h2>
        <div id="da_accettare_body" class="accordion-collapse collapse" aria-labelledby="da_accettare"
             data-bs-parent="#list">
          <div class="accordion-body">
            <gara
              v-for="gara in archivio_gare.filter(annata => annata.season === this.selected_season)[0].gare.filter(g => g.stato === 0)"
              :key="gara.numero" v-bind:elemento="gara">
            </gara>
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header" id="da_disputare">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                  data-bs-target="#da_disputare_body" aria-expanded="false" aria-controls="da_disputare_body">
            Da disputare: {{ numero_da_disputare() }}
          </button>
        </h2>
        <div id="da_disputare_body" class="accordion-collapse collapse" aria-labelledby="da_disputare"
             data-bs-parent="#list">
          <div class="accordion-body">
            <gara
              v-for="gara in archivio_gare.filter(annata => annata.season === this.selected_season)[0].gare.filter(g => {let today = Date.now(); return g.stato === 1 || (g.stato === 2 && today < g.datetime.getTime())})"
              :key="gara.numero" v-bind:elemento="gara" v-on:pianificazione="pianifica($event)">
            </gara>
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header" id="da_refertare">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                  data-bs-target="#da_refertare_body" aria-expanded="false" aria-controls="da_refertare_body">
            Da refertare: {{ numero_da_refertare() }}
          </button>
        </h2>
        <div id="da_refertare_body" class="accordion-collapse collapse" aria-labelledby="da_refertare"
             data-bs-parent="#list">
          <div class="accordion-body">
            <gara
              v-for="gara in archivio_gare.filter(annata => annata.season === this.selected_season)[0].gare.filter(g => {let today = Date.now(); return g.stato === 2 && today > g.datetime.getTime()})"
              :key="gara.numero" v-bind:elemento="gara">
            </gara>
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header" id="passate">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                  data-bs-target="#passate_body" aria-expanded="false" aria-controls="passate_body">
            Passate: {{ numero_passate() }}
          </button>
        </h2>
        <div id="passate_body" class="accordion-collapse collapse" aria-labelledby="passate" data-bs-parent="#list">
          <div class="accordion-body">
            <gara
              v-for="gara in archivio_gare.filter(annata => annata.season === this.selected_season)[0].gare.filter(g => g.stato === 4 || g.stato === 5)"
              :key="gara.numero" v-bind:elemento="gara">
            </gara>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Stagione from "@/components/Stagione";
import Gara from "@/components/Gara"

export default {
  name: "Partite",
  components: {Stagione, Gara},
  data: function () {
    return {
      selected_season: Vue.prototype.$stagioni[0],
      archivio_gare: Vue.prototype.$archivio_gare,
    }
  },
  methods: {
    season_changed(stagione) {
      this.selected_season = stagione
    },
    numero_da_accettare() {
      return this.archivio_gare.filter(annata => annata.season === this.selected_season)[0].gare.filter(gara => gara.stato === 0).length
    },
    numero_da_disputare() {
      return this.archivio_gare.filter(annata => annata.season === this.selected_season)[0].gare.filter(gara => {
        let today = Date.now();
        return gara.stato === 1 || (gara.stato === 2 && today < gara.datetime.getTime())
      }).length
    },
    numero_da_refertare() {
      return this.archivio_gare.filter(annata => annata.season === this.selected_season)[0].gare.filter(gara => {
        let today = Date.now();
        return gara.stato === 2 && today > gara.datetime.getTime()
      }).length
    },
    numero_passate() {
      return this.archivio_gare.filter(annata => annata.season === this.selected_season)[0].gare.filter(gara => gara.stato === 4 || gara.stato === 5).length
    },
    pianifica(gara) {
      this.$router.push('/pianificazione/' + this.selected_season.replaceAll(' ', '_').replaceAll('/', '_') + '/' + gara.numero)
    }
  }
}
</script>

<style lang="scss">
#partite {

}
</style>
