import Vue from 'vue'
import VueRouter from 'vue-router'
import Signup from '../views/Signup.vue'
import Posts from "../views/Posts.vue";
import Account from "../views/Account.vue";
import Home from '../views/Home.vue'
import Administrateur from '../views/Administrateur.vue'


Vue.use(VueRouter)

const routes = [{
    name: 'Signup',
    path: '/signup',
    component: Signup,
  },
  {
    name: 'Home',
    path: '/',
    component: Home
  },
  {
    name: 'Posts',
    path: '/posts',
    component: Posts,
  },
  {
    name: 'Account',
    path: '/account',
    component: Account,
    props: true
  },
  {
    name: 'Administrateur',
    path: '/administrateur',
    component: Administrateur,
  },
]



const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router