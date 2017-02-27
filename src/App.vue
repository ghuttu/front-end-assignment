<template>
  <div id="app">
    <nav-menu :loggedIn="loggedIn" :authenticatedUser="authenticatedUser" v-on:loggedOut="logOut"></nav-menu>

    <transition
      name="custom-classes-transition"
      enter-active-class="animated fadeIn"
      leave-active-class="animated zoomOut"
    >
      <notification
         v-show="notification.show"
         :type="notification.type"
         :message="notification.message"
         :duration="notification.duration"
         v-on:hideNotification="hideNotification">
      </notification>
    </transition>

    <div v-if="loggedIn || this.$route.name === 'Login' || this.$route.name === 'Register' || this.$route.name === 'Admin'">
      <transition
              name="custom-classes-transition"
              enter-active-class="animated fadeIn"
      >
        <router-view :houses="housesSortedByTimestamp" :house="house" :started="auctionStarted" :is-admin="isAdmin"
                     :current-timestamp="currentTimestamp" :new-auction="newAuction" :waiting="waiting"
                     :settings="settings"
                     v-on:userLoggedIn="logIn($event)"
                     v-on:houseAdded="addHouse($event)"
                     v-on:auctionEnded="auctionEnded($event)"
                     v-on:showNotification="showNotification($event)"
                     v-on:adminLogin="adminLogin"
        >
        </router-view>
      </transition>
    </div>
    <please-login v-else=""></please-login>
  </div>
</template>

<style lang="scss">
  body {
    background-color: #000000;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    max-width: 1150px;
    min-height: 100vh;
    margin: auto auto;
    background-color: #ffffff;
  }

  .component-container {
    margin-top: 70px
  }
</style>

<script type="text/babel">
import Notification from 'components/Notification'
import PleaseLogin from 'components/PleaseLogin'
import NavMenu from 'components/NavMenu'
import config from 'config'
import axios from 'axios'
import bus from './bus'
var moment = require('moment')

export default {
  name: 'app',
  components: {
    Notification,
    PleaseLogin,
    NavMenu
  },
  data () {
    return {
      settings: {
        bidTime: config.bidTime,
        autoBidChance: config.autoBidChance
      },
      authenticatedUser: sessionStorage.getItem('authenticatedUser'),
      isAdmin: false,
      // houseInAuction: null, // The house that is currently in auction
      houses: [],
      auctionStarted: false,
      newAuction: false,
      waiting: false,
      notification: {
        show: false,
        type: '',
        message: '',
        duration: undefined
      },
      currentTimestamp: null
    }
  },
  computed: {
    house () {
      return this.housesSortedByTimestamp[0]
    },
    loggedIn () {
      return this.authenticatedUser !== null
    },
    housesSortedByTimestamp () {
      var houses = this.houses.slice()

      return houses.sort((a, b) => {
        return a.startDateTimeAuction - b.startDateTimeAuction
      })
    }
  },
  methods: {
    showNotification (notification) {
      this.notification.type = notification.type
      this.notification.message = notification.message
      this.notification.duration = notification.duration
      this.notification.show = true
    },
    hideNotification () {
      this.notification.show = false
      this.notification.type = ''
      this.notification.message = ''
      this.notification.duration = undefined
    },
    logIn (currentUser) {
      sessionStorage.setItem('authenticatedUser', currentUser.emailaddress)
      this.authenticatedUser = currentUser.emailaddress
    },
    logOut () {
      this.authenticatedUser = null
      sessionStorage.removeItem('authenticatedUser')
      this.showNotification({
        type: 'is-success',
        message: 'You have logged out.',
        duration: 2
      })
    },
    resetData () {
      this.houses = []
      this.logOut()
    },
    addHouse (house) {
      this.houses.push(house)
    },
    removeHouse (id) {
      const index = this.findHouseIndex(id)
      if (index >= 0) {
        this.houses.splice(index, 1)
      }
    },
    findHouseIndex (id) {
      for (let i = 0; i < this.houses.length; i++) {
        if (this.houses[i].identification === id) {
          return i
        }
      }

      return -1
    },
    auctionEnded (houseId) {
      this.waiting = true
      setTimeout(() => {
        this.removeHouse(houseId)
        this.auctionStarted = false
        this.newAuction = true
        this.waiting = false
        this.watchForAuctions()
      }, 6000)
    },
    fetchHouses () {
      const url = config.host + '/auctionhouse/houses'
      axios.get(url).then((response) => {
        this.houses = response.data
      })
      // TODO/CHECK make sure houses array is available for Auction component
    },
    adminLogin () {
      this.isAdmin = true
    },
    saveSettings (settings) {
      this.settings.bidTime = settings.bidTime
      this.settings.autoBidChance = settings.autoBidChance
      sessionStorage.setItem('bidTime', settings.bidTime)
      sessionStorage.setItem('autoBidChance', settings.autoBidChance)
    },
    watchForAuctions () {
      const interval = setInterval(() => {
        if (!this.loggedIn) {
          return
        }

        this.currentTimestamp = moment().valueOf() // Unix timestamp in milliseconds

        if (this.houses.length > 0) {
          for (var house of this.houses) {
            if (this.currentTimestamp > house.startDateTimeAuction) {
              this.auctionStarted = true
              this.newAuction = false
              // this.houseInAuction = house
              this.showNotification({
                type: 'is-info',
                message: 'Auction starting... press space bar to make a bid.',
                duration: 4
              })

              clearInterval(interval)
              this.$router.push('/auction')
              break
            }
          }
        }
      }, 1000)
    }
  },
  created: function () {
    if (sessionStorage.getItem('bidTime') !== null) {
      this.settings.bidTime = parseInt(sessionStorage.getItem('bidTime'))
    }

    if (sessionStorage.getItem('autoBidChance') !== null) {
      this.settings.autoBidChance = parseInt(sessionStorage.getItem('autoBidChance'))
    }

    bus.$on('showNotification', (notification) => {
      this.showNotification(notification)
    })

    bus.$on('dataReset', () => {
      this.resetData()
    })

    bus.$on('settingsSaved', (settings) => {
      this.saveSettings(settings)
    })
  },
  mounted: function () {
    this.fetchHouses()
    this.watchForAuctions()
  }
}
</script>
