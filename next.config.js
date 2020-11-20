const withHashicorp = require('@hashicorp/nextjs-scripts')

module.exports = withHashicorp({
  defaultLayout: true,
  transpileModules: ['@hashicorp/react-.*'],
  dato: {
    token: 'dc45ff8c8b27dd22a7c24aaaf8aa75',
  },
})({})
