import supertest from 'supertest'
import mongoose from 'mongoose'
import { app } from '../../../../../src/app'
import { RenewableAggregate, RenewableStore, RenewableStoreModel } from '../../../../../src/model/renewable-store'
import features from './features/index.json'

const request = supertest(app)

describe('API Renewable Store', () => {
    beforeAll(async () => {
        await RenewableStoreModel.insertMany(features)
    })

    afterAll(async () => {
        await RenewableStoreModel.deleteMany().exec()
        await mongoose.disconnect()
    })

    test('should return renewableData', async () => {
        const response = await request.get('/renewableData').expect(200)
        const snapshot = response.body as {
            aggregate: RenewableAggregate
            results: RenewableStore[]
        }
        snapshot.results = helperFormatSnapshot(snapshot.results)

        expect(snapshot).toMatchSnapshot()
    })
    test('should return renewableData with country queryParam set', async () => {
        const response = await request.get('/renewableData?country=australia').expect(200)
        const snapshot = response.body as {
            aggregate: RenewableAggregate
            results: RenewableStore[]
        }
        snapshot.results = helperFormatSnapshot(snapshot.results)

        expect(snapshot).toMatchSnapshot()
    })

    test('should return renewableData with country queryParam from and to set', async () => {
        const response = await request.get('/renewableData?from=2000&to=2019').expect(200)
        const snapshot = response.body as {
            aggregate: RenewableAggregate
            results: RenewableStore[]
        }
        snapshot.results = helperFormatSnapshot(snapshot.results)

        expect(snapshot).toMatchSnapshot()
    })

    test('should return renewableData with country queryParam from, to and country set', async () => {
        const response = await request.get('/renewableData?from=2000&to=2019&country=australia').expect(200)
        const snapshot = response.body as {
            aggregate: RenewableAggregate
            results: RenewableStore[]
        }
        snapshot.results = helperFormatSnapshot(snapshot.results)

        expect(snapshot).toMatchSnapshot()
    })

    test('should return renewableData with country queryParam sort set', async () => {
        const response = await request.get('/renewableData?sort=asc').expect(200)
        const snapshot = response.body as {
            aggregate: RenewableAggregate
            results: RenewableStore[]
        }
        snapshot.results = helperFormatSnapshot(snapshot.results)

        expect(snapshot).toMatchSnapshot()
    })

    test('should return renewableData with country queryParam year set', async () => {
        const response = await request.get('/renewableData?year=2019').expect(200)
        const snapshot = response.body as {
            aggregate: RenewableAggregate
            results: RenewableStore[]
        }
        snapshot.results = helperFormatSnapshot(snapshot.results)

        expect(snapshot).toMatchSnapshot()
    })
})

const helperFormatSnapshot = (list: RenewableStore[]): RenewableStore[] => {
    return list.map((result) => ({
        year: result.year,
        nbVehicle: result.nbVehicle,
        nbCharger: result.nbCharger,
        country: result.country,
    }))
}
