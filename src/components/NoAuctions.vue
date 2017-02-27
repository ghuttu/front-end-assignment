<template>
  <article v-else="" class="message is-danger">
    <div class="message-body">
      No auctions found, please check back later.
    </div>
  </article>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>

<script type="text/babel">
  export default {
    name: 'no-auctions'
  }
</script>
