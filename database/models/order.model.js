
import mongoose, { Types } from "mongoose";

const schema=new mongoose.Schema({

user:{
    type:Types.ObjectId,
    ref:"user"
},
cartItem:[{
    product:{
        type:Types.ObjectId,
        ref:'Product'
    },
    quntity:{
        type:Number,
        default:1
    },
    price:{
        type:Number
    }
}],
totalOrderPrice:Number,
totalPriceAfterDiscount:Number,
Discount:Number,
paymentMethod:{
    type:String,
    enums:["cache","credit"],
    default:"cache"
},
isPaid:Boolean,
paidAt:Date,
shippingAdress:String,
isDeleviried:Boolean
},{
    timestamps:true,
    versionKey:false
})

const OrderModel=mongoose.model('Order',schema)
export default OrderModel