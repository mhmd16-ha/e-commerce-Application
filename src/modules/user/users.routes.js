import { Router } from "express";
import { validate } from '../../../middleware/validate.js';
import { UserValidation } from "./users.vaildation.js";
import { addUser, deleteuser, getAllUsers, getuser, updateuser } from "./users.controller.js";
import { checkEmail } from './../../../middleware/checkEmail.js';
import { protectRoutes } from "../authentication/auth.controller.js";
const usersRouter=Router()
usersRouter.route('/').post(validate(UserValidation),checkEmail,addUser).get(getAllUsers)
usersRouter.route('/:id').get(getuser).put(protectRoutes,checkEmail,updateuser).delete(deleteuser)


export default usersRouter