<template>
  <div id="cambiopw">
    <h1>Cambio password</h1>

    <div id="info">
      <p>La password deve essere lunga almeno 8 caratteri e deve contenere:</p>
      <ul>
        <li>almeno una lettera maiuscola e una minuscola</li>
        <li>almeno una cifra</li>
        <li>almeno un carattere speciale (%, &, €...)</li>
      </ul>
    </div>

    <form autocomplete="on" v-if="!changed">
      <label class="row label-medium" id="old_pw">
        <span class="col-md">Vecchia password:</span>
        <input class="col-md form-control input-medium" type="password" name="password"
               autocomplete="current-password"
               required
               v-model="old_password">
      </label>
      <div v-if="error_pw" class="alert alert-danger" role="alert">Password errata</div>
      <label class="row label-medium" id="new_pw">
        <span class="col-md">Nuova password:</span>
        <input class="col-md form-control input-medium" type="password" name="password"
               autocomplete="off"
               required
               v-model="new_password">
      </label>
      <label class="row label-medium" id="new_pw_r">
        <span class="col-md">Ripeti nuova password:</span>
        <input class="col-md form-control input-medium" type="password" name="password"
               autocomplete="off"
               required
               v-model="new_password_r">
      </label>
      <div v-if="warning" class="alert alert-warning" role="alert">Compilare tutti i campi</div>
      <div v-if="warning_invalid" class="alert alert-warning" role="alert">La nuova password non soddisfa i requisiti
      </div>
      <div v-if="warning_different" class="alert alert-warning" role="alert">Le password non corrispondono</div>
      <button type="submit" name="recuperapw" id="updatepw_btn" class="btn btn-primary btn-medium" v-on:click="reset">
        <span class="material-icons-round">vpn_key</span>
        <span>Aggiorna password</span>
      </button>
    </form>

    <transition name="fade">
      <div v-if="changed" class="success">
        Password cambiata con successo
      </div>
    </transition>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  name: "CambioPw",
  data: function () {
    return {
      changed: false,
      old_password: '',
      new_password: '',
      new_password_r: '',
      warning_invalid: false,
      warning_different: false,
      warning: false,
      error_pw: false,
    }
  },
  methods: {
    reset(e) {
      e.preventDefault()

      this.warning_invalid = false
      this.warning_different = false
      this.warning = false
      this.error_pw = false

      document.getElementById('updatepw_btn').blur()
      if (this.new_password !== '' && this.old_password !== '' && this.new_password_r !== '') {
        if (this.old_password === Vue.prototype.$pw) {
          if (this.new_password === this.new_password_r) {
            if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@€$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/.test(this.new_password)) {
              this.changed = true
              Vue.prototype.$pw = this.new_password
            } else this.warning_invalid = true
          } else this.warning_different = true
        } else this.error_pw = true
      } else this.warning = true
    }
  }
}
</script>

<style lang="scss" scoped>
#cambiopw {
  color: $primary;
  align-items: center;

  #info {
    text-align: left;

    > * {
      width: fit-content;
      margin: auto;
    }
  }

  form {
    width: 90%;
    margin: 5px auto;

    label {
      margin: 10px auto !important;
      max-width: 80%;
    }

    label#old_pw {
      margin-bottom: 40px !important;
    }
  }

  @media screen and (max-width: 400px) {
    label span {
      padding: 0 !important;
    }
  }

  .success {
    font-size: 36px;
    font-weight: bold;
  }
}
</style>
