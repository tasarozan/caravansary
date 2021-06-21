<script>
export default {
  name: 'VanCard',
  props: ['van'],
}
</script>

<template lang="pug">
.box
  h2 Type: {{ van.type }}
  h2 Location: {{ van.location }}
  h2 Price: {{ van.price }}
  h2 Owner: {{ van.owner.firstName }} {{ van.owner.lastName }}

</template>

<style lang="scss">
.box {
  padding: 2rem;
  border: 1px solid #3339ff;
  background: #8791f3;
  border-radius: 0.3rem;
}
</style>
