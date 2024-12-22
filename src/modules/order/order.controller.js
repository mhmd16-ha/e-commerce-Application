import { catchError } from "../../../middleware/catchError.js";
import { ErrorApp } from "../../utils/ErrorApp.js";
import CartModel from "../../../database/models/cart.model.js";
import ProductModel from "../../../database/models/Product.model.js";
import OrderModel from './../../../database/models/order.model.js';


const addOrder = catchError(async (req, res, next) => {
 let cart=await CartModel.findById(req.params.id)
 let totalOrderPrice=cart.totalPriceAfterDiscount ?cart.totalPriceAfterDiscount : cart.totalPrice
 let order=new OrderModel({
  user:req.user._id,
  cartItem:cart.cartItem,
  totalOrderPrice,
  shippingAdress:req.body.shippingAdress
 })
 if(order){
  let option=cart.cartItem.map((item)=>({
    updateOne:{
      filter:{_id:item.product},
      update:{$inc:{quantity:-item.quantity,sold:item.quntity}},
    }
 
  }))

  await ProductModel.bulkWrite(option)
await order.save()

 }else{
  next(new ErrorApp("error occur",409))
 }
 await CartModel.findByIdAndDelete(req.params.id)
 res.json({message:"success",order})
});

const getOrder=catchError(async(req,res,next)=>{
  let order=await OrderModel.findOne({user:req.user._id})
  res.json({message:"success",order})
})

export { addOrder,getOrder};
