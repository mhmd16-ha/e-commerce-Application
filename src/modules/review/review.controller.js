import slugify from "slugify";
import { catchError } from '../../../middleware/catchError.js';
import { ErrorApp } from '../../utils/ErrorApp.js';
import { deleteOne } from "../../handler/handler.js";
import Review from './../../../database/models/Review.model.js';

const addReview =catchError(async (req, res, next) => {
  req.body.user=req.user._id
  let isReview=await Review.findOne({user:req.user._id,product:req.body.product})
  if(isReview) next(new ErrorApp('you already have review',409))
  let review = new Review(req.body);
  await review.save();
  res.json({ message: "Success", review });
});
const getAllReviews = async (req, res, next) => {
  let Reviews = await Review.find()
  res.json({ message: "Success", Reviews });
};
const getReview =catchError( async (req, res, next) => {
  let review = await Review.findById(req.params.id);
  review ||next(new ErrorApp('Review not found',404));
  !review ||res.json({ message: "Success", review });
});
const updateReview =catchError(  async (req, res, next) => {

  let review = await Review.findOneAndUpdate({_id:req.params.id,user:req.user._id},req.body,{new:true});
  review ||next(new ErrorApp('Review not found',404));
  !review ||res.json({ message: "Success", review });
});
const deleteReview =deleteOne(Review);
export { addReview ,getAllReviews,getReview,updateReview,deleteReview};
