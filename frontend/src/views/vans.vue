<script>
import { mapActions } from 'vuex'

export default {
  name: 'Vans',
  data() {
    return {
      vans: [],
      isShow: true,
      type: '',
      location: '',
      price: '',

      backendError: null,
    }
  },
  async created() {
    this.vans = await this.fetchVans()
  },
  methods: {
    ...mapActions(['fetchVans', 'createVan']),
    async submitVan() {
      // e.preventDefault()

      try {
        await this.createVan({
          type: this.type,
          location: this.location,
          price: this.price,
        })

        this.$router.push('/vans')
      } catch (e) {
        this.backendError = e.response.data.message
      }
    },
  },
}
</script>

<template lang="pug">
  .vans
    div(v-for="van in vans" :van="van")
      .box
        h2 Type: {{ van.type }}
        h2 Location: {{ van.location }}
        h2 Price: {{ van.price }}
        h2 Owner: {{ van.owner.firstName }} {{ van.owner.lastName }}
    .buttons
      button(@click="isShow = !isShow") Share your Van
      form(v-show="isShow" @submit="submitVan")
        label(for="type") Type:&nbsp;
          input(v-model="type" id="type" type="text" placeholder="Van type" required)
        label(for="location") Location:&nbsp;
          input(v-model="location" id="location" type="text" placeholder="Van location" required)
        label(for="price") Price:&nbsp;
          input(v-model="price" id="type" type="text" placeholder="Van price" required)
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
</style>
