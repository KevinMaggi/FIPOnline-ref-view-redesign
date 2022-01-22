<template>
  <div id="rapporti">
    <h1>Rapporti</h1>
    <stagione v-on:change_season="season_changed($event)"></stagione>
    <div id="list">

    </div>
  </div>
</template>

<script>
import Stagione from "@/components/Stagione";

export default {
  name: "Rapporti",
  components: {Stagione},
  data: function () {
    return {}
  },
  methods: {
    season_changed(stagione) {
      alert(stagione)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
