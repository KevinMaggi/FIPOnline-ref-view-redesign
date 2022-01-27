<template>
  <div id="rimborsi">
    <h1>Rimborsi</h1>
    <stagione v-on:change_season="season_changed($event)"></stagione>

    <p v-if="Object.keys(current_archivio()).length === 0"
       id="empty-list">
      <span>Nessun rimborso presente</span>
    </p>
    <section v-else v-for="comitato in Object.keys(current_archivio())" :key="comitato">
      <h2>{{ comitato }}</h2>
      <div class="accordion" v-bind:id="comitato.replaceAll(' ','_')">
        <div class="accordion-item" v-for="rimborso in Object.keys(current_archivio()[comitato])" :key="rimborso">
          <h3 class="accordion-header" v-bind:id="'rimborso_'+rimborso.replaceAll('/','_')+'_header'">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                    v-bind:data-bs-target="'#rimborso_'+rimborso.replaceAll('/','_')" aria-expanded="false"
                    v-bind:aria-controls="'rimborso_'+rimborso.replaceAll('/','_')">
              <span v-if="rimborso !== ''">Data liquidazione: {{ rimborso }}</span>
              <span v-else>Da liquidare</span>
              <span>Importo: {{ current_archivio()[comitato][rimborso].totale.toFixed(2) }}€</span>
            </button>
          </h3>
          <div v-bind:id="'rimborso_'+rimborso.replaceAll('/','_')" class="accordion-collapse collapse"
               v-bind:aria-labelledby="'rimborso_'+rimborso.replaceAll('/','_')+'_header'"
               v-bind:data-bs-parent="'#'+comitato.replaceAll(' ','_')">
            <div class="accordion-body">
              <p v-for="partita in current_archivio()[comitato][rimborso].lista" :key="partita.numero">
                <span>N. <router-link
                  v-bind:to="'/pianificazione/' + selected_season.replaceAll(' ', '_').replaceAll('/', '_') + '/' + partita.numero">{{ partita.numero }}</router-link> del {{
                    partita.datetime.toLocaleDateString('it-IT', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit'
                    })
                  }}: {{ partita.pianificazione.totale_approvato.toFixed(2) }}€</span>
                <span>({{ partita.campionato }}: {{ partita.squadra_A }} - {{ partita.squadra_B }})</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <h2 id="totale"><span>Totale: </span> <span>{{ totale[selected_season] }}€</span></h2>
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
    }
  },
  computed: {
    archivio_rimborsi() {
      let archivio = Vue.prototype.$archivio_gare.map(k => ({...k}))    // trick for deep copy
      archivio.forEach(annata => {
        annata.gare = annata.gare.reduce(function (obj, value) {
          let key = value.comitato;
          if (obj[key] == null) obj[key] = [];

          obj[key].push(value);
          return obj;
        }, {})
        Object.keys(annata.gare).forEach(comitato => annata.gare[comitato] = annata.gare[comitato].reduce(function (obj, value) {
          let key = value.pianificazione.data_liquidazione
          if (obj[key] == null) obj[key] = {totale: 0, lista: []}

          obj[key].totale += value.pianificazione.totale_approvato
          obj[key].lista.push(value)
          return obj
        }, {}))
      })

      return archivio
    },
    totale() {
      let totali = {}
      this.archivio_rimborsi.forEach(annata => {
        let totale = 0
        Object.keys(annata.gare).forEach(comitato => {
          Object.keys(annata.gare[comitato]).forEach(rimborso => {
            totale += annata.gare[comitato][rimborso].totale
          })
        })
        totali[annata.season] = totale.toFixed(2)
      })
      return totali
    }
  },
  methods: {
    season_changed(stagione) {
      this.selected_season = stagione
    },
    current_archivio() {
      return this.archivio_rimborsi.filter(annata => annata.season === this.selected_season)[0].gare
    },
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

  #totale {
    font-weight: bold;

    span:last-of-type {
      font-style: italic;
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

    span {
      flex-grow: 1;

      &:last-of-type {
        font-size: smaller;
      }
    }
  }
}
</style>
