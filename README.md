# Instasift
Sifting instagram users and calculate relevant stats

## Usage
```
git clone <this repo>
npm install
mkdir data
npm run instasift <instagram-user-name>
npm start
open localhost:3000
```

## Currently showing

- Website
- Link to users
- Number of followers
- Number of posts
- Number of posts last 3 months
- Average number of likes
- Average number of likes last three months
- Most liked image
- Least liked image
- Sparkline graph showing like history

## Todo
- Allow instasift input through the web interface, not just cli
- Sort the user list by followers, average likes, etc
- Avgerage video views
- Detect use of bad hashtags (#likeforlike, #instalike, #followme, #followforfollow)
- Usernames on likers of all posts (by the user we're sifting)
- Swap the json file backend for something moar cleverer
