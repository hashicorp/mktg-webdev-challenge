const defineDynamicRoutes = require('@hashicorp/next-hashicorp/routes/dynamic')

const routes = []

module.exports = routes
module.exports.Link = defineDynamicRoutes(routes).Link
