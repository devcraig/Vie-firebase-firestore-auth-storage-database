import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/store'
import Home from '@/views/Home'
import NoAuth_Home from '@/views/NoAuth_Home'
import SignIn from '@/views/SignIn'
import SignOut from '@/views/SignOut'
import SignUp from '@/views/SignUp'
import Profile from '@/views/Profile'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'prehome',
      component: NoAuth_Home
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/signin',
      name: 'signin',
      component: SignIn
    },
    {
      path: '/signout',
      name: 'signout',
      component: SignOut
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      meta: {
        authRequired: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.authRequired)) {
    if (!store.state.user) {
      next({
        path: '/signin',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
