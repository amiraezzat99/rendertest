import { Router } from 'express'
const router = Router()
import * as bc from './conpon.controller.js'
import { asyncHandler } from '../../utils/errorhandling.js'
import { multerCloudFunction } from '../../services/multerCloud.js'
import { allowedExtensions } from '../../utils/allowedExtensions.js'
import { validationCoreFunction } from '../../middlewares/validation.js'
import { addCouponSchema } from './coupon.validationSchema.js'
import { isAuth } from '../../middlewares/auth.js'


router.post(
  '/',
  isAuth(),
  validationCoreFunction(addCouponSchema),
  asyncHandler(bc.addCoupon),
)
export default router
