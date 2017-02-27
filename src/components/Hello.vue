<template>
  <div class="component-container column is-8-desktop is-offset-2-desktop is-10 is-offset-1">
    <h2 class="title is-2 has-text-centered">AuctionHouse</h2>
    <p class="subtitle is-4 has-text-centered">Upcoming auctions:</p>

    <carousel :auto="6001" :watch-items="houses" :dots="false" v-if="houses.length > 0" v-on:changed-index="carouselChangedIndex">
      <carousel-item v-for="house in houses">
        <house-info :house="house"></house-info>
      </carousel-item>
      <!--<div slot="before">Insert node before</div>-->
      <!--<div slot="after">Insert node after</div>-->
    </carousel>
    <no-auctions v-else=""></no-auctions>
  </div>
</template>

<script type="text/babel">
import { Carousel, CarouselItem } from 'vue-l-carousel'
import HouseInfo from './HouseInfo'
import NoAuctions from './NoAuctions'

export default {
  components: {
    'carousel': Carousel,
    'carousel-item': CarouselItem,
    'house-info': HouseInfo,
    'no-auctions': NoAuctions
  },
  name: 'hello',
  data () {
    return {
      auto: 3000
    }
  },
  props: ['houses'],
  methods: {
    carouselChangedIndex (test) {
      // TODO add better navigation to carousel
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .v-carousel {
    max-width: 550px !important;
    margin: auto auto;
  }
</style>
