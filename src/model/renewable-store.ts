import mongoose, { Schema } from 'mongoose'

export type RenewableStore = {
    country: string
    year: number
    nbVehicle: number
    nbCharger: number
}

export type RenewableAggregate = {
    _id: string
    totalVehicle: number
    totalCharger: number
}

export type RenewableStoreDoc = RenewableStore & mongoose.Document<mongoose.Types.ObjectId>

export const RenewableStoreSchema = new mongoose.Schema<RenewableStoreDoc>({
    country: { type: Schema.Types.String, required: true },
    year: { type: Schema.Types.Number, required: true },
    nbVehicle: { type: Schema.Types.Number, required: true },
    nbCharger: { type: Schema.Types.Number, required: true },
})

RenewableStoreSchema.index({ country: 1, year: 1 })

export const RenewableStoreModel = mongoose.model<RenewableStoreDoc>('RenewableStore', RenewableStoreSchema)
