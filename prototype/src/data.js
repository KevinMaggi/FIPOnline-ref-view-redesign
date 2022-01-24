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

// Stagioni
Vue.prototype.$stagioni = ['Stagione 2021/2022', 'Stagione 2020/2021', 'Stagione 2019/2020', 'Stagione 2018/2019', 'Stagione 2017/2018', 'Stagione 2016/2017', 'Stagione 2015/2016', 'Stagione 2014/2015']

// Match

// Rimborsi

// Rapporti
Vue.prototype.$archivio_rapporti = [
  {
    season: 'Stagione 2021/2022', rapporti: [
      {
        gara_numero: '1111',
        campionato: 'Serie C Gold',
        data: '15/02/2022',
        match: 'Agliana - Laurenziana',
        visualizzato: false
      },
      {
        gara_numero: '0000',
        campionato: 'Serie C Silver',
        data: '15/12/2021',
        match: 'Livorno - CUS Pisa',
        visualizzato: true
      },
    ]
  },
  {
    season: 'Stagione 2020/2021', rapporti: [
      {
        gara_numero: '4444',
        campionato: 'Serie C Silver',
        data: '15/05/2021',
        match: 'Lucca - Montecatini',
        visualizzato: true
      },
      {
        gara_numero: '3333',
        campionato: 'Serie C Silver',
        data: '15/04/2021',
        match: 'Laurenziana - Mens Sana Siena',
        visualizzato: true
      },
      {
        gara_numero: '2222',
        campionato: 'Serie C Gold',
        data: '15/03/2021',
        match: 'Legnaia - Prato Dragons',
        visualizzato: true
      },
      {
        gara_numero: '1111',
        campionato: 'Serie C Silver',
        data: '15/02/2021',
        match: 'Quarrata - Montale',
        visualizzato: true
      },
      {
        gara_numero: '0000',
        campionato: 'Serie C Gold',
        data: '15/01/2021',
        match: 'Prato Dragons - Valdisieve',
        visualizzato: true
      },
    ]
  },
  {
    season: 'Stagione 2019/2020', rapporti: [
      {
        gara_numero: '1111',
        campionato: 'Serie D',
        data: '15/02/2020',
        match: 'Bellaria - Galli Basket',
        visualizzato: true
      },
      {
        gara_numero: '0000',
        campionato: 'Serie D',
        data: '15/01/2020',
        match: 'Sesto Fiorentino - Jokers',
        visualizzato: true
      },
    ]
  },
  {
    season: 'Stagione 2018/2019', rapporti: [
      {
        gara_numero: '3333',
        campionato: 'Serie D',
        data: '15/04/2019',
        match: 'Lucca - Calenzano Bulldogs',
        visualizzato: true
      },
      {
        gara_numero: '2222',
        campionato: 'Serie D',
        data: '15/03/2019',
        match: 'Castelfranco Frogs - Lella Basket',
        visualizzato: true
      },
      {
        gara_numero: '1111',
        campionato: 'Serie D',
        data: '15/02/2019',
        match: 'CUS Firenze - Campi Bisenzio',
        visualizzato: true
      },
      {gara_numero: '0000', campionato: 'Serie D', data: '15/01/2019', match: 'Livorno - Pino', visualizzato: true}
    ]
  },
  {
    season: 'Stagione 2017/2018', rapporti: [
      {gara_numero: '2222', campionato: 'Serie D', data: '15/03/2018', match: 'Chiesina - Livorno', visualizzato: true},
      {gara_numero: '1111', campionato: 'Serie D', data: '15/02/2018', match: 'Vaiano - Pescia', visualizzato: true},
      {
        gara_numero: '0000',
        campionato: 'Serie D',
        data: '15/01/2018',
        match: 'Montemurlo - Viareggio',
        visualizzato: true
      },
    ]
  },
  {
    season: 'Stagione 2016/2017', rapporti: [
      {
        gara_numero: '1111',
        campionato: 'Promozione',
        data: '15/02/2017',
        match: 'Montemurlo - Minibasket Lucca',
        visualizzato: true
      },
      {
        gara_numero: '0000',
        campionato: 'Promozione',
        data: '15/01/2017',
        match: 'Biancoverde - Figline V.no',
        visualizzato: true
      },
    ]
  },
  {
    season: 'Stagione 2015/2016', rapporti: [
      {
        gara_numero: '0000',
        campionato: 'Promozione',
        data: '15/01/2016',
        match: 'Prato Dragons - Laurenziana',
        visualizzato: true
      }
    ]
  },
  {
    season: 'Stagione 2014/2015', rapporti: []
  },
]
