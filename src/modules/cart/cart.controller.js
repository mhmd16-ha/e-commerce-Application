import { catchError } from "./../../../middleware/catchError.js";
import { ErrorApp } from "./../../utils/ErrorApp.js";
import CartModel from "./../../../database/models/cart.model.js";
import ProductModel from "./../../../database/models/Product.model.js";

function calcPric(cart) {
  let totalPrice = 0;
  cart.cartItem.forEach((ele) => {
    totalPrice += ele.quntity * ele.price;
  });
  cart.totalPrice = totalPrice;
}
const addCart = catchError(async (req, res, next) => {
  let product = await ProductModel.findById(req.body.product).select("price");
  !product && next(new ErrorApp("product not found"), 404);
  req.body.price = product.price;
  let isCartExist = await CartModel.findOne({ user: req.user._id });
  if (!isCartExist) {
    let cart = new CartModel({
      user: req.user._id,
      cartItem: [req.body],
    });
    calcPric(cart);
    await cart.save();
    res.status(201).json({ message: "Success", cart });
  }
  let item = isCartExist.cartItem.find(
    (ele) => ele.product == req.body.product
  );
  if (item) {
    item.quntity += 1;
  } else {
    isCartExist.cartItem.push(req.body);
  }
  calcPric(isCartExist);
  await isCartExist.save();
  res.status(201).json({ message: "product added", isCartExist });
});

const getCart = catchError(async (req, res, next) => {
  let cart = await CartModel.findOne({ user: req.user._id });
  res.status(201).json({ message: "sucess", cart });
});

const removeCartItem = catchError(async (req, res, next) => {
  let cart = await CartModel.findOneAndUpdate(
    { user: req.user._id },
    { $pull: { cartItem: { _id: req.params.id } } },
    { new: true }
  );
  res.json({ message: "deleted", cart });
});
const updateCart = catchError(async (req, res, next) => {
  let product = await ProductModel.findById(req.body.product).select("price");
  !product && next(new ErrorApp("product not found"), 404);
  req.body.price = product.price;
  let isCartExist = await CartModel.findOne({ user: req.user._id });

  let item = isCartExist.cartItem.find(
    (ele) => ele.product == req.body.product
  );
  !item && next(new ErrorApp("item not found"), 404);
  if (item) {
    item.quntity =req.body.quntity;
  } 
  calcPric(isCartExist);
  await isCartExist.save();
  res.status(201).json({ message: "product added", isCartExist });
});
export { addCart, getCart, removeCartItem ,updateCart};
