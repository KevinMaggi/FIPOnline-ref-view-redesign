import Vue from "vue";

// Authentication
Vue.prototype.$auth = false

// User data
Vue.prototype.$tessera = 'A000000'
Vue.prototype.$pw = 'password'
Vue.prototype.$email = 'user@email.com'

// Tesseramento e certificato
Vue.prototype.$apertura_tesseramento = new Date(2022, 6, 1)
Vue.prototype.$chiusura_tesseramento = new Date(2022, 6, 15)
Vue.prototype.$rinnovo_tesseramento = true;
Vue.prototype.$costo_tesseramento = 14;
Vue.prototype.$scadenza_certificato = new Date(2022, 6, 15)

// Match

// Rimborsi

// Rapporti
