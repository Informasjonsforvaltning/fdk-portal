exports.config = {
  output: './test/feature/output',
  helpers: {
    Puppeteer: {
      url: 'https://fellesdatakatalog.brreg.no/',
      show: true
    }
  },
  include: {
    I: './test/feature/step_file.js',
    conceptsPage: './test/feature/pages/concept.page.js',
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
      './test/feature/step_definitions/informationmodels.steps.js'
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
