<script>
import { mapActions } from 'vuex'

export default {
  name: 'FindVanBuddies',
  data() {
    return {
      users: [],
    }
  },
  async created() {
    this.users = await this.fetchUsers()
  },
  methods: {
    ...mapActions(['fetchUsers']),
  },
}
</script>

<template lang="pug">
  .home
    h1 CARAVANSARY
    div(v-for="user in users")
      router-link(:to="`/users/${user._id}`") {{ user.firstName }} {{ user.lastName }}
</template>
