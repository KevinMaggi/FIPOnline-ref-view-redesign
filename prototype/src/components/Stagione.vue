<template>
  <select id="stagione" name="stagione" class="form-select select-season" required
          v-model="selected" v-on:change="$emit('change_season', selected)">
    <option v-for="stagione in stagioni" v-bind:key="stagione" v-bind:value="stagione">{{ stagione }}</option>
  </select>
</template>

<script>
import Vue from 'vue'

export default {
  name: "Stagione",
  data: function () {
    return {
      stagioni: Vue.prototype.$stagioni,
      selected: Vue.prototype.$stagioni[0],
    }
  }
}
</script>

<style scoped>

</style>
