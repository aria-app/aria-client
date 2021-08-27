module.exports = {
  env: {
    apiBaseUrl: '/api',
  },
  async rewrites() {
    return process.env.NODE_ENV === 'development'
      ? [
          {
            source: '/api/:path*',
            destination: 'http://localhost:5000/:path*',
          },
        ]
      : [
          {
            source: '/api/:path*',
            destination: 'https://aria-app-api.herokuapp.com/:path*',
          },
        ];
  },
};
