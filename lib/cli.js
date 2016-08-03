#!/usr/bin/env node
'use strict';

var _instagramScrapeAccountStats = require('instagram-scrape-account-stats');

var path = require('path');
var username = process.argv[2];


if (!username) {
  console.log('Usage: instasift <username>');
}

function getUserProfile(username) {
  return (0, _instagramScrapeAccountStats.getAccountStats)({ username: username }).then(function (account) {
    console.log(account.username + " has " + account.followers + " followers.");
    return account;
  });
}

getUserProfile(username).then(function (result) {
  console.log(result);
  console.log('all done');
});