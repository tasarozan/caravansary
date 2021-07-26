<script>
import { mapActions } from 'vuex'

export default {
  name: 'VanCard',
  props: { vanId: String },
  data() {
    return {
      van: null,
    }
  },
  async created() {
    this.van = await this.fetchVan(this.vanId)
  },
  methods: {
    ...mapActions(['fetchVan']),
  },
}
</script>

<template lang="pug">
.box(v-if="van")
  h2 Type: {{ van.type }}
  h2 Location: {{ van.location }}
  h2 Price: {{ van.price }}
  h2 Owner: {{ van.owner.firstName }} {{ van.owner.lastName }}
  h2 Availability: {{ van.availability ? 'Available' : 'Not Available' }}
</template>

<style lang="scss">
.box {
  padding: 2rem;
  border: 1px solid #3339ff;
  background: #8791f3;
  border-radius: 0.3rem;
}
</style>
