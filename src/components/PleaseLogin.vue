<template>
  <article v-else="" class="message">
    <div class="message-body">
      Please <router-link to="/register">register</router-link> and/or <router-link to="/login">log in</router-link> to use this app.
    </div>
  </article>
</template>

<script type="text/babel">

export default {
  name: 'please-login'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  @import '../../node_modules/bulma/sass/utilities/variables';

  .message {
    width: 350px;
    margin: 60px auto;
  }

  article a { color: $primary !important; }
</style>
