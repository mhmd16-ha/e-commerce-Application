import { Router } from "express";
import { validate } from '../../../middleware/validate.js';
import { checkEmail } from './../../../middleware/checkEmail.js';
import { changePassword, signIn, signUp } from "./auth.controller.js";
import { authValidation } from "./auth.vaildation.js";

const authRouter=Router()
authRouter.route('/signup').post(validate(authValidation),checkEmail,signUp)
authRouter.route('/signin').post(signIn)
authRouter.route('/changePassword').patch(changePassword)


export default authRouter