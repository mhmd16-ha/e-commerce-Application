import slugify from "slugify";
import SubCategoryModel from "./../../../database/models/SubCategory.model.js";
import { catchError } from "../../../middleware/catchError.js";
import { ErrorApp } from "../../utils/ErrorApp.js";
import { deleteOne } from './../../handler/handler.js';
import { ApiFeather } from './../../utils/apiFeature.js';
const getAllSubCategories = catchError(async (req, res, next) => {
  let filterObject = {};
  if (req.params.category) filterObject.category = req.params.category;
  let apiFeather=new ApiFeather(SubCategoryModel.find(filterObject),req.query).pagination().sort().filter().fields().search()
  let subCategories=await apiFeather.mongosseQuery

  res.json({ message: "Success",pageNumber:apiFeather.pageNumber ,subCategories });

});
const addSubCategory = catchError(async (req, res, next) => {
  req.body.slug = slugify(req.body.name);
  let subCategory = new SubCategoryModel(req.body);
  await subCategory.save();
  res.json({ message: "success", subCategory });
});
const getSubCategory = catchError(async (req, res, next) => {
  let subCategory = await SubCategoryModel.findById(req.params.id);
  subCategory || next(new ErrorApp("subCategory not found", 404));
  !subCategory || res.json({ message: "success", subCategory });
});
const updateSubCategory = catchError(async (req, res, next) => {
  req.body.slug = slugify(req.body.name);
  let subCategory = await SubCategoryModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  subCategory || next(new ErrorApp("subCategory not found", 404));
  !subCategory || res.json({ message: "success", subCategory });
});
const deleteSubCategory = deleteOne(SubCategoryModel);
export {
  getAllSubCategories,
  addSubCategory,
  getSubCategory,
  updateSubCategory,
  deleteSubCategory,
};
