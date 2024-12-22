import { Router } from "express";
import { protectRoutes } from "../authentication/auth.controller.js";
import { addCart,getCart, removeCartItem,updateCart } from "./cart.controller.js";

const CartRouter=Router()
CartRouter.route('/').post(protectRoutes,addCart)
.get(protectRoutes,getCart).put(protectRoutes,updateCart)
CartRouter.route('/:id').delete(protectRoutes,removeCartItem)


export default CartRouter