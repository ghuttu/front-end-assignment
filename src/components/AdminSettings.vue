<template>
  <div>
    <hr>
    <button @click="reset" class="reset button is-large is-danger" title="Remove users and houses">
      Reset all data
    </button>
    <hr>
    <form>
      <label class="label" for="bid-time">Bid time (seconds)</label>
      <p class="control has-icon">
        <input type="number" class="input" id="bid-time" placeholder="Time to make a bid before auction ends"
               :value="settings.bidTime" min="5" max="120" autofocus v-model="newSettings.bidTime"
               title="Time remaining after a bid to make another bid before the auction ends"
        >
        <span class="icon is-small"><i class="fa fa-clock-o"></i></span>
      </p>

      <label class="label" for="bid-chance">Simulated bid chance %</label>
      <p class="control has-icon">
        <input type="number" class="input" id="bid-chance" placeholder="Chance of simulated bids"
               :value="settings.autoBidChance" min="1" max="100" autofocus v-model="newSettings.autoBidChance"
               title="Chance of simulated bids happening"
        >
        <span class="icon is-small"><i class="fa fa-percent"></i></span>
      </p>

      <p class="control">
        <button type="submit" @click.prevent="saveSettings" class="button is-primary">
          Submit
        </button>
      </p>
    </form>
  </div>
</template>

<script type="text/babel">
import config from '../config'
import axios from 'axios'
import bus from '../bus.js'

export default {
  name: 'admin-settings',
  props: ['settings'],
  data () {
    return {
      newSettings: {
        autoBidChance: this.settings.autoBidChance,
        bidTime: this.settings.bidTime
      }
    }
  },
  methods: {
    reset () {
      const url = config.host + '/auctionhouse/reset'
      axios.get(url).then((response) => {
        bus.$emit('dataReset')
        bus.$emit('showNotification', {
          type: 'is-success',
          message: 'Data reset.',
          duration: 2
        })
      })
    },
    saveSettings () {
      // Emit to App component via bus
      bus.$emit('settingsSaved', this.newSettings)
      bus.$emit('showNotification', {
        type: 'is-success',
        message: 'Settings saved.',
        duration: 2
      })
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .component-container {
    margin-bottom: 300px
  }

  .reset {
    display: block;
    margin: 50px auto;
  }
</style>
