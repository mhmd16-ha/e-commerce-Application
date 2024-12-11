import User from "../database/models/user.model.js"
import { ErrorApp } from './../src/utils/ErrorApp.js';

export const checkEmail=async (req,res,next)=>{
let isExist=await User.findOne({email:req.body.email})
if(isExist) return next(new ErrorApp('email already exist',409))
    next()
}