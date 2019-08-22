const withHashicorp = require('@hashicorp/next-hashicorp')
const defineStaticRoutes = require('@hashicorp/next-hashicorp/routes/static')
const routes = require('./routes')

module.exports = withHashicorp({
  mdx: { defaultLayout: true, layoutPath: 'layouts/mdx' }
})({
  exportTrailingSlash: true,
  async exportPathMap() {
    return defineStaticRoutes(routes)
  }
})
