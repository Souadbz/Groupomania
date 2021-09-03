import Vue from 'vue'
import VueRouter from 'vue-router'
import Signup from '../views/Signup.vue'
import Login from "../views/Login.vue";
import Profile from "../views/Profile.vue";

Vue.use(VueRouter)

const routes = [{
    name: 'Signup',
    path: '/signup',
    component: Signup,
  },
  {
    name: 'Login',
    path: '/login',
    component: Login
  },
  {
    name: 'Profile',
    path: '/profile',
    component: Profile,
    props: true
  },
]



const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router