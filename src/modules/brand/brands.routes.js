import { Router } from "express";
import { addBrand, deleteBrand, getAllBrands, getBrand, updateBrand } from "./brand.controller.js";
import { fileSinglefile } from './../../fileUpload/fileUpload.js';
import { validate } from './../../../middleware/validate.js';
import { brandValidation } from "./brands.vaildation.js";
const brandRouter=Router()
brandRouter.route('/').post(fileSinglefile('image','brands'),validate(brandValidation),addBrand).get(getAllBrands)
brandRouter.route('/:id').get(getBrand).put(fileSinglefile('image','brands'),updateBrand).delete(deleteBrand)


export default brandRouter