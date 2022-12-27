/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Recommended for the `pages` directory, default in `app`.
  swcMinify: true,
  experimental: {
    // Required:
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'strapi-production-f578.up.railway.app',
        pathname: '/uploads/**',
      },
    ],
  },
};

module.exports = nextConfig;
