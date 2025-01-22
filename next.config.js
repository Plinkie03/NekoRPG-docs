module.exports = {
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename],
    },
  },
  module: {
    rules: [
      {
        test: /\.json$/, // Example: Exclude large JSON files from being cached
        type: 'javascript/auto',
        use: [
          {
            loader: 'json-loader',
            options: {
              cache: false, // Disable cache for specific files
            },
          },
        ],
      },
    ],
  },
  images: {
    domains: ['cdn.discordapp.com'], // Allow Discord's CDN domain for images
  },
};
