import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Exercise from '../views/Exercise.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/exercise',
    name: 'Exercise',
    component: Exercise
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
