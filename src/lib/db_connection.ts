import mongoose from 'mongoose'
import { logger } from './logger'

mongoose.connection.on('connected', function () {
    logger.info('Connected to database')
})

mongoose.connection.on('error', function (err) {
    logger.error('Mongoose default connection error has occurred')
    logger.error(err)
})

mongoose.connection.on('disconnected', function (err) {
    logger.error('Mongoose disconnected')
    logger.error(err)
})

mongoose.set('debug', process.env.NODE_ENV === 'dev')
mongoose.set('maxTimeMS', 10000)

export function createConnection(): void {
    let dbUri: string = process.env.MONGO_URL as string
    let options = {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    }
    if (process.env.NODE_ENV === 'test') {
        dbUri = global.__MONGO_URI__
        options = { ...options, ...{ dbName: global.__MONGO_DB_NAME__ } }
    }
    mongoose.connect(dbUri, options).catch((e) => {
        logger.error('connection to cosmos db fails', e)
        throw e
    })
}
