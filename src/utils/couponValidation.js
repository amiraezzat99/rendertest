import { couponModel } from '../../DB/Models/coupon.model.js'
import moment from 'moment-timezone'

export const couponValidationFunction = async ({
  couponCode,
  userId,
  next,
} = {}) => {
  // couponCode check
  const coupon = await couponModel.findOne({ couponCode })
  if (!coupon) {
    return next(new Error('please enter valid couponCode', { cause: 400 }))
  }

  // expiration
  if (
    coupon.couponStatus == 'Expired' ||
    moment(new Date(coupon.toDate)).isBefore(moment().tz('Africa/Cairo'))
  ) {
    return next(new Error('this coupon is expired', { cause: 400 }))
  }

  for (const user of coupon.couponAssginedToUsers) {
    // coupon not assgined to this user
    // console.log(user.userId.toString())
    // console.log(userId.toString())
    // console.log(user.userId.toString() !== userId.toString());
    if (user.userId.toString() !== userId.toString()) {
      return next(
        new Error('this coupon isnot assgined to you', { cause: 400 }),
      )
    } // TODO: remove return from looping
    // user exceed maxUsage for this coupon
    if (user.maxUsage <= user.usageCount) {
      return next(
        new Error('you exceed the maxUsage for this coupon', { cause: 400 }),
      ) // TODO: remove return from looping
    }
  }

  return true
}
