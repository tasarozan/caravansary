<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'VanBuddyRequestCard',
  props: { vanBuddyRequestId: String },
  data() {
    return {
      vanBuddyRequest: null,
      isLoading: false,
    }
  },
  async created() {
    this.vanBuddyRequest = await this.fetchVanBuddyRequest(this.vanBuddyRequestId)
  },
  methods: {
    ...mapActions(['fetchVanBuddyRequest', 'respondToVanBuddyRequest']),

    async sendResponseToVanBuddyRequest(id, approval) {
      this.isLoading = true
      try {
        await this.respondToVanBuddyRequest({
          vanBuddyRequestId: id,
          approval: approval,
        })
      } catch (e) {
        this.backendError = e.response.data.message
      }
      this.vanBuddyRequest = await this.fetchVanBuddyRequest(this.vanBuddyRequestId)
      this.isLoading = false
    },
  },
  computed: {
    ...mapState(['user']),
  },
}
</script>

<template lang="pug">
.box(v-if="vanBuddyRequest")
  h2 Sender: {{(vanBuddyRequest.sender.firstName)}} {{(vanBuddyRequest.sender.lastName)}}
  h2 Receiver: {{vanBuddyRequest.receiver.firstName}} {{vanBuddyRequest.receiver.lastName}}
  h2 Approval: {{vanBuddyRequest.approval ? 'Accepted' : 'Rejected' }}
  div(v-if="vanBuddyRequest.approval == 'Pending'")
    div(v-if="vanBuddyRequest.sender._id != user._id")
      button(:disabled="isLoading" @click="sendResponseToVanBuddyRequest(vanBuddyRequest._id, 'true')" ) {{isLoading ? 'Loading...' : 'Accept Van Buddy Request'}}
      button(:disabled="isLoading" @click="sendResponseToVanBuddyRequest(vanBuddyRequest._id, 'false')") {{isLoading ? 'Loading...' : 'Reject Van Buddy Request'}}
</template>

<style lang="scss">
.box {
  padding: 2rem;
  border: 1px solid #3339ff;
  background: #8791f3;
  border-radius: 0.3rem;
}
</style>
