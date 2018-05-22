<template>
  <header>
    <ul>
      <li>
        <nuxt-link to='/'>Home</nuxt-link>
      </li>
      <li>
        <nuxt-link to='/page'>Second</nuxt-link>
      </li>
    </ul>
  </header>
</template>

<script>
export default {
}
</script>

<style lang="scss">
header {
  background-color: #2b2b2b;
  ul {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 4rem;
    li {
      list-style-type: none;
      & + li {
        padding-left: 2rem;
      }
      a {
        cursor: pointer;
        color: #fff;
        text-decoration: none;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}
</style>
