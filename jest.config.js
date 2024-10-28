const { pathsToModuleNameMapper } = require('ts-jest'); // eslint-disable-line
const { compilerOptions } = require('./tsconfig.json'); // eslint-disable-line

const moduleMaps = pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>' });

module.exports = {
  moduleDirectories: ['node_modules', '<rootDir>/src'],
  modulePathIgnorePatterns: ['<rootDir>/src/app/'],
  transformIgnorePatterns: ['<rootDir>/node_modules/(?!lit-element|lit-html|lit|@lit/)'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  snapshotResolver: '<rootDir>/config/jest/jest.snapshot-resolver.js',
  setupFiles: ['jest-canvas-mock'],
  setupFilesAfterEnv: ['<rootDir>/src/helpers/enzyme_setup'],
  transform: {
    '^.+\\.(j|t)sx?$': ['babel-jest', { 'extends': './babel.config.js' }]
  },
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/tools/assetsTransformer.js',
    '\\.(scss|css|less)$': '<rootDir>/tools/assetsTransformer.js',
    '\\.svg\\?svgr$': '<rootDir>/tools/svgMock.js',
    '\\/reactions/.*\\.json\\?lottie$': '<rootDir>/tools/reactionMock.js',
    ...moduleMaps,
  },
  testEnvironment: 'jsdom',
};
