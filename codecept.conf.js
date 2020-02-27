exports.config = {
  output: './test/feature/output',
  helpers: {
    Puppeteer: {
      url: 'http://localhost:3001/',
      show: false
    }
  },
  include: {
    I: './test/feature/step_file.js',
    conceptPage: './test/feature/concept/concept.page.js',
    informationModelsPage: './test/feature/pages/informationmodels.page.js'
  },
  mocha: {},
  bootstrap: null,
  teardown: null,
  hooks: [],
  gherkin: {
    features: './features/*.feature',
    steps: [
      './test/feature/step_definitions/steps.js',
      './test/feature/step_definitions/informationmodels.steps.js',
      './test/feature/concept/concept.steps.js'
    ]
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
};
