<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Vans',
  data() {
    return {
      vans: [],
      isShow: false,
      type: '',
      location: '',
      price: '',
      isLoading: false,

      backendError: null,
    }
  },
  async created() {
    this.vans = await this.fetchVans()
  },
  methods: {
    ...mapActions(['fetchVans', 'fetchSession', 'createVan', 'createBookRequest']),
    async submitVan() {
      try {
        await this.createVan({
          type: this.type,
          location: this.location,
          price: this.price,
        })
      } catch (e) {
        this.backendError = e.response.data.message
      }
      this.vans = await this.fetchVans()
    },
    async submitBookRequest(vanId) {
      this.isLoading = true
      try {
        await this.createBookRequest({
          van: vanId,
        })
      } catch (e) {
        this.backendError = e.response.data.message
      }
      this.isLoading = false
      this.vans = await this.fetchVans()
      await this.fetchSession()
    },
  },
  computed: {
    ...mapState(['user']),
  },
}
</script>

<template lang="pug">
  .vans
    div(v-for="(van, index) in vans" :key="index")
      .box
        h2 Type: {{ van.type }}
        h2 Location: {{ van.location }}
        h2 Price: {{ van.price }}
        h2 Availability: {{ van.availability ? 'Available' : 'Not Available' }}
        h2 Owner: {{ van.owner.firstName }} {{ van.owner.lastName }}
      .bookRequestBtn(v-if="van.availability ")
        div(v-if="user")
          div(v-if="user._id != van.owner._id")
            div(v-if="user.sentBookRequests.some(bookRequest => bookRequest.van == van._id)")
              h2 Book request sent!
            div(v-else)
              button(:disabled="isLoading" @click="submitBookRequest(van._id)") {{isLoading ? 'Loading...' : 'Request Book'}}
        div(v-else)
          p
            a(href="/register") Sign up
            | &nbsp;to request a book
    .buttons(v-if="user")
      button(@click="isShow = !isShow")  Share Your Van
      form(v-show="isShow" @submit.prevent
      ="submitVan")
        label(for="type") Type:&nbsp;
          input(v-model="type" id="type" type="text" placeholder="Van type" required)
        label(for="location") Location:&nbsp;
          input(v-model="location" id="location" type="text" placeholder="Van location" required)
        label(for="price") Price:&nbsp;
          input(v-model="price" id="price" type="text" placeholder="Van price" required)
        input(type="submit" value="Share")
      div(v-if="backendError") {{ backendError }}
</template>

<style lang="scss">
.buttons {
  text-align: center;
}
.box {
  padding: 2rem;
  border: 1px solid #3339ff;
  background: #8791f3;
  border-radius: 0.3rem;
}
label {
  display: block;
  margin: 1rem;
}
.bookRequestBtn {
  text-align: right;
  margin: 1rem;
  padding: 1rem;
}
</style>
