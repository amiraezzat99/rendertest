import { scheduleJob } from 'node-schedule'
import { couponModel } from '../../DB/Models/coupon.model.js'
import moment from 'moment-timezone'

//====================  change couponStatus ================
export const changeCouponStatusCron = () => {
  scheduleJob('* * * * * *', async function () {
    const validCoupons = await couponModel.find({ couponStatus: 'Valid' })
    for (const coupon of validCoupons) {
      if (moment(coupon.toDate).isBefore(moment().tz('Africa/Cairo'))) {
        coupon.couponStatus = 'Expired'
      }
      await coupon.save()
    }
    console.log(`Cron of  changeCouponStatusCron() is running ............`)
  })

}

