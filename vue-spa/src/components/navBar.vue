<template>
  <v-nav nav-class="teal darken-3">
    <div class="container">
      <a href="#!" class="brand-logo">Logo</a>
      <ul class="right">
        <li v-for="data in posts" :class=data.class>
          <a :id=data.id :href=data.url>{{data.text}}</a>
        </li>
      </ul>
      <v-side-nav id="side" slot="side-nav"></v-side-nav>
    </div>
  </v-nav>
</template>

<script>
  import json from '../testData/navBarData.json'

  export default {
    name: "navBar",
    data() {
      return {
        posts: null,
      }
    },
    methods: {},
    created() {
      this.posts = json.menu;
    },
    mounted() {
      console.log(this.posts)
    }
  }
</script>

<style lang="scss">
  .container{
    position: relative;
    .brand-logo{
      left: 0;
    }
  }
</style>
