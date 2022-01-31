import Vue from "vue";

// Authentication
Vue.prototype.$auth = false

// User data
Vue.prototype.$tessera = 'A000000'
Vue.prototype.$pw = 'password'
Vue.prototype.$email = 'user@email.com'
Vue.prototype.$ruolo = 'ref'

// Tesseramento e certificato
Vue.prototype.$apertura_tesseramento = new Date(2022, 0, 1)
Vue.prototype.$chiusura_tesseramento = new Date(2022, 6, 15)
Vue.prototype.$rinnovo_tesseramento = false;
Vue.prototype.$rinnovo_richiesto = false;
Vue.prototype.$costo_tesseramento = 14;
Vue.prototype.$costo_tesseramento_mora = 24;
Vue.prototype.$stagione = '2021/2022';
Vue.prototype.$scadenza_certificato = new Date(2022, 7, 15)

// gettoni e rimborsi
Vue.prototype.$rimborso_km = 0.23
Vue.prototype.$gettoni_ref = [
  {'Categorie': 'C Gold', 'Importo': 40, 'Importo >100km A/R': 55},
  {'Categorie': 'C Silver', 'Importo': 30, 'Importo >100km A/R': 42},
  {'Categorie': 'D, B/F, Open', 'Importo': 25, 'Importo >100km A/R': 30},
  {'Categorie': 'Campionati d\'Eccellenza', 'Importo': 25, 'Importo >100km A/R': 37},
  {'Categorie': 'C/F, PM, 1DM', 'Importo': 25, 'Importo >100km A/R': 25},
  {'Categorie': 'da U16 a U20', 'Importo': 22, 'Importo >100km A/R': 22},
  {'Categorie': 'da U13 a U15', 'Importo': 20, 'Importo >100km A/R': 20},
]
Vue.prototype.$gettoni_udc = [
  {'Categorie': 'C Gold', 'Importo': 20},
  {'Categorie': 'C Silver', 'Importo': 20},
  {'Categorie': 'D, B/F, Open', 'Importo': 20},
  {'Categorie': 'Campionati d\'Eccellenza', 'Importo': 18},
  {'Categorie': 'C/F, PM, 1DM', 'Importo': 18},
  {'Categorie': 'da U16 a U20', 'Importo': 15},
  {'Categorie': 'da U13 a U15', 'Importo': 15},
]
Vue.prototype.$gettone_extra = 20

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
Vue.prototype.$archivio_gare = [
  {
    season: 'Stagione 2021/2022', gare: [
      {
        numero: '4997',
        comitato: 'Comitato Regionale Toscana',
        campionato: 'U13F', fase: 'Prima fase', girone: 'B', giornata: 2,
        datetime: new Date(2022, 1, 16, 18, 30), luogo: 'Via 1° Maggio, 59100, Prato',
        squadra_A: 'Cestistica rosa Prato', squadra_B: 'Pallacanestro femminile Porcari',
        squadra_CIA: [
          {ruolo: 'Primo arbitro', nome: 'Kevin Maggi'},
        ],
        stato: 0,  // 0: non accettata, 1: accettata da pianificare, 2: pianificata / da refertare, 4: refertata da omologare, 5: omologata
        pianificazione: {
          tappe_richieste: [
            {
              da: '', a: '', spese: []
            },
            {
              da: '', a: '', spese: []
            }
          ],
          gettoni: [
            {voce: 'Gettone', importo: 20},
            {voce: 'SMS + francobollo', importo: 1},
          ],
          totale_richiesto: 20, totale_approvato: null,
          stato_rimborso: 0, // 0: da liquidare, 1: in liquidazione, 2: liquidata
        },
        punteggio_squadra_A: null, punteggio_squadra_B: null, referto: ''
      },
      {
        numero: '1470',
        comitato: 'Comitato Regionale Toscana',
        campionato: 'PM', fase: 'Prima fase', girone: 'A', giornata: 13,
        datetime: new Date(2022, 1, 6, 18, 30), luogo: 'Via T. Alderotti 26, 50136, Firenze',
        squadra_A: 'Laurenziana Basket', squadra_B: 'Unione sportiva Affrico',
        squadra_CIA: [
          {ruolo: 'Primo arbitro', nome: 'Alessandro Sizzi'},
          {ruolo: 'Secondo arbitro', nome: 'Kevin Maggi'},
          {ruolo: 'Segnapunti', nome: 'Marco Checcacci'},
        ],
        stato: 1,  // 0: non accettata, 1: accettata da pianificare, 2: pianificata / da refertare, 4: refertata da omologare, 5: omologata
        pianificazione: {
          tappe_richieste: [
            {
              da: '', a: '', spese: []
            },
            {
              da: '', a: '', spese: []
            }
          ],
          gettoni: [
            {voce: 'Gettone', importo: 25},
          ],
          totale_richiesto: 25, totale_approvato: null,
          stato_rimborso: 0, // 0: da liquidare, 1: in liquidazione, 2: liquidata
        },
        punteggio_squadra_A: null, punteggio_squadra_B: null, referto: ''
      },
      {
        numero: '2935',
        comitato: 'Comitato Regionale Toscana',
        campionato: 'U19S', fase: 'Prima fase', girone: 'E', giornata: 12,
        datetime: new Date(2022, 1, 5, 19, 0), luogo: 'Via Sassetti 1, 50018, Scandicci',
        squadra_A: 'Scandicci Basket', squadra_B: 'Scuola Basket Prato',
        squadra_CIA: [
          {ruolo: 'Primo arbitro', nome: 'Kevin Maggi'},
        ],
        stato: 2,  // 0: non accettata, 1: accettata da pianificare, 2: pianificata / da refertare, 4: refertata da omologare, 5: omologata
        pianificazione: {
          tappe_richieste: [
            {
              da: 'abitazione', a: 'campo di gioco', spese: [
                {voce: 'km da solo', quant: 21, importo: 5.04},
                {voce: 'pedaggio', quant: 1, importo: 0.9}
              ]
            },
            {
              da: 'campo di gioco', a: 'abitazione', spese: [
                {voce: 'km da solo', quant: 21, importo: 5.04},
                {voce: 'pedaggio', quant: 1, importo: 0.9}
              ]
            }
          ],
          gettoni: [
            {voce: 'Gettone', importo: 22},
            {voce: 'SMS + francobollo', importo: 1}
          ],
          totale_richiesto: 34.88, totale_approvato: null,
          stato_rimborso: 0, // 0: da liquidare, 1: in liquidazione, 2: liquidata
        },
        punteggio_squadra_A: null, punteggio_squadra_B: null, referto: ''
      },
      {
        numero: '2641',
        comitato: 'Comitato Regionale Toscana',
        campionato: 'U19G', fase: 'Prima fase', girone: 'B', giornata: 12,
        datetime: new Date(2022, 0, 31, 18, 20), luogo: 'Via Toscanini 2, 59100, Prato',
        squadra_A: 'Prato Basket Giovane', squadra_B: 'Folgore Fucecchio',
        squadra_CIA: [
          {ruolo: 'Primo arbitro', nome: 'Kevin Maggi'},
          {ruolo: 'Secondo arbitro', nome: 'Eduardo Christian Mori'},
          {ruolo: 'Segnapunti', nome: 'Claudia Santi'},
          {ruolo: 'Cronometrista', nome: 'Claudia Dini'},
          {ruolo: '24 secondi', nome: 'Lorenzo Bezzi'},
        ],
        stato: 2,  // 0: non accettata, 1: accettata da pianificare, 2: pianificata / da refertare, 4: refertata da omologare, 5: omologata
        pianificazione: {
          tappe_richieste: [
            {
              da: 'abitazione', a: 'campo di gioco', spese: [
                {voce: 'km da solo', quant: 0, importo: 0}
              ]
            },
            {
              da: 'campo di gioco', a: 'abitazione', spese: [
                {voce: 'km da solo', quant: 0, importo: 0}
              ]
            }
          ],
          gettoni: [
            {voce: 'Gettone', importo: 22},
            {voce: 'SMS + francobollo', importo: 1}
          ],
          totale_richiesto: 23, totale_approvato: null,
          stato_rimborso: 0, // 0: da liquidare, 1: in liquidazione, 2: liquidata
        },
        punteggio_squadra_A: null, punteggio_squadra_B: null, referto: ''
      },
      {
        numero: '3188',
        comitato: 'Comitato Regionale Toscana',
        campionato: 'U17G', fase: 'Prima fase', girone: 'B', giornata: 11,
        datetime: new Date(2022, 0, 30, 11, 0), luogo: 'Via Boccaccio 13, 50060, Pelago',
        squadra_A: 'Valdisieve', squadra_B: 'CUS Firenze',
        squadra_CIA: [
          {ruolo: 'Primo arbitro', nome: 'Kevin Maggi'},
          {ruolo: 'Secondo arbitro', nome: 'Giovanni Belgodere'},
          {ruolo: 'Segnapunti', nome: 'Paolo Burchi'},
        ],
        stato: 4,  // 0: non accettata, 1: accettata da pianificare, 2: pianificata / da refertare, 4: refertata da omologare, 5: omologata
        pianificazione: {
          tappe_richieste: [
            {
              da: 'abitazione', a: 'Bagno a Ripoli', spese: [
                {voce: 'km da solo', quant: 24, importo: 5.76},
                {voce: 'pedaggio', quant: 1, importo: 2},
              ]
            },
            {
              da: 'Bagno a Ripoli', a: 'campo di gioco', spese: [
                {voce: 'km con collega', quant: 23, importo: 0},
              ]
            },
            {
              da: 'campo di gioco', a: 'Bagno a Ripoli', spese: [
                {voce: 'km con collega', quant: 23, importo: 0},
              ]
            },
            {
              da: 'Bagno a Ripoli', a: 'abitazione', spese: [
                {voce: 'km da solo', quant: 24, importo: 5.76},
                {voce: 'pedaggio', quant: 1, importo: 2},
              ]
            },
          ],
          gettoni: [
            {voce: 'Gettone', importo: 22},
            {voce: 'SMS + francobollo', importo: 1}
          ],
          totale_richiesto: 34.52, totale_approvato: null,
          stato_rimborso: 0, // 0: da liquidare, 1: in liquidazione, 2: liquidata
        },
        punteggio_squadra_A: 75, punteggio_squadra_B: 69, referto: '3188.pdf'
      },
      {
        numero: '1590',
        comitato: 'Comitato Regionale Toscana',
        campionato: 'PM', fase: 'Prima fase', girone: 'B', giornata: 1,
        datetime: new Date(2022, 0, 23, 18, 30), luogo: 'Via della pieve 58, 50067, Rignano sull\'Arno',
        squadra_A: 'Centro Minibasket Arno', squadra_B: 'Montespertoli',
        squadra_CIA: [
          {ruolo: 'Primo arbitro', nome: 'Kevin Maggi'},
          {ruolo: 'Secondo arbitro', nome: 'Alessandro Sizzi'},
          {ruolo: 'Segnapunti', nome: 'Paolo Burchi'},
        ],
        stato: 5,  // 0: non accettata, 1: accettata da pianificare, 2: pianificata / da refertare, 4: refertata da omologare, 5: omologata
        pianificazione: {
          tappe_richieste: [
            {
              da: 'abitazione', a: 'campo di gioco', spese: [
                {voce: 'km da solo', quant: 58, importo: 13.92},
                {voce: 'pedaggio', quant: 1, importo: 3.3}
              ]
            },
            {
              da: 'campo di gioco', a: 'abitazione', spese: [
                {voce: 'km da solo', quant: 58, importo: 13.92},
                {voce: 'pedaggio', quant: 1, importo: 3.3}
              ]
            },
          ],
          gettoni: [
            {voce: 'Gettone', importo: 25},
            {voce: 'SMS + francobollo', importo: 1}
          ],
          totale_richiesto: 60.44, totale_approvato: 60.44,
          stato_rimborso: 0, // 0: da liquidare, 1: in liquidazione, 2: liquidata
        },
        punteggio_squadra_A: 52, punteggio_squadra_B: 65, referto: '1590.pdf'
      },
      {
        numero: '1015',
        comitato: 'Comitato Regionale Toscana',
        campionato: 'U15E', fase: 'Prima fase', girone: 'A', giornata: 13,
        datetime: new Date(2022, 0, 16, 11, 30), luogo: 'Via T. Alderotti 26, 50136, Firenze',
        squadra_A: 'Laurenziana Basket', squadra_B: 'Biancorosso Empoli',
        squadra_CIA: [
          {ruolo: 'Primo arbitro', nome: 'Kevin Maggi'},
          {ruolo: 'Secondo arbitro', nome: 'Lorenzo Cima'},
          {ruolo: 'Segnapunti', nome: 'Marco Checcacci'},
          {ruolo: 'Cronometrista', nome: 'Claudio Indaco'}
        ],
        stato: 5,  // 0: non accettata, 1: accettata da pianificare, 2: pianificata / da refertare, 4: refertata da omologare, 5: omologata
        pianificazione: {
          tappe_richieste: [
            {
              da: 'abitazione', a: 'campo di gioco', spese: [
                {voce: 'km da solo', quant: 18, importo: 4.32},
                {voce: 'pedaggio', quant: 1, importo: 0.7}
              ]
            },
            {
              da: 'campo di gioco', a: 'abitazione', spese: [
                {voce: 'km da solo', quant: 18, importo: 4.32},
                {voce: 'pedaggio', quant: 1, importo: 0.7}
              ]
            },
          ],
          gettoni: [
            {voce: 'Gettone', importo: 25},
            {voce: 'SMS + francobollo', importo: 1}
          ],
          totale_richiesto: 36.04, totale_approvato: 35.84,
          stato_rimborso: 1, // 0: da liquidare, 1: in liquidazione, 2: liquidata
        },
        punteggio_squadra_A: 53, punteggio_squadra_B: 76, referto: '1015.pdf'
      },
      {
        numero: '3418',
        comitato: 'Comitato Regionale Toscana',
        campionato: 'U15S', fase: 'Prima fase', girone: 'F', giornata: 5,
        datetime: new Date(2021, 11, 12, 9, 30), luogo: 'Via Toscanini 2, 59100, Prato',
        squadra_A: 'Pallacanestro 2000 Prato', squadra_B: 'DLF Firenze Basket',
        squadra_CIA: [
          {ruolo: 'Primo arbitro', nome: 'Kevin Maggi'},
        ],
        stato: 5,  // 0: non accettata, 1: accettata da pianificare, 2: pianificata / da refertare, 4: refertata da omologare, 5: omologata
        pianificazione: {
          tappe_richieste: [
            {
              da: 'abitazione', a: 'campo di gioco', spese: [
                {voce: 'km da solo', quant: 0, importo: 0},
              ]
            },
            {
              da: 'campo di gioco', a: 'abitazione', spese: [
                {voce: 'km da solo', quant: 0, importo: 0},
              ]
            },
          ],
          gettoni: [
            {voce: 'Gettone', importo: 20},
            {voce: 'SMS + francobollo', importo: 1}
          ],
          totale_richiesto: 21, totale_approvato: 21,
          stato_rimborso: 2, // 0: da liquidare, 1: in liquidazione, 2: liquidata
        },
        punteggio_squadra_A: 42, punteggio_squadra_B: 68, referto: '3418.pdf'
      },
      {
        numero: '3600',
        comitato: 'Comitato Regionale Toscana',
        campionato: 'U17S', fase: 'Prima fase', girone: 'C', giornata: 5,
        datetime: new Date(2021, 11, 11, 16, 30), luogo: 'Via Pantano, 50045, Montemurlo',
        squadra_A: 'Lions Montemurlo Basket', squadra_B: 'Dany Quarrata',
        squadra_CIA: [
          {ruolo: 'Primo arbitro', nome: 'Kevin Maggi'},
        ],
        stato: 5,  // 0: non accettata, 1: accettata da pianificare, 2: pianificata / da refertare, 4: refertata da omologare, 5: omologata
        pianificazione: {
          tappe_richieste: [
            {
              da: 'abitazione', a: 'campo di gioco', spese: [
                {voce: 'km da solo', quant: 8, importo: 1.92},
              ]
            },
            {
              da: 'campo di gioco', a: 'abitazione', spese: [
                {voce: 'km da solo', quant: 9, importo: 2.16},
              ]
            },
          ],
          gettoni: [
            {voce: 'Gettone', importo: 22},
            {voce: 'SMS + francobollo', importo: 1}
          ],
          totale_richiesto: 27.08, totale_approvato: 27.32,
          stato_rimborso: 2, // 0: da liquidare, 1: in liquidazione, 2: liquidata
        },
        punteggio_squadra_A: 56, punteggio_squadra_B: 58, referto: '3600.pdf'
      },
    ]
  },
  {
    season: 'Stagione 2020/2021', gare: []
  },
  {
    season: 'Stagione 2019/2020', gare: []
  },
  {
    season: 'Stagione 2018/2019', gare: []
  },
  {
    season: 'Stagione 2017/2018', gare: []
  },
  {
    season: 'Stagione 2016/2017', gare: []
  },
  {
    season: 'Stagione 2015/2016', gare: []
  },
  {
    season: 'Stagione 2014/2015', gare: []
  }
]

// Rimborsi
Vue.prototype.$archivio_rimborsi = [
  {
    season: 'Stagione 2021/2022', rimborsi: [
      {
        comitato: 'Comitato Regionale Toscana', liquidazioni: [
          {
            data: new Date(2022, 0, 20),
            visualizzato: false,
            partite: ['1015']
          },
          {
            data: new Date(2022, 0, 5),
            visualizzato: true,
            partite: ['3600', '3418']
          }
        ]
      },
    ]
  },
  {season: 'Stagione 2020/2021', rimborsi: []}
]


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
