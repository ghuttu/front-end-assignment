<template>
  <div class="notification-container">
    <div class="notification" :class="type">
      <button class="delete" v-on:click="hide"></button>
      {{ message }}
    </div>
  </div>
</template>

<script type="text/babel">
export default {
  name: 'notification',
  props: ['type', 'message', 'duration'],
  methods: {
    hide: function () {
      this.$emit('hideNotification')
    }
  },
  watch: {
    duration: function (newDuration) {
      setTimeout(() => {
        this.$emit('hideNotification')
      }, newDuration * 1000)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .notification-container {
    position: absolute;
    width: 100%;
    max-width: 1150px;
  }
  .notification {
    margin-top: 3px
  }
</style>
