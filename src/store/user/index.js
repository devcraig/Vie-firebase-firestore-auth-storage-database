import firebase from '../../Firebase/FirebaseInit'
export default {
  state: {
    user: null,
    currProj: null
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    setProj (state, payload) {
      state.currProj = payload
    },
    setURL (state, payload) {
      state.user.photoURL = payload
    }
  },
  actions: {
    editProfile ({dispatch, commit}, {user, file}) {
      commit('setLoading', true)
      commit('clearError')
      if (file != null) {
        let path = 'profile_photos/' + user.id
        var storageref = firebase.storage().ref(path)
        storageref.put(file).then(() => {
          storageref.getDownloadURL().then(function (url) {
            user.photoURL = url
            dispatch('updateUser1', user)
          }).catch(function () {
            
            return
          })
        })
      } else {
        dispatch('updateUser1', user)
      }
    },
    updateUser1 ({commit}, payload) {
      firebase.firestore()
      .collection('users')
      .doc(payload.id)
      .set({id: payload.id, name: payload.name, email: payload.email})
      .then(() => {
        commit('setUser', payload)
        commit('setLoading', false)
      })
    },
    updateUser ({commit}, payload) {
      firebase.firestore()
      .collection('users')
      .doc(payload.id)
      .set({id: payload.id, name: payload.name, email: payload.email})
      .then(() => {
        commit('setUser', payload)
        commit('setLoading', false)
      })
    },
    sendNotification (payload) {
      firebase.firestore()
      .collection('users')
      .doc(payload.receiverID)
      .collection('notifications')
      .add({
        message: payload.message,
        senderID: payload.senderID,
        senderName: payload.senderName,
        receiverID: payload.receiverID,
        receiverName: payload.receiverName,
        read: payload.read,
        accepted: payload.accepted,
        timestamp: payload.timestamp,
        type: payload.type
      })
    },
    readNotification ({user, notification}) {
      firebase
      .firestore()
      .collection('users')
      .doc(user)
      .collection('notifications')
      .doc(notification)
      .update({
        'read': true
      })
    },
    updateNotification ( payload) {
      firebase.firestore()
      .collection('users')
      .doc(payload.receiverID)
      .collection('notifications')
      .doc(payload.id)
      .set({
        message: payload.message,
        senderID: payload.senderID,
        senderName: payload.senderName,
        receiverID: payload.receiverID,
        receiverName: payload.receiverName,
        read: payload.read,
        accepted: payload.accepted,
        timestamp: payload.timestamp,
        type: payload.type
      })
    },
    addContact ( {payload, userID}) {
      firebase.firestore()
      .collection('users')
      .doc(userID)
      .collection('contacts')
      .doc(payload.contactID)
      .set({
        contactID: payload.contactID,
        contactName: payload.contactName,
        accepted: payload.accepted,
        timestamp: payload.timestamp
      })
    },
    deleteContact ({account, contact}) {
      firebase.firestore()
      .collection('users')
      .doc(account)
      .collection('contacts')
      .doc(contact)
      .delete()
    },
    signUserUp ({dispatch, commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.user.uid,
              name: null,
              email: user.user.email
            }
            // var storageref = firebase.storage().ref('profile_photos/default.png')
            // storageref.getDownloadURL().then(function (url) {
            //   newUser.photoURL = url
            //   dispatch('updateUser', newUser)
            // }).catch(function () {
              
            //   return
            // })
            dispatch('updateUser', newUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            
          }
        )
    },
    signUserIn ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            firebase.firestore().collection('users').doc(user.user.uid).get().then(function (doc) {
              if (doc.exists) {
                commit('setUser', doc.data())
              } else {
                
                return
              }
            })
            // const newUser = {
            //   id: user.uid,
            //   name: user.displayName,
            //   email: user.email,
            //   photoURL: user.photoURL,
            //   bio: ''
            // }
            // commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            
          }
        )
    },
    signUserInGoogle ({commit, dispatch}) {
      commit('setLoading', true)
      commit('clearError')
      let provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithPopup(provider)
        .then(
          user => {
            commit('setLoading', false)
            if (user.additionalUserInfo.isNewUser) {
              const newUser = {
                id: user.user.uid,
                name: user.user.displayName,
                email: user.user.email
              }
              dispatch('updateUser', newUser)
            } else {
              firebase.firestore().collection('users').doc(user.user.uid).get().then(function (doc) {
                if (doc.exists) {
                  commit('setUser', doc.data())
                } else {
                  
                  return
                }
              })
            }
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            
          }
        )
    },
    // signUserInFacebook ({commit}) {
    //   commit('setLoading', true)
    //   commit('clearError')
    //   firebase.auth().signInWithPopup(new firebase.auth.FacebookAuthProvider())
    //     .then(
    //       user => {
    //         commit('setLoading', false)
    //         const newUser = {
    //           id: user.uid,
    //           name: user.displayName,
    //           email: user.email,
    //           photoUrl: user.photoURL
    //         }
    //         commit('setUser', newUser)
    //       }
    //     )
    //     .catch(
    //       error => {
    //         commit('setLoading', false)
    //         commit('setError', error)
    //         console.log(error)
    //       }
    //     )
    // },
    // signUserInGithub ({commit}) {
    //   commit('setLoading', true)
    //   commit('clearError')
    //   firebase.auth().signInWithPopup(new firebase.auth.GithubAuthProvider())
    //     .then(
    //       user => {
    //         commit('setLoading', false)
    //         const newUser = {
    //           id: user.uid,
    //           name: user.displayName,
    //           email: user.email,
    //           photoUrl: user.photoURL
    //         }
    //         commit('setUser', newUser)
    //       }
    //     )
    //     .catch(
    //       error => {
    //         commit('setLoading', false)
    //         commit('setError', error)
    //         console.log(error)
    //       }
    //     )
    // },
    // signUserInTwitter ({commit}) {
    //   commit('setLoading', true)
    //   commit('clearError')
    //   firebase.auth().signInWithPopup(new firebase.auth.TwitterAuthProvider())
    //     .then(
    //       user => {
    //         commit('setLoading', false)
    //         const newUser = {
    //           id: user.uid,
    //           name: user.displayName,
    //           email: user.email,
    //           photoUrl: user.photoURL
    //         }
    //         commit('setUser', newUser)
    //       }
    //     )
    //     .catch(
    //       error => {
    //         commit('setLoading', false)
    //         commit('setError', error)
    //         console.log(error)
    //       }
    //     )
    // },
    autoSignIn ({commit}, payload) {
      firebase.firestore().collection('users').doc(payload.uid).get().then(function (doc) {
        if (doc.exists) {
          commit('setUser', doc.data())
        } else {
          return
        }
      })
    },
    resetPasswordWithEmail ({commit}, payload) {
      const { email } = payload
      commit('setLoading', true)
      firebase.auth().sendPasswordResetEmail(email)
      .then(
        () => {
          commit('setLoading', false)
          
        }
      )
      .catch(
        error => {
          commit('setLoading', false)
          commit('setError', error)
         
        }
      )
    },
    logout ({commit}) {
      firebase.auth().signOut()
      commit('setUser', null)
    }
  },
  getters: {
    user (state) {
      return state.user
    },
    proj (state) {
      return state.currProj
    }
  }
}
