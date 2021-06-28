import { createStore } from 'vuex'

export default createStore({
  state: {
    currentUser: null,
    isAuth: false
  },
  mutations: {
    setCurrentUser(state,pCurrentUser){
      state.currentUser = pCurrentUser
    },
    setIsAuth(state,pIsAuth){
      state.isAuth = pIsAuth
    },
  },
  actions: {
    setCurrentUser({commit}, username){
      commit("setCurrentUser", username)
      commit("setCurrentUser", localStorage.getItem("username"))
    },
    setIsAuth({commit}, isAuth){
      commit("setIsAuth", isAuth)
    }
  },
  modules: {
  },
  getters:{
    currentUser: state => state.currentUser,
    isAuth: state => state.isAuth,
  }
})
