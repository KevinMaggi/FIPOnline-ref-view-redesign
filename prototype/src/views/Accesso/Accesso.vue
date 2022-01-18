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
  align-items: center;
}

#logo {
  max-height: 50vh;
  margin: 25px auto;

  picture, img {
    max-width: 90%;
    max-height: 25vh;
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
  font-size: 24px;

  label {
    margin: 10px auto !important;
    font-weight: bold;
    color: $primary;
    max-width: 80%;

    span {
      margin: 0 !important;
      line-height: 54px;
    }

    input {
      border: 3px solid $primary !important;
      text-align: center !important;
      max-width: 200px;
      margin: 0 auto;
    }

    input, input:focus {
      color: $primary;
    }
  }

  input, button {
    border-radius: 15px !important;
  }

  button {
    border: 3px solid $primary !important;
    font-weight: bold;
    box-shadow: $shadow;
    align-items: center;

    span {
      margin: 0 5px;
      line-height: 36px;
    }
  }

  .alert {
    font-size: 20px;
    border-radius: 15px;
    margin: 0;
  }
}

a {
  display: block;
  font-size: 20px;
  margin: 10px auto;
  width: fit-content;
}
</style>
