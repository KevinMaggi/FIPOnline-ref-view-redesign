import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Partite from '../views/Partite.vue'
import Rimborsi from '../views/Rimborsi.vue'
import Rapporti from '../views/Rapporti.vue'
import Tesseramento from '../views/Tesseramento'
import Anagrafica from '../views/Anagrafica'
import CambioPw from '../views/CambioPw'
import Pianificazione from '../views/Pianificazione.vue'
import Accesso from '../views/Accesso/Accesso.vue'
import Login from '../views/Accesso/Login.vue'
import RecuperaPw from '../views/Accesso/RecuperaPw.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/accesso',
    name: 'Accesso',
    component: Accesso,
    meta: {requiresAuth: false},
    children: [
      {
        path: 'login',
        name: 'Login',
        component: Login
      },
      {
        path: 'recupera-pw',
        name: 'RecuperaPw',
        component: RecuperaPw,
      },
    ]
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {requiresAuth: true}
  },
  {
    path: '/partite',
    name: 'Partite',
    component: Partite,
    meta: {requiresAuth: true}
  },
  {
    path: '/rimborsi',
    name: 'Rimborsi',
    component: Rimborsi,
    meta: {requiresAuth: true}
  },
  {
    path: '/rapporti',
    name: 'Rapporti',
    component: Rapporti,
    meta: {requiresAuth: true}
  },
  {
    path: '/tesseramento',
    name: 'Tesseramento',
    component: Tesseramento,
    meta: {requiresAuth: true}
  },
  {
    path: '/anagrafica',
    name: 'Anagrafica',
    component: Anagrafica,
    meta: {requiresAuth: true}
  },
  {
    path: '/cambio-pw',
    name: 'CambioPw',
    component: CambioPw,
    meta: {requiresAuth: true}
  },
  {
    path: '/pianificazione/:stagione/:numero',
    name: 'Pianificazione',
    component: Pianificazione,
    props: true,
    meta: {requiresAuth: true}
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !Vue.prototype.$auth) {
    next({path: '/accesso/login'})
  } else if (!to.meta.requiresAuth && Vue.prototype.$auth) {
    // FIXME without persistence and link to login/recupera-pw is impossible to reach them logged
    next({path: '/'})
  } else {
    next()
  }
})

export default router
