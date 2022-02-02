<template>
  <div class="overlay overlay-action" @click="$emit('add_close')">
    <div id="info" @click.stop>
      <button id="info_close" class="btn btn-primary btn-circle-small" @click="$emit('add_close')">
        <span class="material-icons-round">clear</span>
      </button>
      <h2>Aggiungi tappa</h2>
      <div class="content">
        <div class="line">
          <span class="form-label label">Voce:</span>
          <select class="form-select select-small" v-model="voce" aria-label="voce">
            <option value="auto propria" selected>Auto propria</option>
            <option value="autobus">Autobus</option>
            <option value="aereo">Aereo</option>
            <option value="noleggio auto">Noleggio auto</option>
            <option value="parcheggio">Parcheggio</option>
            <option value="taxi">Taxi</option>
            <option value="traghetto">Traghetto</option>
            <option value="treno">Treno</option>
          </select>
        </div>

        <div class="line" v-if="voce !== 'noleggio auto' && voce !== 'parcheggio'">
          <span class="form-label label">Partenza:</span>
          <div class="check-group">
            <div class="form-check">
              <label class="form-check-label">
                <input class="form-check-input" type="radio" name="partenza" value="abitazione" v-model="partenza">
                <span>abitazione</span>
              </label>
            </div>
            <div class="form-check">
              <label class="form-check-label">
                <input class="form-check-input" type="radio" name="partenza" value="campo di gioco" v-model="partenza">
                <span>campo di gioco</span>
              </label>
            </div>
            <div class="form-check">
              <label class="form-check-label">
                <input class="form-check-input" type="radio" name="partenza" value="località generica"
                       v-model="partenza">
                <span>località generica:</span>
              </label>
              <input type="text" class="form-control input-small" id="part_gen" v-model="part_gen"
                     :disabled="partenza !== 'località generica'" aria-label="località generica di partenza"
                     placeholder="località">
            </div>
          </div>
        </div>

        <div class="line" v-if="voce !== 'noleggio auto' && voce !== 'parcheggio'">
          <span class="form-label label">Destinazione:</span>
          <div class="check-group">
            <div class="form-check">
              <label class="form-check-label">
                <input class="form-check-input" type="radio" name="destinazione" value="abitazione"
                       v-model="destinazione">
                <span>abitazione</span>
              </label>
            </div>
            <div class="form-check">
              <label class="form-check-label">
                <input class="form-check-input" type="radio" name="destinazione" value="campo di gioco"
                       v-model="destinazione">
                <span>campo di gioco</span>
              </label>
            </div>
            <div class="form-check">
              <label class="form-check-label">
                <input class="form-check-input" type="radio" name="destinazione" value="località generica"
                       v-model="destinazione">
                <span>località generica:</span>
              </label>
              <input type="text" class="form-control input-small" id="dest_gen" v-model="dest_gen"
                     :disabled="destinazione !== 'località generica'" aria-label="località generica di destinazione"
                     placeholder="località">
            </div>
          </div>
        </div>

        <div class="line" v-if="voce !== 'auto propria'">
          <span class="form-label label">Importo:</span>
          <input type="number" class="form-control input-small" id="importo" step="0.01" min="0" v-model="importo"
                 aria-label="importo" placeholder="0">
        </div>

        <div class="line" v-if="voce === 'auto propria'">
          <div class="form-check form-switch">
            <label class="form-check-label">
              <input class="form-check-input" type="checkbox" v-model="conducente">
              <span>Sono il conducente</span>
            </label>
          </div>
        </div>

        <div class="line" v-if="voce !== 'parcheggio' && voce !== 'noleggio auto'">
          <div class="form-check form-switch">
            <label class="form-check-label">
              <input class="form-check-input" type="checkbox" v-model="tappa_simm">
              <span>Aggiungi anche tappa simmetrica</span>
            </label>
          </div>
        </div>

        <button type="submit" name="add" class="btn btn-primary btn-medium" v-on:click="add" :disabled="!check()">
          <span class="material-icons-round">save</span>
          <span>Salva tappa</span>
        </button>

        <div class="links">
          <span>Link utili:</span>
          <span><a href="#">Google Maps</a></span>
          <span v-if="voce === 'auto propria'"><a href="#">Waze</a></span>
          <span v-if="voce === 'auto propria'"><a href="#">ViaMichelin</a></span>
          <span v-if="voce === 'noleggio auto'"><a href="#">Hertz</a></span>
          <span v-if="voce === 'treno'"><a href="#">Trenitalia</a></span>
          <span v-if="voce === 'treno'"><a href="#">Italo</a></span>
          <span v-if="voce === 'traghetto'"><a href="#">Grimaldi lines</a></span>
          <span v-if="voce === 'traghetto'"><a href="#">Moby</a></span>
          <span v-if="voce === 'aereo'"><a href="#">Ita</a></span>
          <span v-if="voce === 'aereo'"><a href="#">EasyJet</a></span>
          <span v-if="voce === 'aereo'"><a href="#">Ryanair</a></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  name: "Aggiungi_tappa",
  props: ['gara'],
  data: function () {
    return {
      voce: 'auto propria',
      partenza: null,
      destinazione: null,
      part_gen: '',
      dest_gen: '',
      conducente: true,
      tappa_simm: false,
      importo: 0.0,
    }
  },
  methods: {
    check() {
      let flag = false
      switch (this.voce) {
        case 'auto propria':
          if (this.partenza === 'abitazione' || this.partenza === 'campo di gioco' || (this.partenza === 'località generica' && this.part_gen !== ''))
            if (this.destinazione === 'abitazione' || this.destinazione === 'campo di gioco' || (this.destinazione === 'località generica' && this.dest_gen !== ''))
              flag = true
          break
        case 'autobus':
        case 'aereo':
        case 'taxi':
        case 'traghetto':
        case 'treno':
          if (this.partenza === 'abitazione' || this.partenza === 'campo di gioco' || (this.partenza === 'località generica' && this.part_gen !== ''))
            if (this.destinazione === 'abitazione' || this.destinazione === 'campo di gioco' || (this.destinazione === 'località generica' && this.dest_gen !== ''))
              if (this.importo > 0)
                flag = true
          break
        case 'noleggio auto':
        case 'parcheggio':
          if (this.importo > 0)
            flag = true
          break
      }

      return flag
    },
    add() {
      let totale = 0
      let sp = []
      let v, q, i
      switch (this.voce) {
        case 'auto propria':
          q = Math.floor(Math.random() * 20)
          if (this.conducente) {
            v = 'km da solo'
            i = q * Vue.prototype.$rimborso_km
          } else {
            v = 'km con collega'
            i = 0
          }

          sp.push({voce: v, quant: q, importo: i})
          totale += i

          if (Math.random() > 0.5) {
            v = 'pedaggio'
            q = 1
            i = parseInt((Math.random() * 5).toFixed(2))

            sp.push({voce: v, quant: q, importo: i})
            totale += i
          }
          break
        case 'autobus':
        case 'aereo':
        case 'taxi':
        case 'traghetto':
        case 'treno':
        case 'noleggio auto':
        case 'parcheggio':
          v = this.voce
          q = 1
          i = parseInt(this.importo)
          sp.push({voce: v, quant: q, importo: i})
          totale += i
          break
      }

      let da = (this.partenza === 'località generica') ? this.part_gen : this.partenza
      let a = (this.destinazione === 'località generica') ? this.dest_gen : this.destinazione

      this.gara.pianificazione.tappe_richieste.push({
        da: (da !== null) ? da : '-',
        a: (a !== null) ? a : '-',
        spese: sp
      })
      this.gara.pianificazione.totale_richiesto += totale

      if (this.tappa_simm) {
        this.gara.pianificazione.tappe_richieste.push({
          da: (a !== null) ? a : '-',
          a: (da !== null) ? da : '-',
          spese: sp
        })
        this.gara.pianificazione.totale_richiesto += totale
      }

      this.gara.stato = 2
      this.$emit('add_close')
    }
  }
}
</script>

<style scoped>

</style>
