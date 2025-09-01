/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',              
        destination: 'http://localhost:3000/:path*',  
      },
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
