module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!src/**/*.d.ts",
    "!src/index.tsx",
    "!src/reportWebVitals.ts",
    "!src/stories/*.{ts,tsx}",
  ],
  coverageReporters: ["text", "lcov", "json", "html"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
  moduleNameMapper: {
    "\\.(css|scss)$": "identity-obj-proxy",
    "@shared/(.*)": "<rootDir>/src/shared/$1",
    "@components/(.*)": "<rootDir>/src/components/$1",
    "@context/(.*)": "<rootDir>/src/context/$1",
  },
};
