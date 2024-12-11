import mongoose, { Types } from "mongoose";
import bcrypt from 'bcrypt'
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
},
passwordChangedAt:Date
},{
    timestamps:true,
    versionKey:false
})

schema.pre('save',function(){
    this.password=bcrypt.hashSync(this.password,8)
})
schema.pre('findOneAndUpdate',function(){
 if(this._update.password)  this._update.password=bcrypt.hashSync(this._update.password,8)
})
const User=mongoose.model('User',schema)
export default User