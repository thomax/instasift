import React from 'react';
import DOMContentLoadedFix from 'react-domcontentloaded'

export default React.createClass({
  displayName: 'Dashboard',

  render() {
    return (
      <html>
        <head>
          <DOMContentLoadedFix/>
          <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
          <title>Peersway Dashboard</title>
          <link rel="stylesheet" href="/stylesheets/main.css"/>
          <link rel="stylesheet" href="/stylesheets/local.css"/>
          <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1, maximum-scale=1" />
        </head>
        <body>
          <h1>tzagga</h1>
          <div id="boxy-mcboxface">
            blipp
          </div>
        </body>
      </html>
    )
  }
})
