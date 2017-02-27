<template>
  <div class="component-container is-4-desktop is-offset-4-desktop column is-half is-offset-one-quarter">
    <h3 class="title is-3">Log in</h3>
    <form>
      <label for="email" class="label">Email address</label>
      <p class="control has-icon">
        <input v-model="email" type="text" class="input" id="email" placeholder="Email">
        <span class="icon is-small"><i class="fa fa-envelope"></i></span>
      </p>
      <label for="password" class="label">Password</label>
      <p class="control has-icon">
        <input v-model="password" type="password" class="input" id="password" placeholder="Password">
        <span class="icon is-small"><i class="fa fa-lock"></i></span>
      </p>
      <p class="control">
        <button type="submit" v-on:click.prevent="submitForm" class="button is-primary">Submit</button>
      </p>
    </form>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>

<script type="text/babel">
import config from '../config'
import axios from 'axios'

export default {
  name: 'login',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    submitForm () {
      const user = {
        password: this.password,
        emailaddress: this.email
      }

      const url = config.host + '/auctionhouse/login'
      axios.post(url, user)
        .then((response) => {
          this.$emit('userLoggedIn', user)
          this.$emit('showNotification', {
            type: 'is-success',
            message: 'Successfully logged in.',
            duration: 2
          })

          this.$router.push('/')
        })
        .catch((error) => {
          this.$emit('showNotification', {
            type: 'is-danger',
            message: 'Error logging in. Reason: ' + error,
            duration: 2
          })
        })
    }
  }
}
</script>
