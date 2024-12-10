import { ErrorApp } from "../src/utils/ErrorApp.js"

export function catchError(fn){
    return (req,res,next)=>{
      fn(req,res,next).catch(err=>{
        next(new ErrorApp(err,401))
      })
    }
   }