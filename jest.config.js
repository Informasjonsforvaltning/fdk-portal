module.exports = {
  preset: 'ts-jest/presets/js-with-babel',
  setupFilesAfterEnv: ['<rootDir>/test/setup.js'],
  transform: {
    '^.+\\.svg$': 'jest-transformer-svg'
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
  ],
  transformIgnorePatterns: [
    '[/\\\\]node_modules[/\\\\](?!(react-markdown|vfile|vfile-message|markdown-table|unist-.*|unified|bail|is-plain-obj|trough|remark-.*|mdast-util-.*|escape-string-regexp|micromark.*|decode-named-character-reference|character-entities|property-information|hast-util-whitespace|space-separated-tokens|comma-separated-tokens|pretty-bytes|ccount|trim-lines)).+\\.(js|jsx|mjs|cjs|ts|tsx)$'
  ]
};
