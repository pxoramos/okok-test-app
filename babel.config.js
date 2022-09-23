module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.js', '.ios.js', '.android.js'],
        alias: {
          _components: './src/components',
          _context: './src/context',
          _navigations: './src/navigations',
          _screens: './src/screens',
          _services: './src/services',
          _store: './src/store',
          _utils: './src/utils',
        },
      },
    ],
  ],
};
