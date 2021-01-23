import { logger } from '../../src/lib/logger'

describe('Logger Spec', () => {
    test('should return a instance of a winston logger ', () => {
        expect(logger).toHaveProperty('level')
        expect(logger).toHaveProperty('format')
        expect(logger).toHaveProperty('defaultMeta')
        expect(logger).toHaveProperty('transports')
    })
})
