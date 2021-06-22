module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFiles: [
      './node_modules/react-native-gesture-handler/jestSetup.js',
      './node_modules/react-native/jest/setup.js'
    ],
  transformIgnorePatterns: [
    'node_modules/(?!(native-base-shoutem-theme|react-native|@react-native-community|react-native-easy-grid|react-native-drawer|react-native-vector-icons|@codler|react-native-iphone-x-helper|react-native-gesture-handler|@react-navigation|react-native-camera|@react-native-firebase|invariant)/)',
  ],
  automock: true,
  clearMocks: true,
};
