import React from 'react'
import {
  Sparklines,
  SparklinesLine,
  SparklinesBars,
  SparklinesReferenceLine
} from 'react-sparklines'
import moment from 'moment'

module.exports = React.createClass({
  displayName: 'InstagramProfile',

  propTypes: {
    profile: React.PropTypes.object
  },

  render() {
    const {profile} = this.props
    return (
      <li className="profile">
        <h2><a href={`https://instagram.com/${profile.username}`} target="_blank">@{profile.username}</a></h2>
        <table>
          <tbody>
            <tr>
              <th>Website</th>
              <th><a href={`${profile.website}`} target="_blank"> {profile.website}</a></th>
            </tr>
            <tr>
              <th>User ID</th>
              <th>{profile.userId}</th>
            </tr>
            <tr>
              <th>Followers</th>
              <th>{profile.followers}</th>
            </tr>
            <tr>
              <th>Posts</th>
              <th>{profile.posts}</th>
            </tr>
            <tr>
              <th>Posts last 3 months</th>
              <th>{profile.freshPosts}</th>
            </tr>
            <tr>
              <th>Avgerage likes</th>
              <th>{profile.averageLikes}</th>
            </tr>
            <tr>
              <th>Average likes last 3 months</th>
              <th>{profile.averageFreshLikes}</th>
            </tr>
            <tr>
              <th>Avgerage comments</th>
              <th>{profile.averageComments}</th>
            </tr>
          </tbody>
        </table>

        <div>
          <Sparklines data={profile.likeHistory}>
            <SparklinesBars />
            <SparklinesReferenceLine type="mean" />
          </Sparklines>
        </div>

        <div className="image-box">
          <a className="image-link" href={`https://instagram.com/p/${profile.mostLikedImage.id}`} target="_blank">
            <img className="best" src={profile.mostLikedImage.media}/>
          </a>
          <ul className="image-text-list">
            <li className="image-text">{profile.mostLikedImage.likes} likes</li>
            <li className="image-text">Posted {moment(profile.mostLikedImage.time*1000).fromNow()}</li>
          </ul>
        </div>

        <div className="image-box">
          <a className="image-link" href={`https://instagram.com/p/${profile.leastLikedImage.id}`} target="_blank">
            <img className="worst" src={profile.leastLikedImage.media}/>
          </a>
          <ul className="image-text-list">
            <li className="image-text">{profile.leastLikedImage.likes} likes</li>
            <li className="image-text">Posted {moment(profile.leastLikedImage.time*1000).fromNow()}</li>
          </ul>
        </div>
        <hr/>
      </li>
    )
  }

})
