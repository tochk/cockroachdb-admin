<template>
  <nav>
    <div class="nav-wrapper teal darken-3">
      <div class="container">
        <a href="#!" class="brand-logo">Logo</a>
        <ul class="right">
          <li v-for="data in posts" :class=data.class>
            <a :id=data.id :href=data.url>{{data.text}}</a>
          </li>
          <li v-if="isAuthenticated" @click="logout">
            <span class="logout">Logout</span>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
  import json from '../../testData/navBarData.json'
  import { mapGetters, mapState } from 'vuex'
  import { AUTH_LOGOUT } from '../../store/actions/auth'

  export default {
    name: "navBar",
    data() {
      return {
        posts: null,
      }
    },
    methods: {
      logout: function () {
        this.$store.dispatch(AUTH_LOGOUT).then(() => this.$router.push('/login'))
      }
    },
    created() {
      this.posts = json.menu;
    },

    computed: {
      ...mapGetters(['isAuthenticated']),
      ...mapState({
        authLoading: state => state.auth.status === 'loading',
      })
    },
    mounted() {
      //console.log(this.posts)
    }
  }
</script>

<style lang="scss">
  .container {
    position: relative;
    .brand-logo {
      left: 0;
    }
  }
</style>
