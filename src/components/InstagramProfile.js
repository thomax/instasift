import React from 'react'

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
          <tr>
            <th>Website</th>
            <th><a href={`${profile.website}`} target="_blank"> {profile.website}</a></th>
          </tr>
          <tr>
            <th>Avgerage likes</th>
            <th>{profile.averageLikes}</th>
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
            <th>Avgerage comments</th>
            <th>{profile.averageComments}</th>
          </tr>
          <tr>
            <th>Posts last 3 months</th>
            <th>{profile.freshPosts}</th>
          </tr>
          <tr>
            <th>Average likes last 3 months</th>
            <th>{profile.averageFreshLikes}</th>
          </tr>
        </table>
        <a className="imageLink" href={`https://instagram.com/p/${profile.mostLikedImage.id}`} target="_blank">
          <img className="best" src={profile.mostLikedImage.media} width="200"/>
          <span className="imageText">{profile.mostLikedImage.likes}</span>
        </a>
        <a className="imageLink" href={`https://instagram.com/p/${profile.leastLikedImage.id}`} target="_blank">
          <img className="worst" src={profile.leastLikedImage.media} width="200"/>
          <span className="imageText">{profile.leastLikedImage.likes}</span>
        </a>
      </li>
    )
  }

})
