import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:4200",
    env: {
      environment: "development",
    },
    fixturesFolder: "tests/e2e/fixtures",
    screenshotsFolder: "tests/e2e/screenshots",
    videosFolder: "tests/e2e/videos",
    supportFile: "tests/e2e/support/index.ts",
    // responseTimeout: 90000,
    // pageLoadTimeout: 90000,
    // viewportHeight: 740,
    // viewportWidth: 375,
    specPattern: "tests/e2e/specs/**/*.cy.js",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
