<template>
  <div id="app">
    <header-nav />
    <router-view />
  </div>
</template>

<script>
import headerNav from './components/shared/Header.vue';

export default {
  components: {
    headerNav,
  },
};
</script>

<style lang="scss">
#app {
  //font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #000;
}

#nav {
  a {
    color: #2c3e50;

    &.exact-active {
      text-decoration: underline;
    }
  }
}
</style>
