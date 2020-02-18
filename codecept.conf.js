exports.config = {
  output: './test/feature/output',
  helpers: {
    Puppeteer: {
      url: 'https://fellesdatakatalog.brreg.no/',
      show: true
    }
  },
  include: {
    I: './test/feature/step_file.js'
  },
  mocha: {},
  bootstrap: null,
  teardown: null,
  hooks: [],
  gherkin: {
    features: './features/*.feature',
    steps: ['./test/feature/step_definitions/steps.js']
  },
  plugins: {
    screenshotOnFail: {
      enabled: true
    },
    retryFailedStep: {
      enabled: true
    }
  },
  tests: './test/feature/*_test.js',
  name: 'fdk-portal'
}