/* eslint-disable @typescript-eslint/no-var-requires */
const CracoAlias = require("craco-alias");

module.exports = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: "tsconfig",
        baseUrl: "./src",
        tsConfigPath: "./tsconfig.paths.json",
      },
    },
  ],
  jest: {
    configure: {
      collectCoverage: true,
      collectCoverageFrom: [
        "src/**/*.{js,jsx,ts,tsx}",
        "!src/**/*.types.ts",
        "!src/**/*.d.ts",
        "!src/**/index.{js,jsx,ts,tsx}",
        "!src/reportWebVitals.ts",
        "!src/stories/*.{ts,tsx}",
      ],
      moduleNameMapper: {
        "^axios$": "axios/dist/node/axios.cjs",
      },
    },
  },
};
