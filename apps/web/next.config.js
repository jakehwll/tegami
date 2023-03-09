module.exports = {
  reactStrictMode: true,
  transpilePackages: ["ui"],
  async redirects() {
    return [
      {
        source: '/',
        destination: '/unread',
        permanent: true,
      },
    ]
  },
};
