<template>
  <section class="container">
    <img class="matise-image" src="~/assets/images/matise.svg" alt="">
    <h1>Project: {{ appName }}, welcome!</h1>
  </section>
</template>

<script>
export default {
  data() {
    return {
      appName: '<%= appName %>'
    }
  }
}
</script>

<style lang="scss">
h1 {
  color: #2b2b2b;
  margin-top: 2rem;
  text-align: center;
}
</style>
