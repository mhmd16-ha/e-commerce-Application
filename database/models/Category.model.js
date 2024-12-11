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
    required:true,
    unique:[true,"name is required"],

},
image:String,
createdBy:{
    type:Types.ObjectId,
    ref:'User'
}

},{
    timestamps:true,
    versionKey:false
})
schema.post('init',function(doc){
doc.image=process.env.BASE_ERL+"categories/"+doc.image
})
const CategoryModel=mongoose.model('Category',schema)
export default CategoryModel