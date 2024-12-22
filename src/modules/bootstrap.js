
import CategoryRouter from './category/category.routes.js';
import subCategoryRouter from './subCategory/subCategory.routes.js';
import brandRouter from './brand/brands.routes.js';
import productRouter from './product/products.routes.js';
import usersRouter from './user/users.routes.js';
import authRouter from './authentication/auth.routes.js';
import ReviewRouter from './review/reviews.routes.js';
import WishListRouter from './wishList/wishList.routes.js';
import couponRouter from './coupon/coupon.routes.js';
import CartRouter from './cart/cart.routes.js';
import OrderRouter from './order/order.routes.js';



export const bootstrap=(app)=>{
    app.use('/api/v1/categories',CategoryRouter)
    app.use('/api/v1/subcategories',subCategoryRouter)
    app.use('/api/v1/brands',brandRouter)
    app.use('/api/v1/products',productRouter)
    app.use('/api/v1/users',usersRouter)
    app.use('/api/v1/auth',authRouter)
    app.use('/api/v1/reviews',ReviewRouter)
    app.use('/api/v1/wishLists',WishListRouter)
    app.use('/api/v1/coupon',couponRouter)
    app.use('/api/v1/cart',CartRouter)
    app.use('/api/v1/order',OrderRouter)
}