import mongoose, { Types } from "mongoose";

const schema=new mongoose.Schema({
name:String,
email:String,
password:String,
isBloacked:{
type:Boolean,
default:false
},
role:{
    type:String,
    enum:['admin','user'],
    default:'user'
}

},{
    timestamps:true,
    versionKey:false
})
const User=mongoose.model('User',schema)
export default User