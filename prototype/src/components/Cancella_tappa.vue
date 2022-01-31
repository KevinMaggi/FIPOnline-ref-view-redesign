<template>
  <div class="overlay overlay-action" @click="$emit('remove_close')">
    <div id="info" @click.stop>
      <button id="info_close" class="btn btn-primary btn-circle-small" @click="$emit('remove_close')">
        <span class="material-icons-round">clear</span>
      </button>
      <h2>Rimuovi tappe</h2>
      <div class="content">
        <div v-for="(tappa, index) in pianificazione.tappe_richieste" :key="index">
          <label class="form-check-label">
            <input class="form-check-input" type="checkbox" value="" @click="select(index)">
            <span class="tappa"><span class="indice">Tappa {{ index + 1 }}</span>: da <span class="luogo">{{
                tappa.da
              }}</span> a <span
              class="luogo">{{ tappa.a }}</span> ({{
                tappa.spese.reduce(function (acc, obj) {
                  return acc + obj.importo
                }, 0).toFixed(2)
              }}€)</span>
          </label>
        </div>

        <button type="submit" name="remove" class="btn btn-primary btn-medium" v-on:click="remove" :disabled="disabled">
          <span class="material-icons-round">delete</span>
          <span>Rimuovi</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Cancella_tappa",
  props: ['pianificazione'],
  data: function () {
    return {
      disabled: true,
      selected: Array(this.pianificazione.tappe_richieste.length).fill(0)
    }
  },
  methods: {
    remove() {
      for (let i = this.pianificazione.tappe_richieste.length - 1; i >= 0; i--) { // backward to allow multiple deletion
        if (this.selected[i]) {
          let cifra = this.pianificazione.tappe_richieste[i].spese.reduce(function (acc, obj) {
            return acc + obj.importo
          }, 0)
          this.pianificazione.tappe_richieste.splice(i, 1)
          this.pianificazione.totale_richiesto -= cifra
        }
      }

      this.$emit('remove_close')
    },
    select(index) {
      this.selected[index] = 1
      this.disabled = !document.querySelectorAll('input[type="checkbox"]:checked').length
    }
  }
}
</script>

<style scoped>

</style>
