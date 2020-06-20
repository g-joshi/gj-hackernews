module.exports = {
  roots: ['<rootDir>'],
  setupFiles: ['<rootDir>/config/jest-config/jest.setup.js'],
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': '<rootDir>/config/jest-config/style-mock.js',
    '^scroll-to$': '<rootDir>/config/jest-config/__mock__/react-scroll-to-component',
  },
  testRegex: '_tests_/.*(test)\\.js$',
  moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
  verbose: true,
  coverageDirectory: '<rootDir>/coverage/',
  transformIgnorePatterns: ['node_modules/'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/packages/react-apps/**/src/components/*{organisms,atoms,molecules}/**/!(*index|*.story).{js,jsx}',
    '<rootDir>/packages/shared/scripts/utils/src/*.{js,jsx}',
    '!**/node_modules/**',
    '!**/vendor/**',
  ],
  setupFilesAfterEnv: ['<rootDir>/config/jest-config/__mock__/globalDefinitions.js'],
};
