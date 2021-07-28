<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'FindVanBuddies',
  data() {
    return {
      users: [],

      backendError: null,
    }
  },
  async created() {
    const allUsers = await this.fetchUsers()
    this.users = allUsers.filter(user => user.vanBuddyAvailability)
  },
  methods: {
    ...mapActions(['fetchUsers', 'createVanBuddyRequest', 'fetchSession']),

    async submitVanBuddyRequest(personId) {
      try {
        await this.createVanBuddyRequest({
          receiver: personId,
        })
      } catch (e) {
        this.backendError = e.response.data.message
      }
      await this.fetchSession()
    },
  },
  computed: {
    ...mapState(['user']),
  },
}
</script>

<template lang="pug">
  .vanBuddies
    div(v-for="person in users")
      div(v-if="person")
        .box
          h2 {{person.firstName}} {{ person.lastName }}
          h2 {{person.location}}
        div(v-if="user")
          .vanBuddyRequestButton(v-if="person._id != user._id")
            div(v-if="!user.vanBuddyRequests.some(request => request.sender == user._id)")
              button(@click="submitVanBuddyRequest(person._id)") {{`Become van buddies with ${person.firstName} ${person.lastName}`}}
            div(v-else)
              h3 Van Buddy Request Sent
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
.vanBuddyRequestButton {
  text-align: right;
  margin: 1rem;
  padding: 1rem;
}
</style>
