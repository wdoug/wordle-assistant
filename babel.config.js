// Used for Jest to support TypeScript. See: https://jestjs.io/docs/getting-started#via-babel
module.exports = {
    presets: [
      ['@babel/preset-env', {targets: {node: 'current'}}],
      '@babel/preset-typescript',
    ],
  };