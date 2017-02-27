<template>
  <div class="component-container is-4-desktop is-offset-4-desktop column is-half is-offset-one-quarter">
    <div v-if="!isAdmin">
      <h3 class="title is-3">Admin area</h3>
      <p class="subtitle is-5">Please log in with the admin password</p>

      <form>
        <label class="label" for="password">Password</label>
        <p class="control has-icon">
          <input type="password" class="input" id="password" placeholder="Password" ref="password" autofocus>
          <span class="icon is-small"><i class="fa fa-lock"></i></span>
        </p>

        <p class="control">
          <button type="submit" @click.prevent="checkPassword" class="button is-primary">
            Submit
          </button>
        </p>
      </form>
    </div>
    <div v-else>
      <div class="has-text-centered">
        <a @click.prevent="showSettings = false" class="button" :class="{ 'is-focused': !showSettings }">
          Add auction
        </a>
        <a @click.prevent="showSettings = true" class="button" :class="{ 'is-focused': showSettings }">
          Settings
        </a>
      </div>

      <div v-if="showSettings">
        <admin-settings :settings="settings"></admin-settings>
      </div>

      <div v-else="">
        <h3 class="title is-3">Add Auction</h3>

        <form>
          <label class="label" for="identification">Identification</label>
          <p class="control">
            <input v-model="identification" type="text" class="input" id="identification" placeholder="Identification">
          </p>

          <label class="label" for="surface">Surface</label>
          <p class="control">
            <input v-model="surface" type="number" class="input" id="surface" placeholder="Surface">
          </p>

          <label class="label" for="type">Type</label>
          <p class="control">
            <select v-model="selected" class="input" id="type">
              <option value="CORNER">CORNER</option>
              <option value="TERRACED">TERRACED</option>
              <option value="DETACHED">DETACHED</option>
              <option value="APARTMENT">APARTMENT</option>
            </select>
          </p>

          <label class="label" for="description">Description</label>
          <p class="control">
          <textarea v-model="description" type="text" class="textarea" id="description" placeholder="Description"
                    width="200" height="50"
          >
          </textarea>
          </p>

          <label class="label" for="askingPrice">Asking price</label>
          <p class="control">
            <input v-model="askingPrice" type="number" class="input" id="askingPrice" placeholder="Asking price">
          </p>

          <label class="label" for="minimumPrice">Minimum price</label>
          <p class="control">
            <input v-model="minimumPrice" type="number" class="input" id="minimumPrice" placeholder="Minimum price">
          </p>

          <label class="label" for="datetime">Date and time</label>
          <div class="control is-grouped" id="datetime">
            <p class="control is-expanded">
              <datepicker v-model="selectedDate" input-class="input"></datepicker>
            </p>

            <p class="control">
              <vue-timepicker v-model="selectedTime" format="HH:mm"></vue-timepicker>
            </p>
          </div>
          <p class="control">
            <button type="submit" @click.prevent="submitForm" class="button is-primary">Submit</button>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script type="text/babel">
import config from '../config'
import AdminSettings from './AdminSettings'
import Datepicker from 'vuejs-datepicker'
import VueTimepicker from 'vue2-timepicker'
import axios from 'axios'
var moment = require('moment')

export default {
  components: {
    AdminSettings,
    Datepicker,
    VueTimepicker
  },
  name: 'admin',
  props: ['isAdmin', 'settings'],
  data () {
    return {
      showSettings: false,
      selected: 'CORNER',
      identification: '',
      surface: 100,
      askingPrice: 200000,
      description: '',
      minimumPrice: 175000,
      selectedDate: new Date(),
      selectedTime: {
        HH: new Date().toLocaleTimeString('en-GB', { hour: 'numeric' }),
        mm: moment().minute(),
        ss: '00'
      }
    }
  },
  methods: {
    checkPassword () {
      if (this.$refs.password.value === 'admin') {
        this.$emit('adminLogin')
        this.$emit('showNotification', {
          type: 'is-success',
          message: 'You are logged in as an admin.',
          duration: 2
        })
      } else {
        this.$emit('showNotification', {
          type: 'is-danger',
          message: 'Wrong password.',
          duration: 2
        })
      }
    },
    submitForm () {
      const url = config.host + '/auctionhouse/houses'
      let datetime = moment(this.selectedDate)
      datetime.hours(this.selectedTime.HH)
      datetime.minute(this.selectedTime.mm)
      datetime.second(0)

      const house = {
        identification: this.identification,
        surface: this.surface,
        askingPrice: this.askingPrice,
        description: this.description,
        type: this.selected,
        minimumPrice: this.minimumPrice,
        startDateTimeAuction: datetime
      }

      axios.post(url, house).then((response) => {
        // Get timestamp in milliseconds
        house.startDateTimeAuction = moment(house.startDateTimeAuction).valueOf()

        // Emit event to parent
        this.$emit('houseAdded', house)
        this.$emit('showNotification', {
          type: 'is-success',
          message: 'House added.',
          duration: 2
        })

        this.$router.push('/')
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
</style>
