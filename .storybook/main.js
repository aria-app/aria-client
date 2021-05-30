const path = require('path');

module.exports = {
  addons: [
    '@storybook/addon-controls',
    '@storybook/addon-actions',
    '@storybook/addon-backgrounds',
    '@storybook/addon-toolbars',
    '@storybook/addon-viewport',
  ],
  stories: ['../src/**/*.stories.@(tsx|mdx)'],
  typescript: {
    docgen: 'none',
    reactDocgenTypescriptOptions: {
      include: ['src/**/*.tsx'],
    },
  },
  webpackFinal: async (config) => {
    const emotionReactEleven = path.dirname(
      require.resolve('@emotion/react/package.json'),
    );
    const emotionStyledEleven = path.dirname(
      require.resolve('@emotion/styled/package.json'),
    );
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          '@emotion/core': emotionReactEleven,
          '@emotion/styled': emotionStyledEleven,
          'emotion-theming': emotionReactEleven,
        },
      },
    };
  },
};
