# Front-end assignment

## Running the app

Place auctionhouse.jar in the root directory and run 'java -jar auctionhouse.jar'. You can access the app at http://localhost:8080/app/.

## Framework

This app has been built with Vue.js ^2.0. Vue-loader (a Webpack loader) is used for converting the Vue components to plain Javascript, among other things. Vue-router is used for mapping Vue components to routes.

## Some of the modules / tools used

- Bulma.io CSS framework
- Animate.css
- Babel
- Webpack
- ESLint

## Overview

To use the app, first register a user and log in with email address and password. Log in status is saved to session storage so it will persist until you close the browser tab or log out from the app.

To add an auction / house for sale, go to the admin page. The password to access it is 'admin'. From there you can add a house and also change a couple of settings to make testing the app easier. Details below in the admin page section.

Once a house is added it will appear in the carousel on the home page and also shown in the auction page. An auction will start on the provide date and time. If you add an auction that is in the "past", that auction will start immediately.

## Running the auction

Once an auction starts, you'll be taken to the auction page/component, as long as you're logged in. You can make bids by pressing space bar and there will be some simulated bids, too. You can change the change of simulated bids happening in the admin area.

The way I've implemented the auction is that the auction component is responsible for handling the state of the auction. That means that if you navigate away from this page when the auction is running, the auction state will be lost. If you return to the page, the auction will start again.

I thought about having a dedicated auction object/class for running the auction, which would be able to keep track of the state across all of the app. But in a real app you'd get that info from the backend server anyway, so I left it like this. It probably depicts better how I'd organise the front end code, at least with this framework.

Anyway, the auction will end if the 'asking price' is reached, or the timer runs out after a bid when the bid is above minimum price.

When the auction ends, it will be removed after a few seconds and the next auction will be displayed on the page. The auction will not be removed from the database though, as there's no end point for that, so after a page refresh the same auctions will be loaded from the backend. You can remove all data (users & houses) on the admin page.

## App components / pages

These components are located in /src/components, and they include the HTML, Javascript/ES2015 and CSS (Sass/SCSS) all in one .vue component file.

- ### App.vue
Main component including the layout and nav menu. Also handles the events emitted by child components.

- ### Home page (Hello.vue)
The home page with a carousel displaying the upcoming auctions. Houses that have been sold will be removed from this carousel.

- ### Auction page (Auction.vue)
The component which runs an auction once one has started. If no auction is running, this page displays the next upcoming auction.

- ### Admin page (Admin.vue)
This page is protected with a password, which is 'admin'. :) This is just a simple check on the front end, obviously with a real app you would check on the server if the user has admin privileges. Admin state isn't persisted if the page is reloaded. On the admin page, you can:
  - Add a new auction / house
  - Change the available time the user has for bidding before the auction ends, if the current bid is above minimum price
  - Alter the chance of automatic bids happening
  - Remove all data from backend (users & houses)

- ### Register page (Register.vue)
The form for registering a new user.

- ### Log in page (Login.vue)
You log in here, duh. User authentication state is saved in session storage so it persists even if the page is reloaded.

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
set env variable to 0 in src/config.js
npm run dev

# build for production with minification
set env variable to 1 in src/config.js
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```
