<template lang="html">
  <div>
    <header>
      <navBar></navBar>
    </header>
    <main>
      <aside class="sidebar">
        <router-link
          v-for="post in posts"
          active-class="is-active"
          class="link"
          :to="{ name: 'post', params: { id: post.id } }">
          {{post.id}}. {{post.title}}
        </router-link>
      </aside>
      <div class="content">
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>

<script>
  import NavBar from '../navigation/navBar.vue'
  import axios from 'axios'
  //import Login from './components/Login.vue'
  export default {
    data () {
      return {
        posts: [],
        endpoint: 'https://jsonplaceholder.typicode.com/posts/',
      }
    },
    created() {
      this.getAllPosts();
    },
    methods: {
      getAllPosts() {
        axios.get(this.endpoint)
          .then(response => {
            this.posts = response.data;
            //console.log(this.posts);
          })
          .catch(error => {
            console.log('-----error-------');
            console.log(error);
          })
      }
    },
    components: {NavBar},
  }
</script>

<style lang="scss">
  .greeting {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    flex-direction: column;
  }
</style>
