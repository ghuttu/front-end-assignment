<template>
  <div class="component-container is-4-desktop is-offset-4-desktop column is-half is-offset-one-quarter">
    <h3 class="title is-3">Register</h3>

    <form>
      <label class="label">Name</label>
      <p class="control has-icon">
        <input v-model="name" type="text" class="input" id="name" placeholder="Name" required>
        <span class="icon is-small"><i class="fa fa-user"></i></span>
      </p>

      <label class="label" for="password">Password</label>
      <p class="control has-icon">
        <input v-model="password" type="password" class="input" id="password" placeholder="Password" required>
        <span class="icon is-small"><i class="fa fa-lock"></i></span>
      </p>

      <label class="label" for="email">Email address</label>
      <p class="control has-icon">
        <input v-model="email" type="email" class="input" id="email" placeholder="Email" required>
        <span class="icon is-small"><i class="fa fa-envelope"></i></span>
      </p>

      <label class="label" for="address">Address</label>
      <p class="control has-icon">
        <input v-model="address" type="text" class="input" id="address" placeholder="Address" required>
        <span class="icon is-small"><i class="fa fa-address-card-o"></i></span>
      </p>

      <label class="label" for="city">City</label>
      <p class="control has-icon">
        <input v-model="city" type="text" class="input" id="city" placeholder="City" required>
        <span class="icon is-small"><i class="fa fa-building"></i></span>
      </p>

      <label class="label" for="phone">Phone Number</label>
      <p class="control has-icon">
        <input v-model="phone" type="text" class="input" id="phone" placeholder="Phone Number" required>
        <span class="icon is-small"><i class="fa fa-phone"></i></span>
      </p>

      <p class="control">
        <button type="submit" v-on:click.prevent="submitForm" class="button is-primary">
          Submit
        </button>
      </p>
    </form>
  </div>
</template>

<script type="text/babel">
import config from '../config'
import axios from 'axios'

export default {
  name: 'register',
  data () {
    return {
      name: '',
      password: '',
      email: '',
      address: '',
      city: '',
      phone: ''
    }
  },
  methods: {
    submitForm () {
      const user = {
        'password': this.password,
        'address': this.address,
        'phoneNumber': this.phone,
        'city': this.city,
        'name': this.name,
        'emailaddress': this.email
      }

      const url = config.host + '/auctionhouse/users'
      axios.post(url, user).then(() => {
        this.$emit('showNotification', {
          'type': 'is-success',
          'message': 'You\'ve been registered, use the form below to log in.',
          'duration': 2
        })

        this.$router.push('/login')
      }).catch(() => {
        this.$emit('showNotification', {
          'type': 'is-danger',
          'message': 'Registration error.',
          'duration': 2
        })
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
