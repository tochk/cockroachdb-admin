<template>
  <div id="app">
      <router-view></router-view>
  </div>
</template>

<style lang="scss">
  body {
    margin: 0;
    padding: 0;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }

  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  header {
    position: fixed;
    top: 0;
    width: 100%;
    min-height: 60px;
    border-bottom: 1px solid #42b983;
    text-align: center;
    background: #ffffff;
  }

  main {
    display: flex;
    height: calc(100vh - 60px);
    max-width: 1200px;
    margin-top: 60px;
    margin-left: auto;
    margin-right: auto;
    overflow: hidden;
  }

  aside {
    flex: 1 0 30%;
    height: 100%;
    overflow-y: auto;
    width: 30%;
    padding: 50px 30px;
    box-sizing: border-box;
    border-right: 1px solid #42b983;
  }

  .content {
    flex: 1 1 70%;
    display: flex;
    /*align-items: top;*/
    justify-content: center;
  }

  .link {
    display: block;
    text-decoration: none;
    margin-bottom: 10px;
    color: #2c3e50;
    &--home {
      text-transform: uppercase;
      margin-bottom: 30px;
    }
    &.is-active {
      color: #42b983;
    }
  }
</style>
