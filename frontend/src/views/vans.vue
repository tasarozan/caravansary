<script>
import axios from 'axios'
import VanCard from '@/components/van-card.vue'

export default {
  name: 'About',
  components: {
    VanCard,
  },
  data() {
    return {
      vans: [],
    }
  },
  async created() {
    const vansRequest = await axios.get('/api/vans')
    console.log(vansRequest)
    this.vans = vansRequest.data
  },
}
</script>

<template lang="pug">
  .vans
    van-card(v-for="van in vans" :van="van")
    .buttons
      button Share your Van
</template>

<style lang="scss">
.buttons {
  text-align: center;
  background-color: blue;
}
</style>
