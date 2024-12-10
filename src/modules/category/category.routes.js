import { Router } from "express";
import { addCategory, deleteCategory, getAllCategories, getCategory, updateCategory } from "./category.controller.js";
import { fileSinglefile } from './../../fileUpload/fileUpload.js';
import { categoryValidation } from "./category.vaildation.js";
import { validate } from "../../../middleware/validate.js";
import subCategoryRouter from './../subCategory/subCategory.routes.js';
const CategoryRouter=Router()
CategoryRouter.use('/:category/subcategories',subCategoryRouter)
CategoryRouter.route('/').post(fileSinglefile('image','categories'),validate(categoryValidation),addCategory).get(getAllCategories)
CategoryRouter.route('/:id').get(getCategory).put(fileSinglefile('image','categories'),updateCategory).delete(deleteCategory)


export default CategoryRouter