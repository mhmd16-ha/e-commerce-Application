import { Router } from "express";
import {addWishList,deleteWishList ,getAllWishList} from "./wishList.controller.js";
import { protectRoutes } from "../authentication/auth.controller.js";

const WishListRouter=Router()
WishListRouter.route('/:id').patch(protectRoutes,addWishList)
WishListRouter.route('/:id').delete(protectRoutes,deleteWishList)
WishListRouter.route('/').get(protectRoutes,getAllWishList)


export default WishListRouter