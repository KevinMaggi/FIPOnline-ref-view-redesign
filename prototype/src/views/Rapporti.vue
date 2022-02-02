<template>
  <div id="rapporti">
    <h1>Rapporti</h1>
    <stagione v-on:change_season="season_changed($event)"></stagione>
    <p v-if="selected_season_rapporti().length === 0"
       id="empty-list">
      <span>Nessun rapporto presente</span>
    </p>
    <div v-else id="list">
      <rapporto v-for="rapporto in selected_season_rapporti()"
                v-bind:key="rapporto.gara_numero" v-bind:elemento="rapporto">
      </rapporto>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Stagione from "@/components/Stagione";
import Rapporto from "@/components/Rapporto"

export default {
  name: "Rapporti",
  components: {Stagione, Rapporto},
  data: function () {
    return {
      selected_season: Vue.prototype.$stagioni[0],
      archivio_rapporti: Vue.prototype.$archivio_rapporti,
    }
  },
  methods: {
    season_changed(stagione) {
      this.selected_season = stagione
    },
    selected_season_rapporti() {
      return this.archivio_rapporti.filter(annata => annata.season === this.selected_season)[0].rapporti
    }
  }
}
</script>

<style lang="scss" scoped>
#rapporti {
  #empty-list {
    font-size: $text-medium;
    color: $primary;
    margin: auto;
  }
}
</style>
