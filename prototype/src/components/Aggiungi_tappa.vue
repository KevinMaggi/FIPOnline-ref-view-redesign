<template>
  <div class="overlay overlay-action" @click="$emit('add_close')">
    <div id="info" @click.stop>
      <button id="info_close" class="btn btn-primary btn-circle-small" @click="$emit('add_close')">
        <span class="material-icons-round">clear</span>
      </button>
      <h2>Aggiungi tappa</h2>
      <div class="content">
        <div class="line">
          <label class="form-label">Voce:</label>
          <select class="form-select select-small">
            <option value="auto propria" selected>Auto propria</option>
            <option value="autobus">Autobus</option>
            <option value="noleggio auto">Noleggio auto</option>
            <option value="parcheggio">Parcheggio</option>
            <option value="taxi">Taxi</option>
            <option value="traghetto">Traghetto</option>
            <option value="treno">Treno</option>
          </select>
        </div>


        <button type="submit" name="add" class="btn btn-primary btn-medium" v-on:click=";">
          <span class="material-icons-round">save</span>
          <span>Salva tappa</span>
        </button>

        <div class="links">
          <span>Link utili:</span>
          <span><a href="">Google Maps</a></span>
          <span><a href="">Waze</a></span>
          <span><a href="">ViaMichelin</a></span>
          <span><a href="">Trenitalia</a></span>
          <span><a href="">Italo</a></span>
          <span><a href="">Grimaldi lines</a></span>
          <span><a href="">Moby</a></span>
          <span><a href="">Ita</a></span>
          <span><a href="">EasyJet</a></span>
          <span><a href="">Ryanair</a></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Aggiungi_tappa",
  props: ['pianificazione']
}
</script>

<style scoped>

</style>
