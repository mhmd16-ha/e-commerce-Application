import Joi from "joi";

const brandValidation =Joi.object({
name:Joi.string().min(1).max(50).required(),
image:Joi.object({
    fieldname:Joi.string().required(),
    originalname:Joi.string().required(),
    encoding:Joi.string().required(),
    mimetype:Joi.string().valid('image/jpeg','image/jpg','image/png'),
    destination:Joi.string().required(),
    filename:Joi.string().required(),
    path:Joi.string().required(),
    size:Joi.number().max(5242880).required()
}).required()
})
export{
    brandValidation 
}