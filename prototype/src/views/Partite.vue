<template>
  <div id="partite">
    <h1>Partite</h1>
    <stagione v-on:change_season="season_changed($event)"></stagione>

    <div class="accordion accordion-flush" id="list">
      <!-- Da accettare -->
      <div class="accordion-item">
        <h2 class="accordion-header" id="da_accettare">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                  data-bs-target="#da_accettare_body" aria-expanded="false" aria-controls="da_accettare_body">
            <span>Da accettare: &nbsp;</span>
            <span>{{ da_accettare().length }}</span>
            <span v-if="da_accettare().length" class="material-icons-round bdg-inline warning">error</span>
          </button>
        </h2>
        <div id="da_accettare_body" class="accordion-collapse collapse" aria-labelledby="da_accettare">
          <div class="accordion-body">
            <gara v-for="gara in da_accettare()" :key="gara.numero" v-bind:elemento="gara"></gara>
          </div>
        </div>
      </div>

      <!-- Da disputare -->
      <div class="accordion-item">
        <h2 class="accordion-header" id="da_disputare">
          <button class="accordion-button" v-bind:class="{collapsed : !from_pian}" type="button"
                  data-bs-toggle="collapse" data-bs-target="#da_disputare_body" v-bind:aria-expanded="!from_pian"
                  aria-controls="da_disputare_body">
            <span>Da disputare: &nbsp;</span>
            <span>{{ da_pianificare().length + pianificate().length }}</span>
            <span v-if="da_pianificare().length"
                  class="material-icons-round bdg-inline info">notification_important</span>
          </button>
        </h2>
        <div id="da_disputare_body" class="accordion-collapse collapse" v-bind:class="{show : from_pian}"
             aria-labelledby="da_disputare">
          <div class="accordion-body">
            <gara v-for="gara in [...da_pianificare(), ...pianificate()]" :key="gara.numero" v-bind:elemento="gara"
                  v-on:pianificazione="pianifica($event)"></gara>
          </div>
        </div>
      </div>

      <!-- Da refertare -->
      <div class="accordion-item" v-if="ruolo === 'ref'">
        <h2 class="accordion-header" id="da_refertare">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                  data-bs-target="#da_refertare_body" aria-expanded="false" aria-controls="da_refertare_body">
            <span>Da refertare: &nbsp;</span>
            <span>{{ da_refertare().length }}</span>
            <span v-if="da_refertare().length" class="material-icons-round bdg-inline warning">error</span>
          </button>
        </h2>
        <div id="da_refertare_body" class="accordion-collapse collapse" aria-labelledby="da_refertare">
          <div class="accordion-body">
            <gara v-for="gara in da_refertare()" :key="gara.numero" v-bind:elemento="gara"></gara>
          </div>
        </div>
      </div>

      <!-- Passate -->
      <div class="accordion-item">
        <h2 class="accordion-header" id="passate">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                  data-bs-target="#passate_body" aria-expanded="false" aria-controls="passate_body">
            <span>Passate: &nbsp;</span>
            <span>{{ passate().length }}</span>
          </button>
        </h2>
        <div id="passate_body" class="accordion-collapse collapse" aria-labelledby="passate">
          <div class="accordion-body">
            <gara v-for="gara in passate()" :key="gara.numero" v-bind:elemento="gara"></gara>
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
      ruolo: Vue.prototype.$ruolo,
      selected_season: Vue.prototype.$stagioni[0],
      archivio_gare: Vue.prototype.$archivio_gare,

      // state
      from_pian: false,
    }
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (from.path.startsWith('/pianificazione/')) vm.from_pian = true
    });
  },
  methods: {
    season_changed(stagione) {
      this.selected_season = stagione
    },
    da_accettare() {
      return this.archivio_gare.filter(annata => annata.season === this.selected_season)[0].gare.filter(gara => gara.stato === 0)
    },
    da_pianificare() {
      return this.archivio_gare.filter(annata => annata.season === this.selected_season)[0].gare.filter(gara => {
        return gara.stato === 1
      })
    },
    pianificate() {
      return this.archivio_gare.filter(annata => annata.season === this.selected_season)[0].gare.filter(gara => {
        return (gara.stato === 2 && Date.now() < gara.datetime.getTime())
      })
    },
    da_refertare() {
      return this.archivio_gare.filter(annata => annata.season === this.selected_season)[0].gare.filter(gara => {
        let today = Date.now();
        return gara.stato === 2 && today > gara.datetime.getTime()
      })
    },
    passate() {
      return this.archivio_gare.filter(annata => annata.season === this.selected_season)[0].gare.filter(gara => {
        let today = Date.now();
        return (gara.stato === 4 || gara.stato === 5 || (this.ruolo === 'udc' && gara.stato === 2 && today > gara.datetime.getTime()))
      })
    },
    pianifica(gara) {
      this.$router.push('/pianificazione/' + this.selected_season.replaceAll(' ', '_').replaceAll('/', '_') + '/' + gara.numero)
    }
  }
}
</script>

<style lang="scss">
#partite {
  .accordion-item {
    border: none !important;

    .accordion-button {
      box-shadow: none !important;
      font-size: inherit !important;
      padding: 15px 0 !important;

      &:not(.collapsed) {
        background-color: white;
        border: none !important;
      }

      &::after {
        background-image: none;
      }

      &::before {
        flex-shrink: 0;
        width: 1.25rem;
        height: 1.25rem;
        margin-left: 0 !important;
        content: "";
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%230055A2'%3E%3Cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-size: 1.25rem;
        transition: transform 0.2s ease-in-out;
        transform: rotate(-90deg);
      }

      &:not(.collapsed)::before {
        transform: none;
      }

      > span:first-of-type {
        font-weight: bold;
        margin-left: 10px;
      }

      > span:nth-of-type(2) {
        font-style: italic;
      }

      > span.bdg-inline {
        margin-left: 10px;
      }
    }
  }
}
</style>
