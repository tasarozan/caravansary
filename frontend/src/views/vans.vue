<script>
import { mapActions } from 'vuex'

export default {
  name: 'Vans',
  data() {
    return {
      vans: [],
    }
  },
  async created() {
    this.vans = await this.fetchVans()
  },
  methods: {
    ...mapActions(['fetchVans']),
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
      button Share your Van
</template>

<style lang="scss">
.buttons {
  text-align: center;
  background-color: blue;
}
.box {
  padding: 2rem;
  border: 1px solid #3339ff;
  background: #8791f3;
  border-radius: 0.3rem;
}
</style>
