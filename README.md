# Front-end assignment

## Running the app

Place auctionhouse.jar in the root directory and run 'java -jar auctionhouse.jar'. You can access the app at http://localhost:8080/app/.

## Framework

This app was built with Vue.js ^2.0. Vue-loader (a Webpack loader) was used for converting the Vue components to plain Javascript, among other things. Vue-router was used for mapping Vue components to routes.

## Libraries / tools

Todo

## Overview

Todo

## App components / pages

These components are located in /src/components, and they include the HTML, Javascript (ES2015) and CSS (Sass/SCSS) all in one .vue file.

- ### Home page (Hello.vue)
The home page with a carousel displaying the upcoming auctions.

- ### Auction page (Auction.vue)
Component which runs an auction once one has started. If no auction is running, this page displays the next upcoming auction.

- ### Admin page (Admin.vue)
This page is protected with a password, which is 'admin'. :) This is just a simple check on the front end, obviously with a real app you would check on the server if the user has admin privileges. Admin state isn't persisted if the page is reloaded. On the admin page, you can:
  - Add a new auction / house
  - Change the available time the user has for bidding before the auction ends, if the current bid is above minimum price.
  - Alter the chance of automatic bids happening

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
