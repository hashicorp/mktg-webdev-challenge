const withHashicorp = require('@hashicorp/nextjs-scripts')

module.exports = withHashicorp({
  mdx: { defaultLayout: true, layoutPath: 'layouts/mdx' }
})({
  exportTrailingSlash: true
})
