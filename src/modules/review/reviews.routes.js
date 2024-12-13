import { Router } from "express";
import { addReview, deleteReview, getAllReviews, getReview, updateReview } from "./review.controller.js";
import { protectRoutes } from "../authentication/auth.controller.js";

const ReviewRouter=Router()
ReviewRouter.route('/').post(protectRoutes,addReview).get(getAllReviews)
ReviewRouter.route('/:id').get(getReview).put(protectRoutes,updateReview).delete(deleteReview)


export default ReviewRouter