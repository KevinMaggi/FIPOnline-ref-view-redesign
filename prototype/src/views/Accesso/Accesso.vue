<template>
  <div id="accesso">
    <div class="container-md">
      <div id="logo">
        <picture>
          <source media="(min-width: 1400)" srcset="../../assets/Logo_blu_1000.png">
          <source media="(max-width: 400px)" srcset="../../assets/Logo_blu_250.png">
          <img src="../../assets/Logo_blu_500.png" alt="Logo FIP" class="img-fluid">
        </picture>
        <picture>
          <source media="(min-width: 1400)" srcset="../../assets/Logo_fiponline_big.png">
          <source media="(max-width: 400px)" srcset="../../assets/Logo_fiponline_small.png">
          <img src="../../assets/Logo_fiponline_medium.png" alt="Logo FIPOnline" class="img-fluid">
        </picture>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Accesso'
}
</script>

<style lang="scss">
#accesso {
  width: 100%;
  min-height: 100%;
  padding: 0;
  margin: 0;

  background-color: $secondary;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  #logo {
    max-height: 40vh;
    margin: 30px auto;

    @media screen and (max-width: 768px) {
      margin: 15px auto;
    }

    picture, img {
      max-width: 90%;
      max-height: 20vh;
      margin: 0 auto;
    }
  }

  form {
    background-color: white;
    padding: 20px;
    border-radius: 50px;
    box-shadow: $shadow;
    width: 90%;
    max-width: 500px;
    margin: 0 auto;

    label {
      margin: 10px auto !important;
      max-width: 80%;

      input {
        max-width: 200px;
      }
    }
  }

  @media screen and (max-width: 400px) {
    #logo {
      margin: 5px auto;
    }

    form {
      padding: 10px;

      label {
        margin: 0 auto !important;
      }
    }
  }

  a {
    display: block;
    font-size: 20px;
    margin: 10px auto;
    width: fit-content;

    &:hover {
      color: $info;
    }
  }
}
</style>
