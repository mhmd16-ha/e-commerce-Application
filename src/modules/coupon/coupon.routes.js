import { Router } from "express";
import { addCoupon ,getAllCoupon,getCoupon,updateCoupon,deleteCoupon} from "./coupon.controller.js";
import { protectRoutes } from "../authentication/auth.controller.js";

const couponRouter=Router()
couponRouter.route('/').post(protectRoutes,addCoupon).get(getAllCoupon)
couponRouter.route('/:id').get(getCoupon).put(protectRoutes,updateCoupon).delete(deleteCoupon)


export default couponRouter