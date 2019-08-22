const next = require('next')
const express = require('express')
const defineDynamicRoutes = require('@hashicorp/next-hashicorp/routes/dynamic')
const rawRoutes = require('./routes')
const routes = defineDynamicRoutes(rawRoutes)

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handler = routes.getRequestHandler(app)

// TODO: this should be extracted into next-hashicorp's binary
app.prepare().then(() => {
  const server = express()
  // serve static files from '/assets'
  server.use('/static', express.static('static'))
  // implement next-routes
  server.use(handler)
  // fire up the server!
  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
