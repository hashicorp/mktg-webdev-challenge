const withHashicorp = require('@hashicorp/nextjs-scripts')

module.exports = withHashicorp({
  mdx: { defaultLayout: true },
  transpileModules: ['@hashicorp/react-.*'],
})({})
