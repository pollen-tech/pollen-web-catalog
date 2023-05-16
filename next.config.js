/** @type {import('next').NextConfig} */
const nextConfig = {
  modularizeImports: {
    lodash: {
      transform: 'lodash/{{member}}',
      preventFullImport: true,
    },
  },
}

module.exports = nextConfig
