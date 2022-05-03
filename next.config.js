const withHashicorp = require('@hashicorp/platform-nextjs-plugin')

module.exports = withHashicorp({
  dato: { token: 'dc45ff8c8b27dd22a7c24aaaf8aa75' },
  nextOptimizedImages: true,
})({
  images: {
    domains: ['www.datocms-assets.com'],
    disableStaticImages: true,
  },
})
