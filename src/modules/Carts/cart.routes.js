import { Router } from 'express'
const router = Router()
import * as cc from './cart.controller.js'
import { asyncHandler } from '../../utils/errorhandling.js'
import { isAuth } from '../../middlewares/auth.js'

router.post('/', isAuth(), asyncHandler(cc.addToCart))
router.delete('/', isAuth(), asyncHandler(cc.deleteFromCart))
export default router
