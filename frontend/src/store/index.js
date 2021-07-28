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
  CREATE_VAN_BUDDY_REQUEST: 'create van buddy request',
}

const store = new Vuex.Store({
  state: {
    user: null,
    van: null,
    bookRequest: null,
    vanBuddyRequest: null,
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
    [mutations.CREATE_VAN_BUDDY_REQUEST](state, vanBuddyRequest) {
      state.vanBuddyRequest = vanBuddyRequest
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
    register(store, user) {
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
    async fetchBookRequest(store, id) {
      const bookRequest = await axios.get(`/api/book-requests/${id}`)
      return bookRequest.data
    },
    async respondToBookRequest(store, credentials) {
      const { bookRequestId } = credentials
      await axios.patch(`/api/book-requests/${bookRequestId}`, credentials)
    },
    async changeVanBuddyAvailability({ commit }, vanBuddyAvailability) {
      const user = await axios.patch('/api/van-buddy-requests', vanBuddyAvailability)
      commit(mutations.SET_USER, user.data)
    },
    async createVanBuddyRequest({ commit }, credentials) {
      const vanBuddyRequest = await axios.post('/api/van-buddy-requests', credentials)
      commit(mutations.CREATE_VAN_BUDDY_REQUEST, vanBuddyRequest.data)
    },
    async fetchVanBuddyRequest(store, id) {
      const vanBuddyRequest = await axios.get(`/api/van-buddy-requests/${id}`)
      return vanBuddyRequest.data
    },
    async respondToVanBuddyRequest(store, credentials) {
      const { vanBuddyRequestId } = credentials
      await axios.patch(`/api/van-buddy-requests/${vanBuddyRequestId}`, credentials)
    },
  },
  modules: {},
})

export default async function init() {
  await store.dispatch('fetchSession')
  return store
}
