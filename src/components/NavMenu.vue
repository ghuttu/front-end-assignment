<template>
  <nav class="nav has-shadow">
    <div class="container">
      <div class="nav-left">
        <router-link to="/" exact active-class="is-active" class="nav-item is-tab">
          <span class="icon"><i class="fa fa-home" aria-hidden="true"></i></span>
          <span>Home</span>
        </router-link>

        <router-link to="/auction" exact active-class="is-active" class="nav-item is-tab">
          <span class="icon"><i class="fa fa-users" aria-hidden="true"></i></span>
          <span>Auction</span>
        </router-link>

        <router-link to="/admin" exact active-class="is-active" class="nav-item is-tab">
          <span class="icon"><i class="fa fa-lock" aria-hidden="true"></i></span>
          <span>Admin</span>
        </router-link>
      </div>

      <span class="nav-toggle" @click="toggle">
        <span></span>
        <span></span>
        <span></span>
      </span>

      <div class="nav-right nav-menu" :class="{ 'is-active': isActive }" @click="isActive = false">
        <router-link
                v-if="!loggedIn"
                to="/login" exact
                active-class="is-active"
                class="nav-item is-tab">
          <span class="icon"><i class="fa fa-sign-in" aria-hidden="true"></i></span>
          <span>Log in</span>
        </router-link>

        <router-link
                v-if="!loggedIn"
                to="/register" exact
                active-class="is-active"
                class="nav-item is-tab">
          <span class="icon"><i class="fa fa-pencil" aria-hidden="true"></i></span>
          <span>Register</span>
        </router-link>

        <span class="nav-item is-tab" v-if="loggedIn">
            <span class="icon"><i class="fa fa-user-o"></i></span>
            {{ authenticatedUser }}
          </span>

        <a class="nav-item is-tab" v-if="loggedIn" @click="logOut">
            <span class="icon"><i class="fa fa-sign-out" aria-hidden="true"></i></span>
          <span>Log out</span>
        </a>
      </div>
    </div>
  </nav>
</template>

<style lang="scss" scoped></style>

<script type="text/babel">
    export default {
      props: ['loggedIn', 'authenticatedUser'],
      data () {
        return {
          isActive: false
        }
      },
      methods: {
        toggle () {
          this.isActive = !this.isActive
        },
        logOut () {
          this.$emit('loggedOut')
        }
      }
    }
</script>
