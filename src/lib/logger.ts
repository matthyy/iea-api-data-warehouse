import winston from 'winston'

export const logger = winston.createLogger({
    level: process.env.NODE_ENV !== 'production' ? 'info' : 'warn',
    format: winston.format.json(),
    defaultMeta: { service: 'renewable-api-service' },
    transports: [
        new winston.transports.Console({
            format: winston.format.simple(),
        }),
    ],
})
