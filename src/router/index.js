import { createRouter, createWebHistory } from 'vue-router'
import store from "../store/index"


const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import("../views/home.vue")
  },
  {
    path: '/login',
    name: 'login',
    component: () => import("../components/login.vue")
  },
  {
    path: '/register',
    name: 'register',
    component: () => import("../components/register.vue")
  },

]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});



router.beforeEach((to, from, next) => {

  if (to.name == 'home' && !store.getters.isAuth) next({ name: 'login' })
  if (to.name !== 'home' && store.getters.isAuth) next({ name: 'home' })
  else next()

   
  
});



export default router
