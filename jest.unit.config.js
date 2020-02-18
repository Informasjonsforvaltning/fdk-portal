module.exports = {
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest'
  },
  testRegex: '/src/components/box-regular/.*\\.test.(js|jsx)$',
  moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
  setupFiles: ['./test/utils/setupJest.js'],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{js,jsx}']
};

// /*/.*\\.test.(js|jsx)$',
