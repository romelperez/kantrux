/* eslint-env node */

module.exports = {
  setupTestFrameworkScriptFile: 'jest-extended',
  clearMocks: true,
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['/node_modules/', '/lib/']
};
