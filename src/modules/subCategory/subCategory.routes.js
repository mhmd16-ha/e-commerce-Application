import { Router } from "express";
import { addSubCategory, deleteSubCategory, getAllSubCategories, getSubCategory, updateSubCategory } from "./subCategory.controller.js";
import { foundedCategory } from './../../../middleware/checkIfCategoryIsFound.js';
import { validate } from './../../../middleware/validate.js';
import { subCategoryValidation } from "./subCategory.vaildation.js";

const subCategoryRouter=Router({mergeParams:true})

subCategoryRouter.route('/').get(getAllSubCategories).post(foundedCategory,validate(subCategoryValidation),addSubCategory)
subCategoryRouter.route('/:id').get(getSubCategory).put(updateSubCategory).delete(deleteSubCategory)

export default subCategoryRouter