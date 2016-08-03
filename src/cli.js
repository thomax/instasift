#!/usr/bin/env node
const path = require('path')
const username = process.argv[2]
import {getAccountStats} from 'instagram-scrape-account-stats'
import {InstagramPosts} from 'instagram-screen-scrape'
import streamToPromise from 'stream-to-promise'

if (!username) {
  console.log('Usage: instasift <username>')
}

function getUserProfile(username) {
  return getAccountStats({username: username}).then(account => {
    console.log(account.username + " has " + account.followers + " followers.")
    return account
  })
}

function getUserPosts(username) {
  const streamOfPosts = new InstagramPosts({username: username})
  const posts = []
  streamOfPosts.on('data', post => {
    var time = new Date(post.time * 1000);
    console.log([
      username + "'s post from ",
      time.toLocaleDateString(),
      " got ",
      post.likes,
      " like(s), and ",
      post.comments,
      " comment(s)"
    ].join(''))
    posts.push(post)
  })

  return streamToPromise(streamOfPosts).then(() => {
    return posts
  })
}


// getUserProfile(username).then(result => {
//   console.log(result)
//   console.log('all done')
// })

getUserPosts(username).then(result => {
  console.log('all done', result.length)
})
