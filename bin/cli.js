#!/usr/bin/env node

if (process.argv.length !== 3) {
  console.error('USAGE: geo-legacy <npm username>')
  process.exit(1)
}

var legacy = require('../')

legacy(process.argv[2], function (err, data) {
  if (err) return console.log(err)
  console.log(data)
})
