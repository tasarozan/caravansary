<script>
export default {
  name: 'UserCard',
  props: ['user'],
}
</script>

<template lang="pug">
.box
  h2 {{ user.firstName }} ({{ user.age }})

  p(v-if="!user.listings.length")
    | no listings yet
  p(v-else)
    .van(v-for="van in user.listings")
      h3 {{ van.type }}

</template>

<style lang="scss">
.box {
  padding: 2rem;
  border: 1px solid #3339ff;
  background: #8791f3;
  border-radius: 0.3rem;
}
</style>
