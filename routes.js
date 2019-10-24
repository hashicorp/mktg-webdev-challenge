const defineDynamicRoutes = require('@hashicorp/nextjs-scripts/routes/dynamic')

const routes = []

module.exports = routes
module.exports.Link = defineDynamicRoutes(routes).Link
