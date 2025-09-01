/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      { source: '/api/:path*', destination: 'https://train-schedule-app-yxl5.onrender.com/:path*' },
    ];
  },
  async headers() {
    return [
      { source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
        ],
      },
    ];
  },
};
module.exports = nextConfig;
