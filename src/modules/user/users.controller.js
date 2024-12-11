import { catchError } from '../../../middleware/catchError.js';
import { ErrorApp } from '../../utils/ErrorApp.js';
import { deleteOne } from "../../handler/handler.js";
import User from './../../../database/models/user.model.js';

const addUser=catchError(async (req, res, next) => {

  let user= new User(req.body);
  await user.save();
  res.json({ message: "Success", user});
});
const getAllUsers = async (req, res, next) => {
  let users = await User.find();
  res.json({ message: "Success", users });
};
const getuser=catchError( async (req, res, next) => {
  let user= await User.findById(req.params.id);
  user||next(new ErrorApp('usernot found',404));
  !user||res.json({ message: "Success", user});
});
const updateuser=catchError(  async (req, res, next) => {
  let user= await User.findByIdAndUpdate(req.params.id,req.body,{new:true});
  user||next(new ErrorApp('user not found',404));
  !user||res.json({ message: "Success", user});
});
const deleteuser=deleteOne(User);
export { addUser,getAllUsers,getuser,updateuser,deleteuser};
