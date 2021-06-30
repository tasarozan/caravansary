<script>
import { mapState } from 'vuex'
import VanCard from '@/components/van-card.vue'

export default {
  name: 'profile',
  components: { VanCard },
  data() {
    return {
      vanId: null,
    }
  },
  computed: {
    ...mapState(['user']),
  },
}
</script>

<template lang="pug">
  .about
    h1 This is a user profile
    h2 {{ user.firstName }} ({{ user.age }})
    .listings
      p(v-if="!user.listings.length")
        | no listings yet
      p(v-else)
        .van(v-for="van in user.listings")
          h3 {{ van.type }}
          p(v-if="!van.bookRequests.length")
            | no book requests yet!
          p(v-else)
            .bookings(v-for="bookRequest in van.bookRequests")
              h3 {{bookRequest.isApproved}}
              h3 {{bookRequest.customer}}
    .bookRequests
      p(v-if="!user.sentBookRequests.length")
        | no book requests sent!
      p(v-else)
        .bookings(v-for="bookRequest in user.sentBookRequests")
          h3 Approval: {{bookRequest.isApproved}}
          VanCard(:vanId="bookRequest.van")
</template>

<style lang="scss">
.about {
  padding: 2rem;
  border: 1px solid #3339ff;
  background: #8791f3;
  border-radius: 0.3rem;
}
.listings {
  padding: 2rem;
  border: 3px solid red;
  border-radius: 0.3rem;
}
.bookRequests {
  margin: 5px;
  padding: 2rem;
  border: 3px solid red;
  border-radius: 0.3rem;
}
</style>
