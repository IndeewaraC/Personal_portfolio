const { defineConfig } = require('cypress');
require('dotenv').config();

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',

  reporterOptions: {
    charts: true,
    reportPageTitle: 'Muditha Lakmali – Portfolio Test Report',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
    reportDir: 'cypress/reports',
    reportFilename: '[status]_[datetime]-report',
    timestamp: 'yyyy-mm-dd_HH-MM-ss',
  },

  e2e: {
    baseUrl: 'http://localhost:5173',
    specPattern: 'cypress/e2e/**/*.cy.js',
    screenshotsFolder: 'cypress/screenshots',
    videosFolder: 'cypress/videos',
    video: true,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 8000,

    env: {
      CONTENTFUL_SPACE_ID: process.env.VITE_CONTENTFUL_SPACE_ID,
      CONTENTFUL_ACCESS_TOKEN: process.env.VITE_CONTENTFUL_ACCESS_TOKEN,
    },

    setupNodeEvents(on, config) {
      // Wrap `on` so the reporter's before:run cleanup never crashes on
      // Windows EPERM (e.g. a previous report HTML is open in the browser).
      const safeOn = (event, handler) => {
        if (event === 'before:run') {
          on(event, async (...args) => {
            try {
              await handler(...args);
            } catch (e) {
              if (e.code !== 'EPERM') throw e;
              // Locked file on Windows – skip cleanup, continue with report gen
            }
          });
        } else {
          on(event, handler);
        }
      };
      require('cypress-mochawesome-reporter/plugin')(safeOn);
      return config;
    },
  },
});
