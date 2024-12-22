import { Router } from "express";
import { protectRoutes } from "../authentication/auth.controller.js";
import { addOrder ,getOrder} from "./order.controller.js";

const OrderRouter=Router()
OrderRouter.route('/:id').post(protectRoutes,addOrder)
OrderRouter.route('/').get(protectRoutes,getOrder)
// .put(protectRoutes,updateCart)
// CartRouter.route('/:id').delete(protectRoutes,removeCartItem)


export default OrderRouter