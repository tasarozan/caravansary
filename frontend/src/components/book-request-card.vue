<script>
import { mapActions } from 'vuex'

export default {
  name: 'BookRequestCard',
  props: { bookRequestId: String },
  data() {
    return {
      bookRequest: null,
      isLoading: false,
    }
  },
  async created() {
    this.bookRequest = await this.fetchBookRequest(this.bookRequestId)
  },
  methods: {
    ...mapActions(['fetchBookRequest', 'respondToBookRequest']),

    async sendResponseToBookRequest(bookRequestId, approval) {
      this.isLoading = true
      try {
        await this.respondToBookRequest({
          bookRequestId,
          approval,
        })
      } catch (e) {
        this.backendError = e.response.data.message
      }
      this.bookRequest = await this.fetchBookRequest(this.bookRequestId)
      this.isLoading = false
    },
  },
}
</script>

<template lang="pug">
.box(v-if="bookRequest")
  h2 {{(bookRequest.customer.firstName)}} {{(bookRequest.customer.lastName)}}
  h2 {{bookRequest.approval }}
  div(v-if="bookRequest.approval == 'Pending'")
    button(:disabled="isLoading" @click="sendResponseToBookRequest(bookRequest._id, 'true')" ) {{isLoading ? 'Loading...' : 'Accept Book Request'}}
    button(:disabled="isLoading" @click="sendResponseToBookRequest(bookRequest._id, 'false')") {{isLoading ? 'Loading...' : 'Reject Book Request'}}

</template>

<style lang="scss">
.box {
  padding: 2rem;
  border: 1px solid #3339ff;
  background: #8791f3;
  border-radius: 0.3rem;
}
</style>
