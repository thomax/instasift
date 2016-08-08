#!/usr/bin/env node
import {writeFileSync} from 'fs'
import exists from 'file-exists-sync'
import {getAccountStats} from 'instagram-scrape-account-stats'
import {InstagramPosts} from 'instagram-screen-scrape'
import streamToPromise from 'stream-to-promise'
import moment from 'moment'
const dataDir = './data'
const badTags = ['#likeforlike', '#instalike', '#followme', '#followforfollow']
const username = process.argv[2]

if (!username) {
  throw new Error('Usage: instasift <username>')
}

function getUserProfile(username) {
  return getAccountStats({username: username}).then(account => {
    console.log(`${account.username} has ${account.followers} followers`)
    return account
  })
}

function getUserPosts(username) {
  const streamOfPosts = new InstagramPosts({username: username})
  const posts = []
  streamOfPosts.on('data', post => {
    const {likes, comments} = post
    const time = new Date(post.time * 1000).toLocaleDateString()
    //const message = `${username}'s post from ${time} got ${likes} like(s), and ${comments} comment(s)`
    const message = `${JSON.stringify(post, null, 2)}`
    console.log(message)
    posts.push(post)
  })

  return streamToPromise(streamOfPosts).then(() => {
    return posts
  })
}


function decorateProfile(profile, posts) {
  const result = Object.assign({}, profile)

  var totalLikes = 0
  var totalComments = 0
  var totalVideoViews = 0
  const likeHistory = []
  var mostLikedImage = {likes: -1}
  var leastLikedImage = {likes: 9999999999}
  var freshPosts = 0
  var freshLikes = 0
  const freshThreshold = moment().subtract(3, 'months')

  posts.forEach(post => {
    totalLikes += post.likes
    totalComments += post.comments
    likeHistory.push(post.likes)

    // count posts within limit
    if (moment(post.time * 1000).valueOf() > freshThreshold.valueOf()) {
      freshPosts += 1
      freshLikes += post.likes
    }
    if (post.type == 'image') {
      if (post.likes > mostLikedImage.likes) {
        mostLikedImage = post
      }
      if (post.likes < leastLikedImage.likes) {
        leastLikedImage = post
      }
    }
    if (post.type == 'video') {
      // record something usefule with post.videoViews
    }
  })
  result.averageLikes = Number((totalLikes/profile.posts).toFixed(1))
  result.averageComments = Number((totalComments/profile.posts).toFixed(1))
  result.mostLikedImage = mostLikedImage
  result.leastLikedImage = leastLikedImage
  result.likeHistory = likeHistory.reverse()
  result.freshPosts = freshPosts
  result.averageFreshLikes = Number((freshLikes/freshPosts).toFixed(1))
  return result
}

function storeProfile(username, dataAsObject) {
  writeFileSync(`${dataDir}/${username}-profile.json`, JSON.stringify(dataAsObject, null, 2))
}
function storePosts(username, dataAsObject) {
  writeFileSync(`${dataDir}/${username}-posts.json`, JSON.stringify(dataAsObject, null, 2))
}
function storeAllProfiles(profile) {
  var allProfiles = []
  if (exists('../data/allProfiles.json')) {
    allProfiles = require('../data/allProfiles')
  }
  const index = indexOfProfile(profile, allProfiles)
  if (index > -1) {
    allProfiles[index] = profile
  } else {
    allProfiles.push(profile)
  }
  writeFileSync(`${dataDir}/allProfiles.json`, JSON.stringify(allProfiles, null, 2))
}

function indexOfProfile(profile, allProfiles) {
  for (var i = 0 ; i < allProfiles.length ; i++) {
    if (profile.username == allProfiles[i].username) {
      return i
    }
  }
  return -1
}

getUserPosts(username).then(posts => {
  getUserProfile(username).then(basicProfile => {
    if (basicProfile.isPrivate) {
      console.log('Account is private, exiting')
      return
    }
    storePosts(username, posts)
    const profile = decorateProfile(basicProfile, posts)
    storeProfile(username, profile)
    storeAllProfiles(profile)
    console.log('all done')
  })
})
