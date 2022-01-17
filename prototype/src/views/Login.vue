<template>
  <div id="login">
    <div class="container-md">
      <div id="logo">
        <picture>
          <source media="(min-width: 1400)" srcset="../assets/Logo_blu_1000.png">
          <source media="(max-width: 400px)" srcset="../assets/Logo_blu_250.png">
          <img src="../assets/Logo_blu_500.png" alt="Logo FIP" class="img-fluid">
        </picture>
        <picture>
          <source media="(min-width: 1400)" srcset="../assets/Logo_fiponline_big.png">
          <source media="(max-width: 400px)" srcset="../assets/Logo_fiponline_small.png">
          <img src="../assets/Logo_fiponline_medium.png" alt="Logo FIPOnline" class="img-fluid">
        </picture>
      </div>
      <form autocomplete="on">
        <label class="row">
          <span class="col-md form-label">Tessera CIA:</span>
          <input class="col-md form-control" type="text" placeholder="A000000" id="tessera" name="tessera"
                 spellcheck="false" autocomplete="username" autocapitalize="on" autocorrect="off" autofocus
                 minlength="7" maxlength="7" pattern="[a,A][0-9]{6}" required
                 v-model="tessera">
        </label>
        <label class="row">
          <span class="col-md form-label">Password:</span>
          <input class="col-md form-control" type="password" id="pw" name="password"
                 autocomplete="current-password"
                 required
                 v-model="password">
        </label>
        <button type="submit" name="login" id="login_btn" class="btn btn-primary" v-on:click="login">
          <span class="material-icons md-36">login</span>
          <span>Entra</span>
        </button>
      </form>
      <router-link to="/recupera-pw">Recupera password</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data: function () {
    return {
      tessera: '',
      password: ''
    }
  },
  methods: {
    login(e) {
      e.preventDefault()
      alert('before ' + this.$auth)
      if (this.tessera === 'A000000' && this.password === 'password') {
        this.$auth = true // FIXME
        alert('after ' + this.$auth)
        this.$router.push({path: '/'})
      } else {
        alert('riprova')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#login {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;

  background-color: $secondary;

  display: flex;
  align-items: center;
}

#logo {
  max-height: 50%; //TODO
  picture, img {
    max-width: 95%;
    display: block;
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
    margin: 10px auto;
    font-weight: bold;
    color: $primary;
    max-width: 75%;

    span {
      margin: 0;
      line-height: 54px;
    }

    input {
      border: 3px solid $primary;
      text-align: center;
      max-width: 200px;
      margin: 0 auto;
    }

    input, input:focus {
      color: $primary;
    }
  }

  input, button {
    border-radius: 15px;
  }

  button {
    border: 3px solid $primary;
    font-weight: bold;
    box-shadow: $shadow;

    span {
      margin: 0 10px;
      font-size: calc(100% + 12px);
      line-height: 100%;
    }
  }
}

a {
  display: block;
  font-size: 20px;
  margin: 10px auto;
  width: fit-content;
}
</style>
