/* eslint-env node */

module.exports = {
  setupFilesAfterEnv: ['jest-extended'],
  rootDir: 'src',
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['/node_modules/', '/lib/', '/dist/']
};
