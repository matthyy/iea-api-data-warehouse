import { RenewableAggregate, RenewableStore, RenewableStoreModel } from '../model/renewable-store'
import { FilterQuery } from 'mongoose'

export const fetchRenewableData = async ({
    country,
    from,
    to,
    year,
    sort,
}: {
    from?: string
    to?: string
    country?: string
    year?: number
    sort?: 'asc' | 'desc'
}): Promise<{
    aggregate: RenewableAggregate
    results: RenewableStore[]
}> => {
    const filter: FilterQuery<RenewableStore> = {}
    const match: { country?: string; year?: number } = {}
    if (country) {
        filter.country = country
        match.country = country
    }

    if (year) {
        filter.year = year
        match.year = year
    }

    const aggregate = []
    aggregate.push({ $match: match })

    if (from && to) {
        filter.year = {
            $gt: parseInt(from),
            $lt: parseInt(to),
        }
        aggregate.push({
            $match: {
                year: {
                    $gt: from ? parseInt(from) : 2000,
                    $lt: to ? parseInt(to) : 2021,
                },
            },
        })
    }

    aggregate.push({
        $group: { _id: country || 'all', totalVehicle: { $sum: '$nbVehicle' }, totalCharger: { $sum: '$nbCharger' } },
    })

    const [count, results] = await Promise.all([
        RenewableStoreModel.aggregate<RenewableAggregate>(aggregate),
        RenewableStoreModel.find(filter)
            .sort({ year: sort === 'asc' ? 1 : -1 })
            .lean()
            .exec(),
    ])

    return {
        aggregate: count[0],
        results,
    }
}
