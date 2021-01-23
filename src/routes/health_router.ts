import { Router } from 'express'
import { getHealth } from '../api/health'

const path = '/health'
const router = Router()

router.get(`${path}`, getHealth)
export default router
