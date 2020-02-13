module.exports = {
  testMatch: ['<rootDir>/test/**/(test).js?(x)', '**/?(*.)(test).js?(x)'],
  testPathIgnorePatterns: [
    '/node_modules/',
    '<rootDir>/test/jestsetup.js',
    '<rootDir>/test/fixtures/',
    '/target/'
  ],
  setupFiles: [
    '@babel/polyfill',
    'raf/polyfill',
    '<rootDir>/test/jestsetup.js'
  ],
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
    '^.+\\.svg$': 'jest-svg-transformer'
  },
  snapshotSerializers: ['enzyme-to-json/serializer'],
  moduleNameMapper: {
    '^.+\\.(css|less|scss)$': 'identity-obj-proxy'
  },
  collectCoverage: false,
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/redux/store/**/*.{js,jsx}',
    '!src/redux/middleware/**/*.{js,jsx}'
  ],
  coverageDirectory: 'coverage'
};
