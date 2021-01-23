'use strict'

module.exports = {
    ...require('./jest.config'),
    coverageReporters: ['json', 'lcov'],
    reporters: [
        'default',
        ['jest-junit', { outputDirectory: './', outputName: 'test-results.xml' }],
    ],
}
