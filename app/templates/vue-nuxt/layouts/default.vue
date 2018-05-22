<template>
  <div>
    <headerElement></headerElement>
    <main>
      <nuxt/>
    </main>
    <footerElement></footerElement>
  </div>
</template>

<script>
import headerElement from '~/layouts/header/headerElement'
import footerElement from '~/layouts/footer/footerElement'

export default {
  components: {
    headerElement,
    footerElement
  }
};
</script>

<style lang="scss">
main {
  min-height: 30rem;
  max-width: 40rem;
  margin: 0 auto;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
