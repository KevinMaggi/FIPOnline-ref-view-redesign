<template>
  <div v-bind:id="'n' + elemento.numero" class="gara" @click="toggle">

    <!-- Header -->
    <h3 class="numero_gara">Gara n. {{ elemento.numero }}</h3>

    <!-- Badge -->
    <span v-if="stato === 0" class="material-icons-round bdg warning">error</span>
    <span v-else-if="stato === 1" class="material-icons-round bdg info">notification_important</span>
    <span v-else-if="stato === 3 && ruolo === 'ref'" class="material-icons-round bdg warning">error</span>

    <!-- Content -->
    <div>
      <!-- Buttons -->
      <button v-if="stato === 0" class="btn btn-success btn-circle-big" @click.stop="accetta"> <!-- Da accettare -->
        <span class="material-icons-round">check</span>
        <span>Accetta</span>
      </button>
      <button v-else-if="stato === 1" class="btn btn-info btn-circle-big" @click.stop="pianifica">
        <!-- Da pianificare -->
        <span class="material-icons-round">drive_eta</span>
        <span>Pianifica</span>
      </button>
      <button v-else-if="stato === 2" class="btn btn-light btn-circle-big" @click.stop="pianifica"> <!-- Pianificata -->
        <span class="material-icons-round">drive_eta</span>
        <span>Modifica</span>
      </button>
      <button v-else-if="stato === 3 && !modifying && ruolo === 'ref'" class="btn btn-warning btn-circle-big"
              @click.stop="referta"> <!-- Da refertare -->
        <span class="material-icons-round">scoreboard</span>
        <span>Referta</span>
      </button>
      <button v-else-if="stato === 4 && !modifying && ruolo === 'ref'" class="btn btn-light btn-circle-big"
              @click.stop="referta"> <!-- Refertata -->
        <span class="material-icons-round">scoreboard</span>
        <span>Modifica</span>
      </button>
      <button v-else-if="modifying" class="btn btn-success btn-circle-big" @click.stop="salva"> <!-- in modifica -->
        <span class="material-icons-round">check</span>
        <span>Salva</span>
      </button>
      <div v-else class="btn-circle-big"></div> <!-- omologata (placeholder) -->

      <!-- Details -->
      <div class="details">
        <div>
          <p><span>Campionato:</span><span>{{ elemento.campionato }}</span></p>
          <p><span>Data e ora:</span><span>{{
              elemento.datetime.toLocaleDateString('it-IT', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
              })
            }}</span></p>
          <p><span>Luogo:</span><span>{{ elemento.luogo }}</span></p>
        </div>
        <div v-if="!collapsed">
          <p><span>Match:</span><span>{{ elemento.squadra_A }} - {{ elemento.squadra_B }}</span></p>
          <p><span>Calendario:</span><span>{{ elemento.fase }} &blacktriangleright; girone {{ elemento.girone }} &blacktriangleright; giornata {{
              elemento.giornata
            }}</span></p>
          <p><span>Comitato:</span><span>{{ elemento.comitato }}</span></p>
          <p><span>Squadra CIA:</span>
            <span class="squadra_cia">
              <span v-for="membro in elemento.squadra_CIA" :key="membro.ruolo">{{ membro.nome }} <span
                class="role">({{ membro.ruolo }})</span></span>
            </span>
          </p>
        </div>

        <hr v-if="stato !== 0">

        <!-- Additional items -->
        <div v-if="stato === 1 || stato === 2"> <!-- da disputare -->
          <p><span>Rimborso richiesto:</span><span>{{ elemento.pianificazione.totale_richiesto.toFixed(2) }}€</span></p>
        </div>
        <div v-else-if="(stato === 3 || stato === 4) && ruolo === 'ref'" class="result"> <!-- da refertare -->
          <p>
            <span>Risultato:</span>
            <span>
              <input type="number" placeholder="Sq.A" required :disabled="!modifying" aria-label="punteggio squadra A"
                     class="form-control input-gara" @click.stop v-model="puntia">
              <span>&nbsp;-&nbsp;</span>
              <input type="number" placeholder="Sq.B" required :disabled="!modifying" aria-label="punteggio squadra B"
                     class="form-control input-gara" @click.stop v-model="puntib">
            </span>
          </p>
          <p>
            <span>Referto:</span>
            <span v-if="stato === 3 || modifying">
              <input type="file" required :disabled="!modifying" name="referto" v-bind:id="'referto_'+elemento.numero"
                     @click.stop class="form-control input-gara">
            </span>
            <span v-else>{{ elemento.referto }}</span>
          </p>
          <div v-if="error" class="alert alert-danger" role="alert">Controlla tutti i campi</div>
        </div>
        <div v-else-if="stato === 5 || (ruolo === 'udc' && (stato === 3 || stato === 4))"> <!-- omologata -->
          <p><span>Rimborso richiesto:</span><span class="danger">{{ elemento.pianificazione.totale_richiesto }}€</span>
          </p>
          <p><span>Rimborso approvato:</span><span class="success">{{
              elemento.pianificazione.totale_approvato
            }}€</span></p>
          <p><span>Stato rimborso:</span><span class="info">{{ stato_rimborso }}</span></p>
        </div>

      </div>
    </div>

    <!-- Toggle icon -->
    <button class="toggle" v-bind:class="{rotate : !collapsed}"><span
      class="material-icons-round">arrow_drop_down</span></button>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  name: "Gara",
  props: {
    elemento: Object,
  },
  data: function () {
    return {
      ruolo: Vue.prototype.$ruolo,

      // state flag
      collapsed: true,
      modifying: false,
      error: false,

      // local data
      stato: null, // 0: non accettata, 1: accettata, 2: pianificata, 3: disputata 4: refertata, 5: omologata
      puntia: '',
      puntib: '',
    }
  },
  mounted: function () { // initialization of local data
    if (this.elemento.stato === 0) this.stato = 0
    else if (this.elemento.stato === 1 && !this.expired) this.stato = 1
    else if (this.elemento.stato === 2 && !this.expired) this.stato = 2
    else if ((this.elemento.stato === 1 || this.elemento.stato === 2) && this.expired) this.stato = 3
    else if (this.elemento.stato === 4) this.stato = 4
    else this.stato = 5

    this.puntia = this.elemento.punteggio_squadra_A
    this.puntib = this.elemento.punteggio_squadra_B
  },
  watch: {
    // coupling local data to "database"
    stato: function () {
      if (this.stato !== 3) this.elemento.stato = this.stato
    }
  },
  computed: {
    expired: function () {
      let today = Date.now()
      return today > this.elemento.datetime.getTime()
    },
    stato_rimborso: function () {
      switch (this.elemento.pianificazione.stato_rimborso) {
        case 0:
          return 'da liquidare'
        case 1:
          return 'in liquidazione'
        case 2:
          return 'liquidato'
      }
      return null
    }
  },
  methods: {
    toggle() {
      this.collapsed = !this.collapsed
    },
    accetta() {
      this.stato = 1
    },
    pianifica() {
      //this.elemento.stato = 2   // otherwise router change prevent watcher's call
      this.$emit('pianificazione', this.elemento)
    },
    referta() {
      this.modifying = true
    },
    salva() {
      let referto = document.querySelector('#n' + this.elemento.numero + ' input[type="file"]').value
      if (this.puntia !== '' && this.puntia !== null && this.puntia >= 0 && this.puntib !== '' && this.puntib !== null && this.puntib >= 0 && referto !== '') {
        this.error = false
        this.modifying = false
        this.stato = 4
        this.elemento.punteggio_squadra_A = this.puntia
        this.elemento.punteggio_squadra_B = this.puntib
        this.elemento.referto = referto.substring(referto.lastIndexOf('\\') + 1, referto.length)
      } else {
        this.error = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.gara {
  .input-gara {
    border: 1px solid black !important;
    padding: 0 2.5px !important;
    color: black !important;
    margin: 2.5px 0 !important;

    &:disabled {
      -webkit-text-fill-color: black !important;
      opacity: 0.33;
    }
  }
}
</style>
