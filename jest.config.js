/* eslint-env node */

module.exports = {
  setupTestFrameworkScriptFile: 'jest-extended',
  clearMocks: true,
  rootDir: 'src',
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['/node_modules/', '/dist/']
};
