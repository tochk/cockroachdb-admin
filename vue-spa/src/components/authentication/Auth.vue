<template>
  <div class="form_container">
    <div class="login-wrapper border border-light">
      <form class="form-signin" @submit.prevent="login">
        <h2 class="form-signin-heading">Please sign in</h2>
        <div class="input-field">
          <label for="inputLogin">Login</label>
          <input v-model="username" type="text" id="inputLogin" class="form-control" required autofocus>
        </div>
        <div class="input-field">
          <label for="inputPassword">Password</label>
          <input v-model="password" type="password" id="inputPassword" class="form-control" required>
        </div>
        <div class="input-field" v-show="error.length !== 0">
          <div class="col s12">
           <span class="red-text">
            <strong>{{ error }}</strong>
           </span>
          </div>
        </div>
        <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
      </form>
    </div>
  </div>
</template>

<script>
  import {AUTH_REQUEST} from '../../store/actions/auth'


  export default {
    name: 'Login',
    data() {
      return {
        username: '',
        password: '',
        error: ''
      }
    },

    methods: {
      login: async function () {
        const {username, password} = this
        let vm = this
        console.log(password)
        await this.$store.dispatch(AUTH_REQUEST, {username, password}).then(() => {
          vm.error = ''
        }).catch(err => {
          console.log(err)
          vm.error = err.message.split(',');
          vm.error = vm.error[0]
        })
        this.$router.push('/')
      },
      logout: function () {
        this.$store.dispatch(AUTH_LOGOUT)
          .then(() => {
            this.$router.push('/login')
          })
      },
    }
  }
</script>

<style lang="scss">
  .form_container {
    width: 50%;
    margin: 0 auto;
    display: flex;
    height: 100vh;
    justify-content: center;
    align-items: center;
    .login-wrapper {
      margin-top: -150px;
    }
  }
</style>
