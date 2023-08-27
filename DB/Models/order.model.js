import { Schema, model } from 'mongoose'

const orderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    products: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
        },
        title: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        finalPrice: {
          type: Number,
          required: true,
        },
      },
    ],
    subTotal: {
      type: Number,
      required: true,
      default: 0,
    },
    couponId: {
      type: Schema.Types.ObjectId,
      ref: 'Coupon',
    },
    paidAmount: {
      type: Number,
      required: true,
      default: 0,
    },

    address: { type: String, required: true },
    phoneNumbers: [{ type: String, required: true }],

    orderStatus: {
      type: String,
      enum: [
        'pending',
        'confirmed',
        'placed',
        'on way',
        'delivered',
        'cancelled',
        'rejected',
      ],
    },

    paymentMethod: {
      type: String,
      enum: ['cash', 'card'],
      required: true,
    },

    cancelledBy: { type: Schema.Types.ObjectId, ref: 'User' },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'User' },

    reason: String,
  },
  {
    timestamps: true,
  },
)

export const orderModel = model('order', orderSchema)
