import CategoryModel from './../database/models/Category.model.js';
import { ErrorApp } from './../src/utils/ErrorApp.js';

export const foundedCategory=async(req,res,next)=>{
    let categoryIsFound=await CategoryModel.findOne({_id:req.body.category})
    if(categoryIsFound){
     next()
    }else{
      next(new ErrorApp('category not found',404))
    }
}