const { pathsToModuleNameMapper } = require('ts-jest');
//const { compilerOptions } = require('./tsconfig.json');
const tsConfigPaths = {
    '@/*': ['src/*'],
    '@tests/*': ['tests/*'],
};

/** @type {import('@jest/types').Config.InitialOptions } */
module.exports = {
    preset: 'ts-jest/presets/js-with-ts',
    testEnvironment: 'node',
    transform: { '^.+\\.tsx?$': 'ts-jest' },
    testRegex: '(/__test__/.*|/tests/.*|(\\.|/)(test|spec))\\.[tj]sx?$',
    testPathIgnorePatterns: ['/build/', '/dist/', '/node_modules/', '/scripts/'],
    moduleFileExtensions: ['ts', 'js'],
    moduleNameMapper: pathsToModuleNameMapper(tsConfigPaths, { prefix: `${__dirname}/` }),

    coverageDirectory: './coverage',
    coverageReporters: ['text', 'json'],
    collectCoverageFrom: [
        'src/*.{ts,js}',
        'src/**/*.{ts,js}',
        '!**/.husky/**',
        '!**/dist/**',
        '!**/node_modules/**',
        '!**/scripts/**',
        '!**/tests/**',
        '!**/vendor/**',
    ],
};
