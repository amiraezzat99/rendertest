import { connectionDB } from '../../DB/connection.js'
import { globalResponse } from './errorhandling.js'
import * as routers from '../modules/index.routes.js'
import { changeCouponStatusCron } from './crons.js'
import { gracefulShutdown } from 'node-schedule'
import cors from 'cors'

export const initiateApp = (app, express) => {
  const port = process.env.PORT || 5000
  app.get('/', (req, res) => res.send('Hello World!'))

  app.use(express.json())
  connectionDB()
  app.use(cors())
  app.use('/category', routers.categoryRouter)
  app.use('/subCategory', routers.subCategoryRouter)
  app.use('/brand', routers.brandRouter)
  app.use('/product', routers.productRouter)
  app.use('/coupon', routers.couponRouter)
  app.use('/auth', routers.auhtRouter)
  app.use('/cart', routers.cartRouter)

  app.all('*', (req, res, next) =>
    res.status(404).json({ message: '404 Not Found URL' }),
  )

  changeCouponStatusCron()
  gracefulShutdown()

  app.use(globalResponse)

  app.listen(port, () => console.log(`Example app listening on port ${port} tessst!`))
}
