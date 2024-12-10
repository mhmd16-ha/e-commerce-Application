import Joi from "joi";

const subCategoryValidation =Joi.object({
name:Joi.string().min(1).max(50).required(),
category:Joi.string().hex().required()
})
export{
    subCategoryValidation 
}