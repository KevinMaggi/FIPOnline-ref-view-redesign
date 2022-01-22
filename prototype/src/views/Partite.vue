<template>
  <div id="partite">
    <h1>Partite</h1>
    <stagione></stagione>
    <router-link to="/pianificazione/0000">pianificazione</router-link>
  </div>
</template>

<script>
import Stagione from "@/components/Stagione";

export default {
  name: "Partite",
  components: {Stagione}
}
</script>

<style lang="scss" scoped>

</style>
