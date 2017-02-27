<template>
  <div class="component-container is-8-desktop is-offset-2-desktop column is-10 is-offset-1">
    <div v-if="house">
      <transition
              name="custom-classes-transition"
              enter-active-class="animated wobble"
              leave-active-class="animated fadeOut"
      >
        <h3 v-if="!newAuction" class="title is-3 has-text-centered">Current auction</h3>
      </transition>

      <transition
              name="custom-classes-transition"
              enter-active-class="animated wobble"
              leave-active-class="animated fadeOut"
      >
        <h3 v-if="newAuction" class="title is-3 has-text-centered">Next auction</h3>
      </transition>

      <house-info :house="house"></house-info>

      <article v-if="!started" class="info message is-primary">
        <div class="message-body">
          <span>
            <i class="fa fa-info-circle fa-2x" aria-hidden="true"></i>
            This auction starts in {{ timeToAuction }}.
          </span>
        </div>
      </article>
      <transition
              name="custom-classes-transition"
              enter-active-class="animated fadeIn"
              leave-active-class="animated zoomOut"
      >
        <div v-if="started && !finished && !waiting" class="current-bid has-text-centered">
          <p>Current bid:</p>
          <br>
          <span class="tag is-black is-large">{{ currentBid }} &euro;</span>
          <div v-if="currentBid >= house.minimumPrice">
            <hr>
            Time remaining to make a bid: <strong>{{ remainingBidTime }} s</strong>
            <progress class="progress is-info" :value="remainingBidTime" :max="bidTime">
            </progress>
          </div>
        </div>

        <div v-if="finished && started || waiting" class="auction-finished">
          <div class="notification is-primary">
            This auction has finished! House sold for {{ currentBid }} &euro;.
          </div>

          <router-link to="/" exact>
            Go to home page
          </router-link>
        </div>
      </transition>
    </div>
    <no-auctions v-else=""></no-auctions>
  </div>
</template>

<script type="text/babel">
import config from '../config'
import HouseInfo from './HouseInfo'
import NoAuctions from './NoAuctions'
var moment = require('moment')

export default {
  name: 'auction',
  components: {
    HouseInfo,
    NoAuctions
  },
  props: [
    'settings',
    'house',
    'houses',
    'started',
    'newAuction',
    'waiting',
    'currentTimestamp'
  ],
  data () {
    return {
      bidTime: this.settings.bidTime,
      currentBid: config.startingBid,
      timeSinceLastBid: 0,
      totalBidsMade: 0
    }
  },
  watch: {
    // If the 'started' prop changes, start running the auction
    started: function (newStarted) {
      if (newStarted === true) {
        this.resetAuction() // Reset auction in case the component wasn't created/mounted (user stayed in this view)
        window.addEventListener('keyup', this.bid)
        this.runAuction()
      }
    }
  },
  computed: {
    timeToAuction: function () {
      // Show time remaining to next auction
      return moment.duration(this.house.startDateTimeAuction - this.currentTimestamp).humanize()
    },
    remainingBidTime: function () {
      // If remaining bid time goes to 0, this auction is considered finished
      let remainingBidTime = this.settings.bidTime - this.timeSinceLastBid

      // If current bid isn't over the min price, there's no time limit to bid
      if (!this.house || this.currentBid < this.house.minimumPrice) {
        remainingBidTime = this.settings.bidTime
      }

      // Don't go below 0
      if (remainingBidTime < 0) {
        remainingBidTime = 0
      }

      return remainingBidTime
    },
    finished: function () {
      // Auction is considered finished if:
      // Current bid reaches the asking price
      // Remaining bid time runs down to 0
      return ((this.house && this.currentBid >= this.house.askingPrice) || this.remainingBidTime === 0)
    }
  },
  methods: {
    format (date) {
      return moment(date).format('MMMM Do, HH:mm')
    },
    resetAuction () {
      this.currentBid = 150000
      this.timeSinceLastBid = 0
      this.totalBidsMade = 0
    },
    bid (event) {
      // User made a bid
      if (this.finished) {
        return
      }

      if (event.keyCode === 32) {
        this.bidMade()
      }
    },
    bidMade () {
      if (this.finished) {
        return
      }

      this.currentBid += 5000
      this.timeSinceLastBid = 0
      this.totalBidsMade++
    },
    simulateBid () {
      if (this.finished) {
        return
      }

      const randomNumber = Math.floor((Math.random() * 100) + 1)
      if (randomNumber >= 1 && randomNumber <= this.settings.autoBidChance) {
        this.bidMade()
      }
    },
    runAuction () {
      const interval = setInterval(() => {
        // House property not initialized yet
        if (this.house === null) {
          return
        }

        // Auction has finished, clear interval and end auction
        if (this.finished) {
          clearInterval(interval)
          this.endAuction()
          return
        }

        if (this.totalBidsMade > 0) {
          this.timeSinceLastBid++
        }

        this.simulateBid()
      }, 1000)
    },
    endAuction () {
      // Remove listener and emit event to parent
      window.removeEventListener('keyup', this.bid)
      this.$emit('auctionEnded', this.house.identification)
    }
  },
  mounted: function () {
    // Runs auction (if one has been started) when component is mounted
    if (this.started && !this.waiting) {
      window.addEventListener('keyup', this.bid)
      this.runAuction()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .info {
    max-width: 400px;
    margin: auto auto;
  }

  .current-bid, .auction-finished {
    width: 50%;
    margin: auto auto;
  }
</style>
