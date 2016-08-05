#!/usr/bin/env node
import {writeFileSync} from 'fs'
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

// function postsByTime(a, b) {
//   if (a.time < b.time)
//     return -1
//   if (a.time > b.time)
//     return 1
//   return 0
// }


function decorateProfile(profile, posts) {
  const result = Object.assign({}, profile)

  var totalLikes = 0
  var totalComments = 0
  var totalVideoViews = 0
  var mostLikedImage = {likes: -1}
  var leastLikedImage = {likes: 9999999999}
  var totalFreshPosts = 0
  const freshThreshold = moment().subtract(3, 'months')

  posts.forEach(post => {
    totalLikes += post.likes
    totalComments += post.comments

    // count posts within limit
    if (moment(post.time * 1000).valueOf() > freshThreshold.valueOf()) {
      totalFreshPosts += 1
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
  result.freshPosts = freshPosts
  return result
}

function storeProfile(username, dataAsObject) {
  writeFileSync(`${dataDir}/${username}-profile`, JSON.stringify(dataAsObject, null, 2))
}
function storePosts(username, dataAsObject) {
  writeFileSync(`${dataDir}/${username}-posts`, JSON.stringify(dataAsObject, null, 2))
}

getUserPosts(username).then(posts => {
  storePosts(username, posts)
  getUserProfile(username).then(profile => {
    storeProfile(username, decorateProfile(profile, posts))
    console.log('all done')
  })
})
