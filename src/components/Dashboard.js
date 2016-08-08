import React from 'react';
import DOMContentLoadedFix from 'react-domcontentloaded'
import allProfiles from '../../data/allProfiles'
import InstagramProfile from './InstagramProfile'

export default React.createClass({
  displayName: 'Dashboard',

  render() {
    return (
      <html>
        <head>
          <DOMContentLoadedFix/>
          <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
          <title>Peersway Dashboard</title>
          <link rel="stylesheet" href="/main.css"/>
          <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1, maximum-scale=1" />
        </head>
        <body>
          <div className="header">
            <img src="http://peersway.com/wp-content/uploads/2016/02/peerswaylogo-retina-big.png" />
            <span>[dashboard]</span>
          </div>
          <ul className="profile-list">
            {
              allProfiles.map(profile => {
                return (<InstagramProfile profile={profile} key={profile.username}/>)
              })
            }
          </ul>
        </body>
      </html>
    )
  }
})
