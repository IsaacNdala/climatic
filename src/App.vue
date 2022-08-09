<template>
  <router-view/>
</template>

<style lang="scss">
#app {
  font-family: 'Inter', BlinkMacSystemFont, -apple-system, Helvetica Neue, Helvetica, Arial, sans-serif;
  min-height: 100vh;
  overflow: auto;
  display: flex;
  justify-content: center;
  background-image: url('@/assets/banner-img.jpeg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: right bottom;
}

* {
  padding: 0;
  margin: 0;
}

nav, li {
  list-style: none;
}

a {
  text-decoration: none !important;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
