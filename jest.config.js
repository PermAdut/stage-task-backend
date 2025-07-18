// jest.config.js
/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest', // This preset handles TypeScript compilation
  testEnvironment: 'node', // Or 'jsdom' for browser environments
  // Other Jest configurations can go here, e.g., testMatch, coverage settings
};
