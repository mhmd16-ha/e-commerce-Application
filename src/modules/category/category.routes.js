import { Router } from "express";
import { addCategory, deleteCategory, getAllCategories, getCategory, updateCategory } from "./category.controller.js";
import { fileSinglefile } from './../../fileUpload/fileUpload.js';
import { categoryValidation } from "./category.vaildation.js";
import { validate } from "../../../middleware/validate.js";
import subCategoryRouter from './../subCategory/subCategory.routes.js';
import { allowedTo, protectRoutes } from "../authentication/auth.controller.js";
const CategoryRouter=Router()
CategoryRouter.use('/:category/subcategories',subCategoryRouter)
CategoryRouter.route('/').post(protectRoutes,allowedTo("admin"),fileSinglefile('image','categories'),validate(categoryValidation),addCategory).get(getAllCategories)
CategoryRouter.route('/:id').get(getCategory).put(protectRoutes,allowedTo("admin"),fileSinglefile('image','categories'),updateCategory).delete(protectRoutes,deleteCategory)


export default CategoryRouter