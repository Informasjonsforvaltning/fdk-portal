module.exports = {
  preset: 'ts-jest/presets/js-with-babel',
  setupFiles: ['<rootDir>/test/setup.js'],
  transform: {
    '^.+\\.svg$': 'jest-svg-transformer'
  },
  snapshotSerializers: ['enzyme-to-json/serializer'],
  moduleNameMapper: {
    '^.+\\.(css|less|scss)$': 'identity-obj-proxy'
  },
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!dist',
    '!coverage'
  ]
};
