/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  displayName: 'paystack-node-sdk',
  preset: 'ts-jest',
  testEnvironment: 'node',
  clearMocks: true,
  detectLeaks: true,
  detectOpenHandles: true,
  randomize: true,
  resetMocks: true,
};
