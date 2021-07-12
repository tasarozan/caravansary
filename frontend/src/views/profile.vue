<script>
import { mapState } from 'vuex'
import VanCard from '@/components/van-card.vue'
import BookRequestCard from '@/components/book-request-card.vue'

export default {
  name: 'profile',
  components: { VanCard, BookRequestCard },
  data() {
    return {
      vanId: null,
      bookRequestId: null,
      approval: null,

      backendError: null,
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
    h2(v-if="user") {{ user.firstName }} ({{ user.age }})
    .listings(v-if="user")
      p(v-if="!user.listings.length")
        | no listings yet
      p(v-else)
        div(v-if="user")
          .van(v-for="van in user.listings")
            h3 {{ van.type }}
            p(v-if="!van.bookRequests.length")
              | no book requests yet!
            p(v-else)
              .bookings(v-for="bookRequest in van.bookRequests")
                BookRequestCard(:bookRequestId="bookRequest")
    .bookRequests(v-if="user")
      p(v-if="!user.sentBookRequests.length")
        | no book requests sent!
      p(v-else)
        .bookings(v-for="bookRequest in user.sentBookRequests")
          h3 Approval: {{bookRequest.approval}}
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
