import { NextFunction, Request, Response } from 'express'
import { fetchRenewableData } from '../../services'

/**
 * req.params should be validate with validator schema
 */
export const getRenewableData = async (
    req: Request<
        undefined,
        undefined,
        undefined,
        { from: string; to: string; country?: string; year?: number; sort?: 'asc' | 'desc' }
    >,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const vehicles = await fetchRenewableData(req.query)

        res.status(200).json(vehicles)
    } catch (error) {
        next(error)
    }
}
