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
      <p class="tappa"><span class="indice">Tappa {{ index + 1 }}</span>: da <span class="luogo">{{ tappa.da }}</span> a
        <span
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
          <td>{{ spesa.importo.toFixed(2) }}€</td>
        </tr>
        </tbody>
      </table>
    </div>

    <!-- gettoni -->
    <h2>Gettoni ed extra</h2>
    <div>
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
    </div>
    <h2>Totale richiesto: <span class="cifra">{{ partita.pianificazione.totale_richiesto.toFixed(2) }}€</span></h2>

    <!-- pulsanti -->
    <div id="buttons">
      <button v-if="Date.now() < partita.datetime.getTime()" id="add_btn" class="btn btn-success btn-circle-medium"
              @click="add = true">
        <span class="material-icons-round">add</span>
      </button>
      <button v-if="Date.now() < partita.datetime.getTime()" id="remove_btn" class="btn btn-danger btn-circle-medium"
              @click="remove = true">
        <span class="material-icons-round">remove</span>
      </button>
      <button id="info_btn" class="btn btn-info btn-circle-small" @click="info = true">
        <span class="material-icons-round">info</span>
      </button>
    </div>

    <!-- modals -->
    <transition name="fade">
      <div class="overlay overlay-info" v-if="info" @click="info = false">
        <div id="info" @click.stop>
          <button id="info_close" class="btn btn-primary btn-circle-small" @click="info = false">
            <span class="material-icons-round">clear</span>
          </button>
          <h2>Info rimborso</h2>
          <div class="content">
            <p>Il rimborso kilometrico attuale è {{ rimborso_km }}€/km.</p>
            <p>Sono previsti i seguenti gettoni:</p>
            <table class="table table-striped table-sm table-bordered">
              <thead>
              <tr>
                <th v-for="(col, name) in gettoni[0]" :key="name">{{ name }}</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="entry in gettoni" :key="entry + Math.random()">
                <td v-for="row in entry" :key="row + Math.random()">{{
                    row
                  }}{{ (typeof (row) === 'number') ? '€' : '' }}
                </td>
              </tr>
              </tbody>
            </table>
            <p v-if="ruolo === 'ref'">In caso di due gare a cavallo di un pasto o di arbitraggio singolo nelle categorie
              U20, PM e campionati d'Eccellenza è previsto un gettone extra di {{ gettone_extra }}€.</p>
          </div>
        </div>
      </div>
    </transition>

    <transition name="slide-fade">
      <cancella_tappa v-if="remove" v-on:remove_close="remove = false"
                      :gara="partita"></cancella_tappa>
    </transition>
    <transition name="slide-fade">
      <aggiungi_tappa v-if="add" v-on:add_close="add = false" :gara="partita"></aggiungi_tappa>
    </transition>
  </div>
</template>

<script>
import Vue from "vue";
import Cancella_tappa from "@/components/Cancella_tappa";
import Aggiungi_tappa from "@/components/Aggiungi_tappa";

export default {
  name: "Pianificazione",
  props: ['stagione', 'numero'],
  components: {/* eslint-disable vue/no-unused-components */Cancella_tappa, Aggiungi_tappa},
  data: function () {
    return {
      ruolo: Vue.prototype.$ruolo,
      partita: Vue.prototype.$archivio_gare.filter(annata => annata.season === this.stagione.replace('_', ' ').replace('_', '/'))[0].gare.filter(gara => gara.numero === this.numero)[0],
      collapsed: true,
      add: false,
      remove: false,
      info: false,

      rimborso_km: Vue.prototype.$rimborso_km,
      gettoni: (Vue.prototype.$ruolo === "ref") ? Vue.prototype.$gettoni_ref : Vue.prototype.$gettoni_udc,
      gettone_extra: Vue.prototype.$gettone_extra
    }
  },
}
</script>

<style lang="scss" scoped>
#pianificazione {
  padding-bottom: 75px;

  .details {
    width: 400px;
    max-width: 95%;
    margin: 0 auto;
    margin-bottom: 10px;
    border-bottom: 2px dotted #0055a2;

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

  > h2 {
    text-align: left;
  }

  > div {
    > p {
      text-align: left;
      margin-bottom: -5px;
    }

    > .table {
      width: fit-content !important;
      margin: 10px auto !important;

      * {
        color: black !important;
      }
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

    #add_btn {
      position: absolute;
      bottom: 20px;
      right: 20px;
    }

    #remove_btn {
      position: absolute;
      bottom: 20px;
      right: 90px;
    }

    #info_btn {
      position: absolute;
      left: 20px;
      bottom: 27px;
    }
  }
}
</style>
