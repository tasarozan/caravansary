<script>
import { mapActions } from 'vuex'

export default {
  name: 'Vans',
  data() {
    return {
      vans: [],
      isShow: false,
      type: '',
      location: '',
      price: '',
      vanId: '',

      backendError: null,
    }
  },
  async created() {
    this.vans = await this.fetchVans()
  },
  methods: {
    ...mapActions(['fetchVans', 'createVan', 'createBookRequest']),
    async submitVan() {
      try {
        await this.createVan({
          type: this.type,
          location: this.location,
          price: this.price,
        })

        this.vans = await this.fetchVans()
      } catch (e) {
        this.backendError = e.response.data.message
      }
    },
    async submitBookRequest(vanId) {
      try {
        await this.createBookRequest({
          van: vanId,
        })
      } catch (e) {
        this.backendError = e.response.data.message
      }
    },
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
      .bookRequestBtn
        button(@click="submitBookRequest(van._id)") Request Book
    .buttons
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
