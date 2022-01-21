import Vue from "vue";

// Authentication
Vue.prototype.$auth = false

// User data
Vue.prototype.$tessera = 'A000000'
Vue.prototype.$pw = 'password'
Vue.prototype.$email = 'user@email.com'

// Tesseramento e certificato
Vue.prototype.$apertura_tesseramento = new Date(2022, 0, 1)
Vue.prototype.$chiusura_tesseramento = new Date(2022, 6, 15)
Vue.prototype.$rinnovo_tesseramento = false;
Vue.prototype.$rinnovo_richiesto = false;
Vue.prototype.$costo_tesseramento = 14;
Vue.prototype.$costo_tesseramento_mora = 24;
Vue.prototype.$stagione = '2021/2022';
Vue.prototype.$scadenza_certificato = new Date(2022, 7, 15)

// user registry
Vue.prototype.$dati_personali = [
  {
    title: 'Dati anagrafici', modifiable: false, data: [
      {name: 'Cognome', type: 'text', value: 'Rossi'},
      {name: 'Nome', type: 'text', value: 'Mario'},
      {name: 'Sesso', type: 'text', value: 'M'},
      {name: 'Codice fiscale', type: 'text', value: 'RSSMRA70A01H501S'},
      {name: 'Data di nascita', type: 'text', value: '01/01/1970'},
      {name: 'Luogo di nascita', type: 'text', value: 'Roma'},
      {name: 'Provincia di nascita', type: 'text', value: 'Roma'},
      {name: 'Nazione di nascita', type: 'text', value: 'Italia'},
      {name: 'Nazionalità', type: 'text', value: 'italiana'},
      {name: 'Cittadinanza', type: 'text', value: 'italiana'}
    ]
  },
  {
    title: 'Residenza e contatto', modifiable: true, data: [
      {name: 'Indirizzo di residenza', type: 'text', value: 'Via Milano 1'},
      {name: 'CAP', type: 'text', value: '00184'},
      {name: 'Provincia', type: 'text', value: 'Roma'},
      {name: 'Comune', type: 'text', value: 'Roma'},
      {name: 'Telefono', type: 'tel', value: '06000000'},
      {name: 'Cellulare', type: 'tel', value: '3470000000'},
      {name: 'Mail', type: 'email', value: 'user@email.com'},
    ]
  },
  {
    title: 'Documento', modifiable: true, data: [
      {
        name: 'Tipo documento',
        type: 'select',
        value: 'Carta d\'identità elettronica',
        options: ['Carta d\'identità', 'Carta d\'identità elettronica', 'Passaporto', 'Patente']
      },
      {name: 'Numero documento', type: 'text', value: 'CA00000AB'},
      {name: 'Scadenza', type: 'date', value: '2026-12-31'}
    ]
  },
  {
    title: 'Coordinate bancarie', modifiable: true, data: [
      {name: 'IBAN', type: 'text', value: 'IT00X0000000000000000000000'}
    ]
  },
  {
    title: 'Taglie', modifiable: true, data: [
      {name: 'Maglia', type: 'select', value: 'L', options: ['S', 'M', 'L']},
      {name: 'Pantaloni', type: 'select', value: 'L', options: ['S', 'M', 'L']},
      {name: 'Scarpe', type: 'select', value: '44', options: ['38', '39', '40', '41', '42', '43', '44', '45']},
      {name: 'Tuta', type: 'select', value: 'L', options: ['S', 'M', 'L']},
      {name: 'Giubbotto', type: 'select', value: 'L', options: ['S', 'M', 'L']}
    ]
  }
]
Vue.prototype.$dati_CIA = [
  {
    title: 'Ruolo',
    headers: ['Categoria', 'Ruolo', 'Qualifica'],
    records: [
      ['Tesserato CIA', 'Arbitro', 'Arbitro regionale'],
      ['Tesserato CIA', 'Istruttore', 'Istruttore provinciale']
    ]
  },
  {
    title: 'Storico tesseramento',
    headers: ['Tipo', 'Inizio', 'Fine', 'Abilitazione'],
    records: [
      ['Arbitro regionale', '01/07/2021', '-', 'Serie C, B/F (4a categoria)'],
      ['Arbitro regionale', '01/07/2020', '30/06/2021', 'Serie C, B/F (4a categoria)'],
      ['Arbitro regionale', '01/07/2019', '30/06/2020', 'Serie D, C/F (5a categoria)'],
      ['Arbitro regionale', '01/07/2018', '30/06/2019', 'Serie D, C/F (5a categoria)'],
      ['Arbitro regionale', '01/07/2017', '30/06/2018', 'Serie D, C/F (5a categoria)'],
      ['Arbitro regionale', '01/07/2016', '30/06/2017', 'Promozione (6a categoria)'],
      ['Arbitro regionale', '01/07/2015', '30/06/2016', 'Promozione (6a categoria)'],
      ['Arbitro regionale', '01/07/2014', '30/06/2015', 'Promozione (6a categoria)']
    ]
  },
  {
    title: 'Storico blocco',
    headers: ['Tipo blocco', 'Data inizio', 'Data fine', 'Note'],
    records: [
      ['Infortunio', '01/01/2017', '01/03/2017', ''],
    ]
  }
]

// Match

// Rimborsi

// Rapporti
