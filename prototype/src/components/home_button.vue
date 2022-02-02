<template>
  <router-link :to="to" class="btn btn-secondary btn-home">
    <span class="material-icons-round">{{ icon }}</span>
    <span>{{ label }}</span>

    <slot></slot>
  </router-link>
</template>

<script>
export default {
  name: "home_button",
  props: ['to', 'icon', 'label']
}
</script>

<style lang="scss">
@import "../styles/constants.scss";

.btn-home {
  color: $primary !important;
  display: flex !important;
  flex-direction: column;
  font-size: $text-big !important;
  line-height: 1.25;
  height: 125px;
  width: $button-width;
  font-weight: bold;
  border-radius: 25px !important;
  flex-grow: 1;
  position: relative;
  margin: 10px !important;

  span {
    height: 60px;
    display: inline-flex;
    align-items: center;
    word-wrap: normal;
  }

  .material-icons-round {
    font-size: 48px;
  }

  &#partite {
    min-width: $button-wider-min-width;
    max-width: $button-wider-max-width;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    font-size: $subtitle !important;
    flex-grow: 10;

    #dettaglio_partite {
      border-left: 2px solid $primary;
      padding-left: 5px;
      padding-right: 20px;
      text-align: left;
      font-weight: normal;

      span {
        font-size: $text-small;
        line-height: 20px;
        height: 20px;

        span {
          font-style: italic;
        }

        .warning, .info {
          font-weight: bold;
        }
      }
    }
  }
}

@media screen and (max-width: 400px) {
  .btn-home {
    font-size: $text-medium !important;
    margin: 10px 5px !important;
    height: 100px;
    width: 125px;

    &#partite {
      font-size: $subsubtitle !important;
    }

    span {
      height: 40px;
    }
  }
}
</style>
