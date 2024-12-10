import Joi from "joi";

const getProductsValidation =Joi.object({
title:Joi.string().min(3).max(50).required().trim(),
description:Joi.string().min(3).max(50).required().trim(),
price:Joi.number().min(0).required(),
priceAfterDiscount:Joi.number().min(0).required(),
sold:Joi.number().min(0).required(),
stock:Joi.number().min(0).required(),
rateCount:Joi.number().min(0).required(),
rateAvg:Joi.number().min(0).required(),
category:Joi.string().hex().required(),
subcategory:Joi.string().hex().required(),
brand:Joi.string().hex().required(),
images:Joi.array().items(Joi.object({
    fieldname:Joi.string().required(),
    originalname:Joi.string().required(),
    encoding:Joi.string().required(),
    mimetype:Joi.string().valid('image/jpeg','image/jpg','image/png'),
    destination:Joi.string().required(),
    filename:Joi.string().required(),
    path:Joi.string().required(),
    size:Joi.number().max(5242880).required()
}).required()).required(),
imageCover:Joi.array().items(Joi.object({
    fieldname:Joi.string().required(),
    originalname:Joi.string().required(),
    encoding:Joi.string().required(),
    mimetype:Joi.string().valid('image/jpeg','image/jpg','image/png'),
    destination:Joi.string().required(),
    filename:Joi.string().required(),
    path:Joi.string().required(),
    size:Joi.number().max(5242880).required()
}).required()).required()
})
export{
    getProductsValidation 
}