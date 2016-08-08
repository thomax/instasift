#!/usr/bin/env node
'use strict';

var _fs = require('fs');

var _fileExistsSync = require('file-exists-sync');

var _fileExistsSync2 = _interopRequireDefault(_fileExistsSync);

var _instagramScrapeAccountStats = require('instagram-scrape-account-stats');

var _instagramScreenScrape = require('instagram-screen-scrape');

var _streamToPromise = require('stream-to-promise');

var _streamToPromise2 = _interopRequireDefault(_streamToPromise);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dataDir = './data';
var badTags = ['#likeforlike', '#instalike', '#followme', '#followforfollow'];
var username = process.argv[2];

if (!username) {
  throw new Error('Usage: instasift <username>');
}

function getUserProfile(username) {
  return (0, _instagramScrapeAccountStats.getAccountStats)({ username: username }).then(function (account) {
    console.log(account.username + ' has ' + account.followers + ' followers');
    return account;
  });
}

function getUserPosts(username) {
  var streamOfPosts = new _instagramScreenScrape.InstagramPosts({ username: username });
  var posts = [];
  streamOfPosts.on('data', function (post) {
    var likes = post.likes;
    var comments = post.comments;

    var time = new Date(post.time * 1000).toLocaleDateString();
    //const message = `${username}'s post from ${time} got ${likes} like(s), and ${comments} comment(s)`
    var message = '' + JSON.stringify(post, null, 2);
    console.log(message);
    posts.push(post);
  });

  return (0, _streamToPromise2.default)(streamOfPosts).then(function () {
    return posts;
  });
}

function decorateProfile(profile, posts) {
  var result = Object.assign({}, profile);

  var totalLikes = 0;
  var totalComments = 0;
  var totalVideoViews = 0;
  var likeHistory = [];
  var mostLikedImage = { likes: -1 };
  var leastLikedImage = { likes: 9999999999 };
  var freshPosts = 0;
  var freshLikes = 0;
  var freshThreshold = (0, _moment2.default)().subtract(3, 'months');

  posts.forEach(function (post) {
    totalLikes += post.likes;
    totalComments += post.comments;
    likeHistory.push(post.likes);

    // count posts within limit
    if ((0, _moment2.default)(post.time * 1000).valueOf() > freshThreshold.valueOf()) {
      freshPosts += 1;
      freshLikes += post.likes;
    }
    if (post.type == 'image') {
      if (post.likes > mostLikedImage.likes) {
        mostLikedImage = post;
      }
      if (post.likes < leastLikedImage.likes) {
        leastLikedImage = post;
      }
    }
    if (post.type == 'video') {
      // record something usefule with post.videoViews
    }
  });
  result.averageLikes = Number((totalLikes / profile.posts).toFixed(1));
  result.averageComments = Number((totalComments / profile.posts).toFixed(1));
  result.mostLikedImage = mostLikedImage;
  result.leastLikedImage = leastLikedImage;
  result.likeHistory = likeHistory.reverse();
  result.freshPosts = freshPosts;
  result.averageFreshLikes = Number((freshLikes / freshPosts).toFixed(1));
  return result;
}

function storeProfile(username, dataAsObject) {
  (0, _fs.writeFileSync)(dataDir + '/' + username + '-profile.json', JSON.stringify(dataAsObject, null, 2));
}
function storePosts(username, dataAsObject) {
  (0, _fs.writeFileSync)(dataDir + '/' + username + '-posts.json', JSON.stringify(dataAsObject, null, 2));
}
function storeAllProfiles(profile) {
  var allProfiles = [];
  if ((0, _fileExistsSync2.default)('../data/allProfiles.json')) {
    allProfiles = require('../data/allProfiles');
  }
  var index = indexOfProfile(profile, allProfiles);
  if (index > -1) {
    allProfiles[index] = profile;
  } else {
    allProfiles.push(profile);
  }
  (0, _fs.writeFileSync)(dataDir + '/allProfiles.json', JSON.stringify(allProfiles, null, 2));
}

function indexOfProfile(profile, allProfiles) {
  for (var i = 0; i < allProfiles.length; i++) {
    if (profile.username == allProfiles[i].username) {
      return i;
    }
  }
  return -1;
}

getUserPosts(username).then(function (posts) {
  getUserProfile(username).then(function (basicProfile) {
    if (basicProfile.isPrivate) {
      console.log('Account is private, exiting');
      return;
    }
    storePosts(username, posts);
    var profile = decorateProfile(basicProfile, posts);
    storeProfile(username, profile);
    storeAllProfiles(profile);
    console.log('all done');
  });
});