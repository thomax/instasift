/* eslint-disable no-console */
const app = require('./app')
const pkg = require('./package')

const server = app.listen(3000, function (error) {
  if (error) {
    throw error
  }
  const host = server.address().address
  const port = server.address().port
  console.log('%s listening at http://%s:%s', pkg.name, host, port)
});
