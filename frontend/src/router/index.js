import Vue from 'vue'
import VueRouter from 'vue-router'
import Signup from '../views/Signup.vue'
import Posts from "../views/Posts.vue";
import Profile from "../views/Profile.vue";
import Home from '../views/Home.vue'



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