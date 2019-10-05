module.exports = {
  projects: [
    {
      displayName: 'native',
      preset: 'react-native',
      testMatch: ['<rootDir>/src/targets/native/**/*.test.js'],
    },
    {
      displayName: 'web',
      testMatch: ['<rootDir>/src/targets/web/**/*.test.js'],
    },
  ],
};
