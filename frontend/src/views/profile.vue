<script>
import { mapState, mapActions } from 'vuex'
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
      isLoading: false,

      backendError: null,
    }
  },
  methods: {
    ...mapActions(['changeVanBuddyAvailability', 'fetchSession']),
    async toggleVanBuddyAvailability(availability) {
      this.isLoading = true
      try {
        this.changeVanBuddyAvailability({
          vanBuddyAvailability: availability,
        })
      } catch (e) {
        this.backendError = e.response.data.message
      }
      this.isLoading = false
    },
  },
  computed: {
    ...mapState(['user']),
  },
}
</script>

<template lang="pug">
  .about(v-if="user")
    .vanBuddyButton(v-if="user.vanBuddyAvailability")
      h2 You are available to be van buddy!
      button(:disabled="isLoading" @click="toggleVanBuddyAvailability(false)") Stop
    .vanBuddyButton(v-else)
      h2 You are not available to be van buddy!
      button(:disabled="isLoading" @click="toggleVanBuddyAvailability(true)") Start
    h1 This is a user profile
    h2(v-if="user") {{ user.firstName }} ({{ user.age }})
    .listings(v-if="user")
      p(v-if="!user.listings.length")
        | no listings yet
      p(v-else)
        div(v-if="user")
          .van(v-for="van in user.listings")
            h3 Type: {{ van.type }}
            h3 Price: {{ van.price }}
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
.vanBuddyButton {
  text-align: right;
}
</style>
