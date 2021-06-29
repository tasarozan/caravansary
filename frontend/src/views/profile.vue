<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'profile',
  data() {
    return {
      message: '',
    }
  },
  methods: {
    ...mapActions(['goLive', 'sendMessageToLiveStream', 'joinStream']),
    sendMessage(e) {
      e.preventDefault()
      this.sendMessageToLiveStream(this.message)
      this.message = ''
    },
  },
  computed: {
    ...mapState(['user', 'currentLiveStream', 'liveStreams', 'liveStreamMessages']),
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
    div(v-if="liveStreams.length")
      h2 Live Streams
      div(v-for="stream in liveStreams")
        p {{stream}}
        button(@click="joinStream(stream)") Join Streams
    button(@click="goLive") Go Live
    div(v-if="currentLiveStream")
      h3 Live Stream
      .messages
        .message(v-for="message in liveStreamMessages")
          p
            span {{ message.author }}:&nbsp;
            span {{ message.body }}
      form(@submit="sendMessage")
        input(type="text" v-model="message")
        input(type="submit" value="Send message")
</template>

<style lang="scss">
.about {
  padding: 2rem;
  border: 1px solid #3339ff;
  background: #8791f3;
  border-radius: 0.3rem;
}
</style>
