import mongoose, { Types } from "mongoose";

const schema=new mongoose.Schema({
title:{
    type:String,
    unique:[true,"name is required"],
    trim:true,
    required:true,
    minLength:[2,'too short category name']
},
slug:{
    type:String,
    lowercase:true,
    required:true
},
description:{
    type:String,
    required:true,
    minLength:30,
    maxLength:2000,
},
imageCover:String,
images:[String],
price:{
    type:Number,
    required:true,
    min:0,
},
priceAfterDiscount:{
    type:Number,
    required:true,
    min:0,
},
sold:Number,
stock:{
    type:Number,
    min:0
},
category:{
    type:Types.ObjectId,
    ref:'Category'
},
subCategory:{
    type:Types.ObjectId,
    ref:'SubCategory'
},
brand:{
    type:Types.ObjectId,
    ref:'Brands'
},
rateAvg:{
    type:Number,
    min:0,
    max:5
},
rateCount:Number,
createdBy:{
    type:Types.ObjectId,
    ref:'User'
}
},{
    timestamps:true,
    versionKey:false
})
schema.post('init',function(doc){
   if(doc.imageCover) doc.imageCover=process.env.BASE_ERL+"products/"+doc.imageCover
   if(doc.images) doc.images=doc.images.map(img=>process.env.BASE_ERL+"products/"+img)
    })
const ProductModel=mongoose.model('Product',schema)
export default ProductModel