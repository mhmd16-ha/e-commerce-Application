
import { ErrorApp } from './../src/utils/ErrorApp.js';

export const validate=(schema)=>{
    return async(req,res,next)=>{
        let fillters={}
        if(req.file){
         fillters={image:req.file,...req.body,...req.params,...req.query}
        }
        else if(req.files) {
         fillters={...req.files,...req.body,...req.params,...req.query}
        }else{
         fillters={...req.body,...req.params,...req.query}
        }
        let {error}=schema.validate(fillters)
        if(!error){
            next()
        }else{
            let errMsg=error.details.map(err=>err.message)
            next(new ErrorApp(errMsg,401))
        }
    }
}