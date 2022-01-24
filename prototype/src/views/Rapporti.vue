<template>
  <div id="rapporti">
    <h1>Rapporti</h1>
    <stagione v-on:change_season="season_changed($event)"></stagione>
    <p v-if="archivio_rapporti.filter(annata => annata.season === selected_season)[0].rapporti.length === 0"
       id="empty-list">
      <span>Nessun rapporto presente</span>
    </p>
    <div v-else id="list">
      <div v-for="rapporto in archivio_rapporti.filter(annata => annata.season === selected_season)[0].rapporti"
           v-bind:key="rapporto.gara_numero" class="rapporto btn-secondary"
           @click="open_rapporto(selected_season, rapporto.gara_numero)">
        <p class="numero_gara">Gara n. {{ rapporto.gara_numero }}</p>
        <span v-if="!rapporto.visualizzato" class="material-icons-round bdg info">new_releases</span>
        <div>
          <span class="material-icons-round">description</span>
          <div class="details">
            <p><span>Campionato:&nbsp;</span><span>{{ rapporto.campionato }}</span></p>
            <p><span>Data:&nbsp;</span><span>{{ rapporto.data }}</span></p>
            <p><span>Match:&nbsp;</span><span>{{ rapporto.match }}</span></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Stagione from "@/components/Stagione";

export default {
  name: "Rapporti",
  components: {Stagione},
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
    open_rapporto(stagione, numero) {
      if (confirm('Sarà aperto il rapporto relativo alla gara ' + numero + ' della ' + stagione + '\nCliccando su \'conferma\' simulerai la visualizzazione')) {
        this.archivio_rapporti.filter(annata => annata.season === this.selected_season)[0].rapporti.filter(rapporto => rapporto.gara_numero === numero)[0].visualizzato = true
      }
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

  .rapporto {
    cursor: pointer;
    position: relative;

    border-radius: 25px;
    background-color: $secondary;
    box-shadow: $shadow;
    margin: 10px auto;
    padding: 10px;
    max-width: 500px;

    .numero_gara {
      font-size: $text-big;
      color: $primary;
    }

    > div {
      display: flex;
      flex-direction: row;
      align-items: center;

      .material-icons-round {
        font-size: 48px;
        margin-right: 10px;
      }

      .details p {
        margin: 0 !important;
        text-align: left;

        span:first-of-type {
          font-weight: bold;
          min-width: 105px;
          display: inline-block;
        }

        @media screen and (max-width: 400px) {
          span:first-of-type {
            min-width: auto;
          }
        }
      }
    }
  }
}
</style>
