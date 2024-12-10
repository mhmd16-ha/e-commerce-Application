import mongoose, { Types } from "mongoose";

const schema=new mongoose.Schema({

    code:{
    type:String,
    required:true,
    unique:true
},
expires:Date,
disCount:Number

},{
    timestamps:true,
    versionKey:false
})
const Coupon=mongoose.model('Coupon',schema)
export default Coupon