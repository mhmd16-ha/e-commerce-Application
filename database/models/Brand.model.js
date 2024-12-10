import mongoose, { Types } from "mongoose";

const schema=new mongoose.Schema({
name:{
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
createdBy:{
    type:Types.ObjectId,
    ref:'User'
},
logo:String
},{
    timestamps:true,
    versionKey:false
})
schema.post('init',function(doc){
    doc.logo="http://localhost:3000/uploads/brands/"+doc.logo
    })
const BrandModel=mongoose.model('Brand',schema)
export default BrandModel