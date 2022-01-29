<template>
  <div id="rimborsi">
    <h1>Rimborsi</h1>
    <stagione v-on:change_season="season_changed($event)"></stagione>

    <p v-if="current_archivio().rimborsi.length === 0"
       id="empty-list">
      <span>Nessun rimborso presente</span>
    </p>
    <section v-else v-for="rimborso in current_archivio().rimborsi" :key="rimborso.comitato">
      <h2>{{ rimborso.comitato }}</h2>
      <div class="accordion" v-bind:id="rimborso.comitato.replaceAll(' ','_')">
        <div class="accordion-item" v-for="liquidazione in rimborso.liquidazioni"
             :key="liquidazione.data.toDateString()">
          <h3 class="accordion-header" v-bind:id="'liquidazione_'+liquidazione.partite[0]+'_header'">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                    v-bind:data-bs-target="'#liquidazione_'+liquidazione.partite[0]" aria-expanded="false"
                    v-bind:aria-controls="'liquidazione_'+liquidazione.partite[0]" @click="visualizza(liquidazione)">
              <span>Data liquidazione: {{
                  liquidazione.data.toLocaleDateString('it-IT', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                  })
                }}</span>
              <span>Importo: <span class="cifra">{{ totale_liquidazione(liquidazione) }}€</span></span>
              <span v-if="!liquidazione.visualizzato" class="material-icons-round bdg-inline info">new_releases</span>
            </button>
          </h3>
          <div v-bind:id="'liquidazione_'+liquidazione.partite[0]" class="accordion-collapse collapse"
               v-bind:aria-labelledby="'liquidazione_'+liquidazione.partite[0]+'_header'"
               v-bind:data-bs-parent="'#'+rimborso.comitato.replaceAll(' ','_')">
            <div class="accordion-body">
              <p v-for="partita in liquidazione.partite" :key="partita">
                <span>N. {{ partita }}
                  del {{
                    get_partita(partita).datetime.toLocaleDateString('it-IT', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit'
                    })
                  }}:
                  <span class="cifra">{{
                      get_partita(partita).pianificazione.totale_approvato.toFixed(2)
                    }}€
                    <del
                      v-if="get_partita(partita).pianificazione.totale_approvato !== get_partita(partita).pianificazione.totale_richiesto"
                      class="danger">{{ get_partita(partita).pianificazione.totale_richiesto.toFixed(2) }}€</del>
                  </span>
                </span>
                <span>({{ get_partita(partita).campionato }}: {{
                    get_partita(partita).squadra_A
                  }} - {{ get_partita(partita).squadra_B }})</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <h2 class="totale"><span>Totale liquidato: </span> <span class="cifra">{{ totale() }}€</span></h2>

    <hr v-if="partite_da_liquidare().length !== 0">
    <section v-if="partite_da_liquidare().length !== 0">
      <div class="accordion" id="da_liquidare">
        <div class="accordion-item">
          <h2 class="accordion-header" id="da_liquidare_header">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                    data-bs-target="#da_liquidare_body" aria-expanded="false" aria-controls="da_liquidare_body">
              <span>Da liquidare: <span class="cifra">{{ totale_da_liquidare() }}€</span></span>
            </button>
          </h2>
          <div id="da_liquidare_body" class="accordion-collapse collapse" aria-labelledby="da_liquidare_header"
               data-bs-parent="da_liquidare">
            <div class="accordion-body">
              <p v-for="partita in partite_da_liquidare()" :key="partita.numero">
                <span>N. {{ partita.numero }}
                  del {{
                    partita.datetime.toLocaleDateString('it-IT', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit'
                    })
                  }}:
                  <span class="cifra">{{ partita.pianificazione.totale_approvato.toFixed(2) }}€</span></span>
                <span>({{ partita.campionato }}: {{ partita.squadra_A }} - {{ partita.squadra_B }})</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Vue from 'vue'
import Stagione from "@/components/Stagione";

export default {
  name: "Rimborsi",
  components: {Stagione},
  data: function () {
    return {
      selected_season: Vue.prototype.$stagioni[0],
      archivio_rimborsi: Vue.prototype.$archivio_rimborsi,
    }
  },
  methods: {
    season_changed(stagione) {
      this.selected_season = stagione
    },
    current_archivio() {
      return this.archivio_rimborsi.filter(annata => annata.season === this.selected_season)[0]
    },
    get_partita(numero) {
      return Vue.prototype.$archivio_gare.filter(annata => annata.season === this.selected_season)[0].gare.filter(gara => gara.numero === numero)[0]
    },
    totale_liquidazione(liquidazione) {
      let totale = 0
      liquidazione.partite.forEach(numero => {
        totale += this.get_partita(numero).pianificazione.totale_approvato
      })
      return totale.toFixed(2)
    },
    totale() {
      let totale = 0
      this.current_archivio().rimborsi.forEach(rimborso => rimborso.liquidazioni.forEach(liquidazione => liquidazione.partite.forEach(partita => totale += this.get_partita(partita).pianificazione.totale_approvato)))
      return totale.toFixed(2)
    },
    visualizza(liquidazione) {
      liquidazione.visualizzato = true
    },
    partite_da_liquidare() {
      return Vue.prototype.$archivio_gare.filter(annata => annata.season === this.selected_season)[0].gare.filter(gara => gara.pianificazione.stato_rimborso !== 2)
    },
    totale_da_liquidare() {
      let totale = 0
      this.partite_da_liquidare().forEach(gara => {
        if (gara.pianificazione.totale_approvato !== '')
          totale += gara.pianificazione.totale_approvato
        else
          totale += gara.pianificazione.totale_richiesto
      })
      return totale.toFixed(2)
    }
  }
}
</script>

<style lang="scss" scoped>
#rimborsi {
  #empty-list {
    font-size: $text-medium;
    color: $primary;
    margin: 20px auto;
  }

  .totale {
    font-weight: bold;
  }

  .cifra {
    font-style: italic;

    .danger {
      font-size: smaller;
    }
  }

  section {
    padding: 15px 0;
  }

  .accordion-button {
    display: flex;
    justify-content: space-between;

    span {
      flex-grow: 1;
    }
  }

  .accordion-body p {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;

    > span {
      flex-grow: 1;

      &:last-of-type {
        font-size: smaller;
      }
    }
  }

  hr {
    width: 100%;
    border-top: 1px dashed #0055a2;
    opacity: 1;
    background-color: white;
    margin: 10px auto;
  }
}
</style>
