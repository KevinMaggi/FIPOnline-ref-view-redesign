<template>
  <div id="anagrafica">
    <h1>Anagrafica</h1>
    <section>
      <h2>
        <span>Dati personali</span>
        <span>
          <button v-if="!modifying" class="btn btn-primary" @click="modifica()">
            <span class="material-icons-round">edit</span>
            <span>Modifica</span>
          </button>
          <button v-if="modifying" class="btn btn-danger" @click="annulla()">
            <span class="material-icons-round">cancel</span>
            <span>Annulla</span>
          </button>
          <button v-if="modifying" class="btn btn-success" @click="salva()">
            <span class="material-icons-round">save</span>
            <span>Salva</span>
          </button>
        </span>
      </h2>
      <div v-if="empty_fields" class="alert alert-danger" role="alert">Completa tutti i campi</div>
      <div class="accordion accordion-flush" id="personal_data">
        <div class="accordion-item" v-for="section in dati_personali" :key="section.title">
          <h2 class="accordion-header" v-bind:id="section.title.replaceAll(' ', '_')">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" aria-expanded="false"
                    v-bind:data-bs-target="'#' + section.title.replaceAll(' ', '_') + '_box'"
                    v-bind:aria-controls="section.title.replaceAll(' ', '_') + '_box'">
              {{ section.title }}
            </button>
          </h2>
          <div v-bind:id="section.title.replaceAll(' ', '_') + '_box'" class="accordion-collapse collapse"
               v-bind:aria-labelledby="section.title.replaceAll(' ', '_')" data-bs-parent="#personal_data">
            <div class="accordion-body">
              <div v-for="(entry) in section.data" :key="entry.name" class="entry">
                <span v-bind:id="entry.name.replaceAll(' ', '_') + '_label'"
                      class="label">{{ entry.name }}:&nbsp;</span>
                <span v-if="!section.modifiable">{{ entry.value }}</span>
                <input v-else-if="entry.type !== 'select'" v-bind:name="entry.name.replaceAll(' ', '_')"
                       v-bind:type="entry.type" class="form-control"
                       v-model="entry.value" v-bind:aria-labelledby="entry.name.replaceAll(' ', '_') + '_label'"
                       disabled spellcheck="false" autocomplete="off" autocorrect="off" required>
                <select v-else v-model="entry.value" v-bind:name="entry.name.replaceAll(' ', '_')" class="form-select"
                        v-bind:aria-labelledby="entry.name.replaceAll(' ', '_') + '_label'" disabled required>
                  <option v-for="option in entry.options" v-bind:key="option" v-bind:value="option">{{ option }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <hr>
    <section>
      <h2>Dati tesserato CIA</h2>

    </section>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  name: "Anagrafica",
  data: function () {
    return {
      // Deep copy of the "database" data because I want to memorize them persistently only on save
      dati_personali: JSON.parse(JSON.stringify(Vue.prototype.$dati_personali)),

      // utils
      modifying: false,
      empty_fields: false,
    }
  },
  methods: {
    modifica() {
      document.activeElement.blur()
      this.modifying = true
      let fields = document.querySelectorAll('input,select')
      for (let i = 0; i < fields.length; i++) {
        fields[i].disabled = false
      }
    },
    salva() {
      document.activeElement.blur()
      this.empty_fields = false
      let fields = document.querySelectorAll('input,select')
      for (let i = 0; i < fields.length; i++) {
        fields[i].classList.remove('danger')
        if (fields[i].value === '') {
          this.empty_fields = true
          fields[i].classList.add('danger')
        }
      }
      if (this.empty_fields) return
      this.modifying = false
      for (let i = 0; i < fields.length; i++) {
        fields[i].disabled = true
      }
      Vue.prototype.$dati_personali = this.dati_personali
    },
    annulla() {
      document.activeElement.blur()
      this.empty_fields = false
      this.modifying = false
      let fields = document.querySelectorAll('input,select')
      for (var i = 0; i < fields.length; i++) {
        fields[i].disabled = true
      }
      this.dati_personali = JSON.parse(JSON.stringify(Vue.prototype.$dati_personali))
    }
  }
}
</script>

<style lang="scss" scoped>
#anagrafica {
  color: $primary;

  .accordion-body {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly;

    .entry {
      margin: 5px 10px;
    }
  }

  input.danger {
    border-color: $danger !important;
  }

  .label {
    font-weight: bold;
  }

  input, select {
    display: inline;
    min-width: 250px;
    border-width: 1px !important;
  }

  h2 {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;

    .btn {
      font-size: smaller !important;
      padding: 5px 10px;
      margin: 5px !important;
    }
  }

  @media screen and (max-width: 400px) {
    h2 {
      justify-content: center;
    }
  }

  hr {
    width: 100%;
    border-top: 1px dashed $primary;
    opacity: 1;
    background-color: white;
    margin: 10px auto;
  }
}
</style>
