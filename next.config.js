const withHashicorp = require('@hashicorp/nextjs-scripts')
const defineStaticRoutes = require('@hashicorp/nextjs-scripts/routes/static')
const routes = require('./routes')

module.exports = withHashicorp({
  mdx: { defaultLayout: true, layoutPath: 'layouts/mdx' }
})({
  exportTrailingSlash: true,
  async exportPathMap() {
    return defineStaticRoutes(routes)
  }
})
