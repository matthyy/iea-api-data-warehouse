import { NextFunction, Request, Response } from 'express'
import { logger } from '../lib/logger'

export class ValidationError extends Error {
    readonly status: number

    constructor(message: string, status: number) {
        super(message)
        this.status = status
    }
}

export const errorHandler = (error: unknown, req: Request, res: Response, next: NextFunction): void => {
    try {
        if (error instanceof ValidationError) {
            res.status(error.status).json({ message: error.message })
        } else {
            logger.error(error)
            res.status(500).json()
        }
    } catch (e) {
        next(e)
    }
}
