import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

axios.defaults.baseURL = process.env.VUE_APP_BASE_URL
axios.defaults.withCredentials = true

Vue.use(Vuex)

const mutations = {
  SET_USER: 'set user',
  CREATE_VAN: 'create van',
  CREATE_BOOK_REQUEST: 'create book request',
}

const store = new Vuex.Store({
  state: {
    user: null,
    van: null,
    bookRequest: null,
  },
  mutations: {
    [mutations.SET_USER](state, user) {
      state.user = user
    },
    [mutations.CREATE_VAN](state, van) {
      state.van = van
    },
    [mutations.CREATE_BOOK_REQUEST](state, bookRequest) {
      state.bookRequest = bookRequest
    },
  },
  actions: {
    async fetchUser(store, id) {
      const userRequest = await axios.get(`/api/users/${id}`)
      return userRequest.data
    },
    async fetchUsers() {
      const usersRequest = await axios.get('/api/users')
      return usersRequest.data
    },
    async fetchVans() {
      const vansRequest = await axios.get('/api/vans')
      return vansRequest.data
    },
    async fetchVan(store, id) {
      const vanRequest = await axios.get(`/api/vans/${id}`)
      return vanRequest.data
    },
    async fetchSession({ commit }) {
      const user = await axios.get('/api/account/session')
      commit(mutations.SET_USER, user.data || null)
    },
    async login({ commit }, credentials) {
      const user = await axios.post('/api/account/session', credentials)
      commit(mutations.SET_USER, user.data)
    },
    async register(store, user) {
      return axios.post('/api/account', user)
    },
    async logout({ commit }) {
      await axios.delete('/api/account/session')
      commit(mutations.SET_USER, null)
    },
    async createVan({ commit }, credentials) {
      const van = await axios.post('/api/vans', credentials)
      commit(mutations.CREATE_VAN, van.data)
    },
    async createBookRequest({ commit }, credentials) {
      const bookRequest = await axios.post('/api/book-requests', credentials)
      commit(mutations.CREATE_BOOK_REQUEST, bookRequest.data)
    },
  },
  modules: {},
})

export default async function init() {
  await store.dispatch('fetchSession')
  return store
}
