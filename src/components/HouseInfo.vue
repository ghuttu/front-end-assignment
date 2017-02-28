<template>
  <article class="message is-dark">
    <div class="message-body">
      <h3 class="title is-3 house-header has-text-centered">{{ house.type }} house</h3>
      <div class="tile is-ancestor">
        <div class="tile is-parent is-vertical">
          <div class="tile">
            <article class="tile is-child message is-dark">
              <div class="message-body">
              <p class="title has-text-centered">{{ house.identification }}</p>
              <p class="subtitle has-text-centered"><small>ID</small></p>
              </div>
            </article>
          </div>
          <div class="tile">
            <article class="tile is-child message is-dark">
              <div class="message-body">
              <p class="title has-text-centered">{{ house.surface }} m<sup>2</sup></p>
              <p class="subtitle has-text-centered"><small>Surface</small></p>
              </div>
            </article>
          </div>
        </div>

        <div class="tile is-parent is-vertical">
          <div class="tile">
            <article class="tile is-child message is-dark">
              <div class="message-body">
                <p class="title has-text-centered">{{ house.askingPrice }} &euro;</p>
                <p class="subtitle has-text-centered"><small>Asking price</small></p>
              </div>
            </article>
          </div>
          <div class="tile">
            <article class="tile is-child message is-dark">
              <div class="message-body">
                <p class="title has-text-centered">{{ house.minimumPrice }} &euro;</p>
                <p class="subtitle has-text-centered"><small>Minimum price</small></p>
              </div>
            </article>
          </div>
        </div>
      </div>
      <h4 class="title is-4 has-text-centered">{{ format(house.startDateTimeAuction) }}</h4>
      <hr>
      <p class="description">{{ house.description }}</p>
    </div>
  </article>
</template>

<script type="text/babel">
  const moment = require('moment')

  export default {
    name: 'house',
    props: ['house'],
    methods: {
      format (timestamp) {
        return moment(timestamp).format('MMMM Do, HH:mm')
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  $dark: #333333;
  @import '../../node_modules/bulma/sass/utilities/variables';

  .tile { margin: 5px }
  .title { color: $success }
  .value, .house-header, house-date { color: $dark !important; }
  article {
    max-width: 550px;
    margin: auto auto;
  }
  .message-body {
    font-size: 20px !important;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    -ms-border-radius: 10px;
    border-radius: 10px;
    background: #ffffff;
    background: -webkit-linear-gradient(#ffffff, #cccccc);
    background: -o-linear-gradient(red, yellow);
    background: -moz-linear-gradient(red, yellow);
    background: linear-gradient(#ffffff, #eeeeee);
  }
  .description {
    padding: 5px;
    font-size: 0.6em;
    color: #000000 !important;
  }
  @media only screen and (max-width: 768px) {
    .title { font-size: 3.5vw; }
    .subtitle { font-size: 2.5vw; }
  }
  @media only screen and (max-width: 600px) {
    .title { font-size: 4.5vw; }
    .subtitle { font-size: 3.5vw; }
  }
</style>
