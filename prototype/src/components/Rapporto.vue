<template>
  <div class="gara">
    <p class="numero_gara">Gara n. {{ elemento.gara_numero }}</p>
    <span v-if="!elemento.visualizzato" class="material-icons-round bdg info">new_releases</span>
    <div>
      <button class="btn btn-circle-big" @click="open_rapporto"
              v-bind:class="{ 'btn-light' : elemento.visualizzato, 'btn-info' : !elemento.visualizzato}">
        <span class="material-icons-round">description</span>
        <span v-if="!elemento.visualizzato">Visualizza</span>
        <span v-else>Apri</span>
      </button>
      <div class="details">
        <p><span>Campionato:&nbsp;</span><span>{{ elemento.campionato }}</span></p>
        <p><span>Data:&nbsp;</span><span>{{ elemento.data }}</span></p>
        <p><span>Match:&nbsp;</span><span>{{ elemento.match }}</span></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Rapporto",
  props: {
    elemento: Object,
  },
  methods: {
    open_rapporto() {
      if (confirm('Sarà aperto il rapporto relativo alla gara ' + this.elemento.gara_numero + '\nCliccando su \'conferma\' simulerai la visualizzazione')) {
        this.elemento.visualizzato = true
      }
    }
  }
}
</script>

<style scoped>

</style>
