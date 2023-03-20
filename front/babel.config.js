module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: [
          '.ios.js',
          '.android.js',
          '.jsx',
          '.js',
          '.json',
          '.ts',
          '.tsx',
        ],
        alias: {
          '@': './src',
          '@main': './src/main',
          '@assets': './assets',
          '@store': './src/store',
          '@common': './src/main/common',
          '@components': './src/main/common/components',
          '@feature': './src/main/feature',
          '@navigation': './src/main/navigation',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
