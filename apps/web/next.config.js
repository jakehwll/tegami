module.exports = {
  output: 'standalone',
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
  // Hotfix for now, stupid `prisma` error.
  // https://stackoverflow.com/questions/68869141/how-to-disable-typescript-for-failing-my-builds-with-nextjs
  typescript: {
    ignoreBuildErrors: true,
  }
};
