#!/usr/bin/env node
const path = require('path')
const username = process.argv[2]
import {getAccountStats} from 'instagram-scrape-account-stats'

if (!username) {
  console.log('Usage: instasift <username>')
}

function getUserProfile(username) {
  return getAccountStats({username: username}).then(account => {
    console.log(account.username + " has " + account.followers + " followers.")
    return account
  })
}


getUserProfile(username).then(result => {
  console.log(result)
  console.log('all done')
})
