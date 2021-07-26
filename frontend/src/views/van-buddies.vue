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
    ...mapActions(['fetchUsers']),
  },
  computed: {
    ...mapState(['user']),
  },
}
</script>

<template lang="pug">
  .container
    div(v-for="user in users")
      .box
        h2 {{user.firstName}}

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
.bookRequestBtn {
  text-align: right;
  margin: 1rem;
  padding: 1rem;
}
</style>
