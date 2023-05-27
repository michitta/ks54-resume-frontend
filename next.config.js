/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'cdn.vaultcommunity.net',
            port: '',
            pathname: '/hackaton/*',
          },
        ],
      },
}

module.exports = nextConfig
