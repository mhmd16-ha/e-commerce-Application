import { Router } from "express";
import { addProduct, deleteProduct, getAllProducts, getProduct, updateProduct } from "./products.controller.js";
import { fileMixfiles } from "../../fileUpload/fileUpload.js";
import { validate } from './../../../middleware/validate.js';
import { getProductsValidation } from "./products.vaildation.js";

const productRouter=Router()
productRouter.route('/').post(fileMixfiles([{name:'imageCover',maxCount:1},{name:'images',maxCount:10}],'products'),validate(getProductsValidation),addProduct).get(getAllProducts)
productRouter.route('/:id').get(getProduct).put(fileMixfiles([{name:'imageCover',maxCount:1},{name:'images',maxCount:10}],'brproductsands'),updateProduct).delete(deleteProduct)


export default productRouter