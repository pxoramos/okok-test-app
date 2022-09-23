module.exports = {
  root: true,
  extends: '@react-native-community',
  plugins: ['import'],
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
        alias: {
          _components: './src/components',
          _context: './src/context',
          _navigations: './src/navigations'
          _screens: './src/screens',
          _services: './src/services',
          _store: './src/store',
          _utils: './src/utils',
        },
      },
    },
  },
};
