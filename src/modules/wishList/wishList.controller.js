import slugify from "slugify";
import { catchError } from '../../../middleware/catchError.js';
import { ErrorApp } from '../../utils/ErrorApp.js';
import { deleteOne } from "../../handler/handler.js";
import User from './../../../database/models/user.model.js';

const addWishList =catchError(async (req, res, next) => {
 

  let result=await User.findOneAndUpdate({_id:req.user._id,},{$addToSet:{wishList:req.params.id}},{new:true})
  res.json({ message: "Success" ,result});
});
const deleteWishList =catchError(async (req, res, next) => {
 
  let result=await User.findOneAndUpdate({_id:req.user._id,},{$pull:{wishList:req.params.id}},{new:true})
  res.json({ message: "Success" ,result});
});
const getAllWishList =catchError(async (req, res, next) => {
 
  let result=await User.findById({_id:req.user._id,}).populate("wishList")
  res.json({ message: "Success" ,result});
});

// const deleteReview =deleteOne(Review);
export { addWishList ,deleteWishList,getAllWishList};
