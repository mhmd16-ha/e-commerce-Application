import Joi from "joi";

const authValidation =Joi.object({
name:Joi.string().min(1).max(50).required(),
email:Joi.string().min(1).max(50).required(),
password:Joi.string().min(1).max(50).required(),
})
export{
    authValidation 
}