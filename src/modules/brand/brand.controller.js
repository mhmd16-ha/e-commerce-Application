import slugify from "slugify";
import BrandModel from './../../../database/models/Brand.model.js';
import { catchError } from './../../../middleware/catchError.js';
import { ErrorApp } from '../../utils/ErrorApp.js';
import { deleteOne } from "../../handler/handler.js";

const addBrand =catchError(async (req, res, next) => {
  req.body.slug = slugify(req.body.name);
  req.body.logo=req.file.filename;
  let brand = new BrandModel(req.body);
  await brand.save();
  res.json({ message: "Success", brand });
});
const getAllBrands = async (req, res, next) => {
  let categories = await BrandModel.find();
  res.json({ message: "Success", categories });
};
const getBrand =catchError( async (req, res, next) => {
  let brand = await BrandModel.findById(req.params.id);
  brand ||next(new ErrorApp('brand not found',404));
  !brand ||res.json({ message: "Success", brand });
});
const updateBrand =catchError(  async (req, res, next) => {
  if(req.body.name)  req.body.slug = slugify(req.body.name);
 if(req.file) req.body.logo=req.file.filename
  let brand = await BrandModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
  brand ||next(new ErrorApp('brand not found',404));
  !brand ||res.json({ message: "Success", brand });
});
const deleteBrand =deleteOne(BrandModel);
export { addBrand ,getAllBrands,getBrand,updateBrand,deleteBrand};
