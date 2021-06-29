<script>
import { mapState } from 'vuex'

export default {
  name: 'profile',
  computed: {
    ...mapState(['user']),
  },
}
</script>

<template lang="pug">
  .about
    h1 This is a user profile
    h2 {{ user.firstName }} ({{ user.age }})

    p(v-if="!user.listings.length")
      | no listings yet
    p(v-else)
      .van(v-for="van in user.listings")
        h3 {{ van.type }}
</template>

<style lang="scss">
.about {
  padding: 2rem;
  border: 1px solid #3339ff;
  background: #8791f3;
  border-radius: 0.3rem;
}
</style>
