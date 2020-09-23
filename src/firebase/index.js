import store from '@/store/store'
import Firebase from 'firebase'
import 'firebase/firestore'

const config = {
  apiKey: "AIzaSyBZhAsSxet9NRqYzQajGrsdxVXklpvMDIw",
  authDomain: "consilium-c139e.firebaseapp.com",
  databaseURL: "https://consilium-c139e.firebaseio.com",
  projectId: "consilium-c139e",
  storageBucket: "consilium-c139e.appspot.com",
  messagingSenderId: "200947524504"
}

export default {
  install: (Vue, options ) => {
    const firebase = Firebase.initializeApp(config)
    const auth = firebase.auth()
    Vue.prototype.$auth = {
      login: async (username, pass) => {
        return await auth.signInWithEmailAndPassword(username, pass)
      },
      logout: async () => {
        await auth.signOut()
      }
    }
    auth.onAuthStateChanged(user => {
      store.commit('updateUser',{ user })
      store.dispatch('fetchUserData')
    })
  }
}