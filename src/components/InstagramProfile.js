import React from 'react'
import {
  Sparklines,
  SparklinesLine
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
        <h2><a href={`https://instagram.com/${profile.username}`} target="_blank">{profile.username}</a></h2>
        <table>
          <tbody>
            <tr>
              <th>Website</th>
              <th><a href={`${profile.website}`} target="_blank"> {profile.website}</a></th>
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
            <SparklinesLine color="gray" style={{strokeWidth: 0.2, fill: 'none'}} />
          </Sparklines>
        </div>

        <div>
          <a className="imageLink" href={`https://instagram.com/p/${profile.mostLikedImage.id}`} target="_blank">
            <img className="best" src={profile.mostLikedImage.media}/>
          </a>
          <span className="imageText">Likes {profile.mostLikedImage.likes}</span>
        </div>

        <div>
          <a className="imageLink" href={`https://instagram.com/p/${profile.leastLikedImage.id}`} target="_blank">
            <img className="worst" src={profile.leastLikedImage.media}/>
          </a>
          <span className="imageText">Likes {profile.leastLikedImage.likes}</span>
          <span className="imageText">{moment(profile.leastLikedImage.time*1000).calendar()}</span>
        </div>
      </li>
    )
  }

})
