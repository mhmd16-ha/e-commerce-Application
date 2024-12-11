import bcrypt from 'bcrypt'
import { catchError } from './../../../middleware/catchError.js';
import User from './../../../database/models/user.model.js';
import  jwt  from 'jsonwebtoken';
import { ErrorApp } from './../../utils/ErrorApp.js';
const signUp=catchError(async(req,res,next)=>{
let user=new User(req.body)
await user.save()
let token=jwt.sign({UserId:user._id,role:user.role},"mhmd")
res.json({message:"success",token})
})
const signIn=catchError(async(req,res,next)=>{
let user=await User.findOne({email:req.body.email})
if(user&&bcrypt.compareSync(req.body.password,user.password)){
    let token=jwt.sign({UserId:user._id,role:user.role},process.env.JWT_KEY)
    res.json({message:"success",token})
}
next(new ErrorApp('email or password is error',401))
})

const changePassword=catchError(async(req,res,next)=>{
let user=await User.findOne({email:req.body.email})
if(user&&bcrypt.compareSync(req.body.oldpassword,user.password)){
let user=await User.findOneAndUpdate({email:req.body.email},{password:req.body.newpassword,passwordChangedAt:Date.now()})
    let token=jwt.sign({UserId:user._id,role:user.role},process.env.JWT_KEY)
    res.json({message:"success",token})
}
next(new ErrorApp('email or password is error',401))
})
const protectRoutes=catchError(async(req,res,next)=>{
let {token}=req.headers;
let userPayload=null;
if(!token) return next(new ErrorApp('token not provided',401))
jwt.verify(token,process.env.JWT_KEY,(err,payload)=>{
    if(err) next(new ErrorApp(err,401))
    userPayload=payload
})
let user=await User.findById(userPayload.UserId)
if(!user) return next(new ErrorApp('user not found',404))
    if(user.passwordChangedAt){
        let time=parseInt(user.passwordChangedAt.getTime()/1000)
        if(time>userPayload.iat) return next(new ErrorApp('invaild token ... login again',401))
    }
req.user=user
next()

})
const allowedTo=(...roles)=>{
return catchError(async(req,res,next)=>{
if(roles.includes(req.user.role)){
    return next()
}
return next (new ErrorApp('you are not authorize to acess this endpoint',401))
}
)}



export{
    signIn,signUp,changePassword,protectRoutes,allowedTo
}