const tsPreset = require('ts-jest/jest-preset')
const mongoPreset = require('@shelf/jest-mongodb/jest-preset')

module.exports = {
    preset: 'ts-jest',
    ...tsPreset,
    ...mongoPreset,
    roots: ['tests'],
    coveragePathIgnorePatterns: ['/node_modules/']
};