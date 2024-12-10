import slugify from "slugify";
import CategoryModel from './../../../database/models/Category.model.js';
import { catchError } from './../../../middleware/catchError.js';
import { ErrorApp } from '../../utils/ErrorApp.js';
import { deleteOne } from "../../handler/handler.js";
import { ApiFeather } from './../../utils/apiFeature.js';
const addCategory =catchError(async (req, res, next) => {
  if(req.body.name) req.body.slug = slugify(req.body.name);
  if(req.file)  req.body.image=req.file.filename
  let category = new CategoryModel(req.body);
  let added=await category.save()
  res.json({ message: "Success", added });
});
const getAllCategories =catchError(  async (req, res, next) => {

  let apiFeather=new ApiFeather(CategoryModel.find(),req.query).pagination().sort().filter().fields().search()
  let categories=await apiFeather.mongosseQuery

  res.json({ message: "Success",pageNumber:apiFeather.pageNumber ,categories });

});
const getCategory =catchError( async (req, res, next) => {
  let category = await CategoryModel.findById(req.params.id);
  category ||next(new ErrorApp('category not found',404));
  !category ||res.json({ message: "Success", category });
});
const updateCategory =catchError(  async (req, res, next) => {
  if(req.body.name)  req.body.slug = slugify(req.body.name);
  if(req.file) req.body.image=req.file.filename
  let category = await CategoryModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
  category ||next(new ErrorApp('category not found',404));
  !category ||res.json({ message: "Success", category });
});
const deleteCategory =deleteOne(CategoryModel);
export { addCategory ,getAllCategories,getCategory,updateCategory,deleteCategory};
