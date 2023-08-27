import { Router } from 'express'
const router = Router()

import * as oc from './order.controller.js'
import { isAuth } from '../../middlewares/auth.js'
import { asyncHandler } from '../../utils/errorhandling.js'

router.post('/', isAuth(), asyncHandler(oc.createOrder))

router.post('/cartToOrder', isAuth(), asyncHandler(oc.fromCartToOrde))

export default router
