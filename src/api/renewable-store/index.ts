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
        const data = await fetchRenewableData(req.query)

        res.status(200).json(data)
    } catch (error) {
        next(error)
    }
}
