import { Router } from 'express'
import { getRenewableData } from '../api/renewable-store'
import { checkValidQuery } from '../middleware/validation'

const router = Router({ mergeParams: true })

router.get('/renewableData', checkValidQuery, getRenewableData)
export default router
