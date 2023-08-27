import { cartModel } from '../../../DB/Models/cart.model.js'
import { productModel } from '../../../DB/Models/product.model.js'

// ====================== add to cart ======================
export const addToCart = async (req, res, next) => {
  const userId = req.authUser._id
  const { productId, quantity } = req.body
  const product = await productModel.findOne({
    _id: productId,
    stock: { $gte: quantity },
  })
  if (!product) {
    return next(
      new Error('invalid product please check the qunatity', { cause: 400 }),
    )
  }

  const userCart = await cartModel.findOne({ userId }).lean()
  // have a cart
  if (userCart) {
    let updateFlag = false
    let subTotal = 0
    for (const product of userCart.products) {
      // update quantity
      if (product.productId == productId) {
        product.quantity = quantity
        updateFlag = true
      }
    }
    // push product
    if (!updateFlag) {
      userCart.products.push({ productId, quantity })
    }

    // subtotal
    for (const product of userCart.products) {
      const productExists = await productModel.findById(
        product.productId,
        'priceAfterDiscount',
      )
      subTotal += product.quantity * productExists.priceAfterDiscount || 0
    }
    const cartUpdate = await cartModel.findOneAndUpdate(
      { userId },
      {
        subTotal,
        products: userCart.products,
      },
      {
        new: true,
      },
    )
    return res.status(200).json({ message: 'Updated done', cartUpdate })
  }

  //new cart
  const cartObject = {
    userId,
    products: [{ productId, quantity }],
    subTotal: quantity * product.priceAfterDiscount,
  }
  const cartdb = await cartModel.create(cartObject)
  res.status(201).json({ message: 'Done', cartdb })
}

// ====================== delete from cart ==========================
export const deleteFromCart = async (req, res, next) => {
  const userId = req.authUser._id
  const { productId } = req.body
  const product = await productModel.findOne({
    _id: productId,
  })

  if (!product) {
    return next(new Error('invalid product ', { cause: 400 }))
  }

  const userCart = await cartModel.findOne({
    userId,
    'products.productId': productId,
  })
  if (!userCart) {
    return next(new Error('invalid cart', { cause: 400 }))
  }
  userCart.products.forEach((ele) => {
    if (ele.productId == productId) {
      userCart.products.splice(userCart.products.indexOf(ele), 1)
    }
  })

  await userCart.save()
  res.status(200).json({ message: 'Done', userCart })
}




//  category/Electronics/tvs
//  category/Electorics/laptops