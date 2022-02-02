<template>
  <section class="home_section">
    <h1 class="section_name"><span>{{ name }}</span></h1>

    <slot></slot>
  </section>
</template>

<script>
export default {
  name: "home_section",
  props: ['name']
}
</script>

<style lang="scss">
@import "../styles/constants.scss";

.home_section {
  border: 4px dashed $primary;
  border-radius: 30px;
  margin: 25px 5px 0 5px;
  padding: 10px;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  position: relative;
  justify-content: space-around;

  .section_name {
    position: absolute;
    top: -20px;
    left: 0;

    span {
      margin: auto;
      padding: 0 20px;
      background-color: white;
    }
  }

  > div {
    flex-grow: 1;
    min-width: $button-wider-min-width;
    flex-direction: row;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }
}

@media screen and (max-width: 400px) {
  .home_section {
    padding: 10px 5px;
    margin: 20px 5px 5px 5px;

    h1 {
      font-size: $subtitle;
    }
  }
}
</style>
