import slugify from "slugify";
import { catchError } from './../../../middleware/catchError.js';
import ProductModel from './../../../database/models/Product.model.js';
import { ErrorApp } from '../../utils/ErrorApp.js';
import { deleteOne } from "../../handler/handler.js";
import { ApiFeather } from "../../utils/apiFeature.js";
const addProduct =catchError(async (req, res, next) => {
 req.body.slug = slugify(req.body.title);
  req.body.imageCover=req.files.imageCover[0].filename
  req.body.images=req.files.images.map(img=>img.filename)
  let product = new ProductModel(req.body);
  await product.save();
  res.json({ message: "Success", product });
  
});
const getAllProducts =catchError(  async (req, res, next) => {



let apiFeather=new ApiFeather(ProductModel.find(),req.query).pagination().sort().filter().fields().search()
  let products=await apiFeather.mongosseQuery

  res.json({ message: "Success",pageNumber:apiFeather.pageNumber ,products });
});
const getProduct =catchError( async (req, res, next) => {
  
  let product = await ProductModel.findById(req.params.id);
  product ||next(new ErrorApp('product not found',404));
  !product ||res.json({ message: "Success", product });
});
const updateProduct =catchError(  async (req, res, next) => {
  if(req.body.name ) req.body.slug = slugify(req.body.title);
 if(req.body.imageCover) req.body.imageCover=req.files.imageCover[0].filename
 if(req.body.images) req.body.images=req.files.images.map(img=>img.filename)
  let product = await ProductModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
  product ||next(new ErrorApp('product not found',404));
  !product ||res.json({ message: "Success", product });
});
const deleteProduct =deleteOne(ProductModel);
export { addProduct ,getAllProducts,getProduct,updateProduct,deleteProduct};
