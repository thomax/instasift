import express from 'express'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import Dashboard from './src/components/Dashboard'
const app = express()

// http://expressjs.com/guide/behind-proxies.html
app.set('trust proxy', true)

app.disable('x-powered-by')

app.use('/sup', (req, res, next) => {
  res.setHeader('content-type', 'text/plain')
  res.status(200).end('sup?')
})

app.use('/', (req, res, next) => {
  res.status(200).type('html').send('<!doctype html>' + ReactDOMServer.renderToStaticMarkup(React.createElement(Dashboard)))
})

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handlers
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err)
  }
  res.status(err.status || 500)
  return res.send(err.message).end()
})

//export default app
module.exports = app
