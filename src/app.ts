import express from 'express'
import health from './routes/health_router'
import coupon from './routes'
import { createConnection } from './lib/db_connection'
import { errorHandler } from './middleware/error_handler'
import helmet from 'helmet'

createConnection()
export const app = express()
app.use(express.json())
app.use(helmet())

app.use(health)
app.use(coupon)

app.use(errorHandler)
