import { app } from './app'
import { logger } from './lib/logger'

const port = process.env.PORT || 3000

app.listen(port, () => {
    logger.info(`API Listening on port ${port}`)
})
