<template>
  <div id="tesseramento">
    <tesseramento id="tess_sect"></tesseramento>

    <hr v-if="ruolo === 'ref'">

    <certificato id="cert_sect" v-if="ruolo === 'ref'"></certificato>
  </div>
</template>

<script>
import Vue from "vue";
import Tesseramento from "@/components/Tesseramento";
import Certificato from "@/components/Certificato";

export default {
  name: "Tess_cert",
  components: {Tesseramento, Certificato},
  data: function () {
    return {
      ruolo: Vue.prototype.$ruolo,
    }
  },
}
</script>

<style lang="scss" scoped>
@import "../styles/constants.scss";

#tesseramento {
  justify-content: space-evenly;

  #tess_sect, #cert_sect {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-grow: 1;

    ::v-deep > .material-icons-round {
      font-size: 48px;
      margin: 10px;
    }

    ::v-deep > .state {
      font-size: $text-big;
      font-weight: bold;
      color: $primary;
      margin: 10px;
    }
  }

  hr {
    width: 75%;
    border-top: 4px dashed $primary;
    opacity: 1;
    background-color: white;
    margin: 10px auto;
  }
}
</style>
