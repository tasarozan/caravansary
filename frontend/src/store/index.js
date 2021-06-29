import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import io from 'socket.io-client'

Vue.use(Vuex)

const socket = io()

// socket.on('hello world!', () => {
//   console.log('We received message from the websocket')
// })

// setInterval(() => {
//   const number = Math.random()
//   console.log('sending request', number)
//   socket.emit('new message', number, res => {
//     console.log('this is a response', res)
//   })
// }, 3000)

// socket.emit('another api', res => {
//   console.log(res)
// })

const mutations = {
  SET_USER: 'set user',
  CREATE_VAN: 'create van',
  CREATE_BOOK_REQUEST: 'create book request',
  SET_LIVE_STREAM: 'set live stream',
  ADD_LIVE_STREAM: 'add live stream',
  ADD_MESSAGE_TO_LIVE_STREAM: 'add message to live stream',
}

const store = new Vuex.Store({
  state: {
    user: null,
    van: null,
    bookRequest: null,
    currentLiveStream: null,
    liveStreams: [],
    liveStreamMessages: [],
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
    [mutations.SET_LIVE_STREAM](state, live) {
      state.currentLiveStream = live
    },
    [mutations.ADD_LIVE_STREAM](state, stream) {
      state.liveStreams.push(stream)
    },
    [mutations.ADD_MESSAGE_TO_LIVE_STREAM](state, message) {
      state.liveStreamMessages.push(message)
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
    async goLive({ state, commit }) {
      socket.emit('go live', state.user._id, () => {
        commit(mutations.SET_LIVE_STREAM, state.user._id)
      })
    },
    async addLiveStream({ commit }, stream) {
      commit(mutations.ADD_LIVE_STREAM, stream)
    },
    async sendMessageToLiveStream({ state, commit }, body) {
      const message = {
        body,
        author: state.user.firstName,
      }
      commit(mutations.ADD_MESSAGE_TO_LIVE_STREAM, message)
      socket.emit('new message', state.currentLiveStream, message)
    },
    async joinStream({ commit }, stream) {
      socket.emit('join stream', stream)
      commit(mutations.SET_LIVE_STREAM, stream)
    },
  },
  modules: {},
})

socket.on('new live stream', user => {
  store.dispatch('addLiveStream', user)
})

socket.on('new live stream message', message => {
  store.commit(mutations.ADD_MESSAGE_TO_LIVE_STREAM, message)
})

export default async function init() {
  await store.dispatch('fetchSession')
  return store
}
