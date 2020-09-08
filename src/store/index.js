import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    currentUser: undefined,
    toys: [],
    overlay:false
  },
  mutations: {
    SET_USER(state, user) {
      state.currentUser = user
    },
    SET_TOYS(state, toys) {
      state.toys = toys
    },
    SET_TOY(state, toy) {
      state.toy = toy
    },
    OVERLAY_TRUE(state) {
      state.overlay = true
    },
    OVERLAY_FALSE(state) {
      state.overlay = false
    }
  },
  actions: {
    setUser({commit}, user) {
      commit('SET_USER', user)
    },
    setToys ({commit}) {
      commit('OVERLAY_TRUE')
      Axios.get('https://us-central1-ottoklauss-5927c.cloudfunctions.net/toys/toys')
      .then((response) => {
        commit('SET_TOYS', response.data)
        commit('OVERLAY_FALSE')
      })
    },
    setToy ({commit}, id) {
      Axios.get(`https://us-central1-ottoklauss-5927c.cloudfunctions.net/toy/toy${id}`)
      .then((response) => {
        commit('SET_TOY', response.data)
      })
    },
    submitToy({dispatch}, toy) {
    Axios.post('https://us-central1-ottoklauss-5927c.cloudfunctions.net/toys/toy', toy).then(() => {
      dispatch('setToys') // llamamos a 
    })
    },
  },
  modules: {
  }
})
