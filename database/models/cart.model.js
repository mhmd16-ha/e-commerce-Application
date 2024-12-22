
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
totalPrice:Number,
totalPriceAfterDiscount:Number,
Discount:Number,
},{
    timestamps:true,
    versionKey:false
})

const CartModel=mongoose.model('Cart',schema)
export default CartModel