import mongoose, { Types } from "mongoose";

const schema=new mongoose.Schema({
comment:String,
user:{
    type:Types.ObjectId,
    ref:'User',
    required:true
},
rate:{
    type:Number,
    min:0,
    max:5,
    required:true
},
product:{
    type:Types.ObjectId,
    ref:'Product',
    required:true
},

},{
    timestamps:true,
    versionKey:false
})
schema.pre(/^find/,function(){
    this.populate("user","name");
})
const Review=mongoose.model('Review',schema)
export default Review