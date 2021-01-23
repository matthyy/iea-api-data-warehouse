import supertest from 'supertest'
import mongoose from 'mongoose'

import { app } from '../../../../../src/app'

const request = supertest(app)

describe('API Health', () => {
    afterAll(async () => {
        await mongoose.disconnect()
    })

    test('GET /health', async () => {
        await request.get('/health').expect(200)
    })
})
