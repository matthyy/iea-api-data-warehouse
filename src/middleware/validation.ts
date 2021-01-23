import { NextFunction, Request, Response } from 'express'
import { isString } from '../lib/type_guard'
import { ValidationError } from './error_handler'

export const checkValidQuery = (
    req: Request<undefined, undefined, undefined, Record<string, unknown>>,
    res: Response,
    next: NextFunction
): void => {
    const { country, from, to, sort, year } = req.query

    if ([country, from, to, sort, year].every(isOptionalString)) {
        req.query = { country, from, to, sort, year: isString(year) ? parseInt(year, 10) : undefined }
        next()
    } else {
        next(new ValidationError('BadRequest', 400))
    }
}

const isOptionalString = (query: unknown): boolean => {
    return isString(query) || query === undefined
}
