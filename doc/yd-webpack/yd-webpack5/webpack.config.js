module.exports = {
  cache: {
    type: 'filesystem',
  },
  optimization: {
    chunkIds: 'deterministic',
    moduleIds: 'deterministic',
    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: 'all',
          name: 'commons',
        },
      },
    },
    splitChunks: {
      minSize: {
        javascript: 0,
        style: 0,
      },
      maxSize: {
        javascript: 1,
        style: 3000,
      },
    },
  },
};
