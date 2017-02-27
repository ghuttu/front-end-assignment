const env = 1 // 0 is dev, 1 is production

export default {
  host: env === 0 ? 'http://wcs2.dev' : '',
  base: env === 0 ? '' : '/app/',
  bidTime: 120,
  startingBid: 150000,
  autoBidChance: 25
}
