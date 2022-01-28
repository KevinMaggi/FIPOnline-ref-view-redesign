<template>
  <div id="pianificazione">
    <!-- heading e informazioni -->
    <h1>Gara {{ partita.numero }}</h1>
    <div class="details">
      <p><span>Campionato: </span><span>{{ partita.campionato }}</span></p>
      <p><span>Data e ora: </span><span>{{
          partita.datetime.toLocaleDateString('it-IT', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
          })
        }}</span></p>
      <p><span>Luogo: </span><span>{{ partita.luogo }}</span></p>
      <p v-if="!collapsed"><span>Match: </span><span>{{ partita.squadra_A }} - {{ partita.squadra_B }}</span></p>
      <p v-if="!collapsed"><span>Squadra CIA: </span>
        <span class="squadra_cia">
              <span v-for="membro in partita.squadra_CIA" :key="membro.ruolo">{{ membro.nome }} <span
                class="role">({{ membro.ruolo }})</span></span>
            </span>
      </p>
      <button class="toggle" v-bind:class="{rotate : !collapsed}" @click="collapsed = !collapsed"><span
        class="material-icons-round">arrow_drop_down</span></button>
    </div>

    <!-- tappe -->
    <h2>Tappe</h2>
    <div v-for="(tappa, index) in partita.pianificazione.tappe_richieste" :key="index">
      <p><span class="tappa">Tappa {{ index + 1 }}</span>: da <span class="luogo">{{ tappa.da }}</span> a <span
        class="luogo">{{ tappa.a }}</span></p>
      <table v-bind:id="'tappa'+index" class="table table-striped table-sm table-bordered">
        <thead>
        <tr>
          <th>Voce di spesa</th>
          <th>Quantità</th>
          <th>Importo</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="spesa in tappa.spese" :key="JSON.stringify(spesa)">
          <td>{{ spesa.voce }}</td>
          <td>{{ spesa.quant }}</td>
          <td>{{ spesa.importo }}€</td>
        </tr>
        </tbody>
      </table>
    </div>

    <!-- gettoni -->
    <h2>Gettoni ed extra</h2>
    <table id="gettoni" class="table table-striped table-sm table-bordered">
      <thead>
      <tr>
        <th>Voce</th>
        <th>Importo</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="gettone in partita.pianificazione.gettoni" :key="JSON.stringify(gettone)">
        <td>{{ gettone.voce }}</td>
        <td>{{ gettone.importo }}€</td>
      </tr>
      </tbody>
    </table>
    <h2>Totale richiesto: <span class="cifra">{{ partita.pianificazione.totale_richiesto }}€</span></h2>

    <!-- pulsanti -->
    <div id="buttons">
      <button id="add" class="btn btn-success btn-circle-medium" @click="add = true">
        <span class="material-icons-round">add</span>
      </button>
      <button v-if="Date.now() < partita.datetime.getTime()" id="remove" class="btn btn-danger btn-circle-medium"
              @click="remove = true">
        <span class="material-icons-round">remove</span>
      </button>
      <button v-if="Date.now() < partita.datetime.getTime()" id="info" class="btn btn-info btn-circle-small"
              @click="info = true">
        <span class="material-icons-round">info</span>
      </button>
    </div>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  name: "Pianificazione",
  props: ['stagione', 'numero'],
  data: function () {
    return {
      partita: Vue.prototype.$archivio_gare.filter(annata => annata.season === this.stagione.replace('_', ' ').replace('_', '/'))[0].gare.filter(gara => gara.numero === this.numero)[0],
      collapsed: true,
      add: false,
      remove: false,
      info: false,
    }
  }
}
</script>

<style lang="scss" scoped>
#pianificazione {
  padding-bottom: 75px;
  max-width: 750px;

  .details {
    width: fit-content;
    margin: 0 auto;

    p {
      margin: 0 0 0 10px !important;
      text-align: left;
      display: flex;
      flex-wrap: wrap;
      align-items: baseline;

      > span:first-of-type {
        font-weight: bold;
        white-space: nowrap;
      }

      > span:not(:first-of-type) {
        padding-left: 10px;
        font-style: italic;

        .role {
          font-size: smaller;

          &::after {
            content: '\A';
            white-space: pre;
          }
        }
      }
    }
  }

  .toggle {
    height: 30px;
    width: 30px;
    color: $primary;
    background-color: transparent;
    border: none;
    padding: 0;
    transition: transform 0.25s;

    .material-icons-round {
      font-size: 30px;
    }

    &.rotate {
      transform: rotate(-180deg);
    }
  }

  .tappa {
    font-weight: bold;
  }

  .luogo {
    font-style: italic;
  }

  h2 {
    text-align: left;
  }

  p {
    text-align: left;
    margin-bottom: -5px;
  }

  .table {
    width: fit-content !important;
    margin: 10px auto !important;

    * {
      color: black !important;
    }
  }

  .cifra {
    font-style: italic;
    color: black;
  }

  #buttons {
    background-color: white;
    position: fixed;
    bottom: 0;
    left: 0;
    height: 75px;
    width: 100vw;
    box-shadow: 0px -10px 5px white;

    #add {
      position: absolute;
      bottom: 20px;
      right: 20px;
    }

    #remove {
      position: absolute;
      bottom: 20px;
      right: 90px;
    }

    #info {
      position: absolute;
      left: 20px;
      bottom: 27px;
    }
  }
}
</style>
