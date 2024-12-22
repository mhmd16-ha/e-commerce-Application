 

import Coupon from './../../../database/models/coupon.model.js';
import { catchError } from './../../../middleware/catchError.js';
import { ErrorApp } from './../../utils/ErrorApp.js';
import { deleteOne } from './../../handler/handler.js';
import QRCode from 'qrcode'

const addCoupon =catchError(async (req, res, next) => {
  let coupon = new Coupon(req.body);
  await coupon.save();
  res.json({ message: "Success", coupon });
});
const getAllCoupon = async (req, res, next) => {
  let coupon = await Coupon.find()
  res.json({ message: "Success", coupon });
};
const getCoupon =catchError( async (req, res, next) => {
  let coupon = await Coupon.findById(req.params.id);
  coupon ||next(new ErrorApp('coupon not found',404));
  let qrCode=await QRCode.toDataURL(coupon.code)
  !coupon ||res.json({ message: "Success", coupon ,url:qrCode});
});
const updateCoupon =catchError(  async (req, res, next) => {

  let coupon = await Coupon.findOneAndUpdate({_id:req.params.id,},req.body,{new:true});
  coupon ||next(new ErrorApp('coupon not found',404));
  !coupon ||res.json({ message: "Success", coupon });
});
const deleteCoupon =deleteOne(Coupon);
export { addCoupon ,getAllCoupon,getCoupon,updateCoupon,deleteCoupon};
