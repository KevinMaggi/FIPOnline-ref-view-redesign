<template>
  <div id="pianificazione">
    <h1>Gara {{ numero }} del {{ stagione }}</h1>
  </div>
</template>

<script>
export default {
  name: "Pianificazione",
  props: ['stagione', 'numero'],
}
</script>

<style lang="scss" scoped>

</style>
