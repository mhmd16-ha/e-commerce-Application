
import CategoryRouter from './category/category.routes.js';
import subCategoryRouter from './subCategory/subCategory.routes.js';
import brandRouter from './brand/brands.routes.js';
import productRouter from './product/products.routes.js';
import usersRouter from './user/users.routes.js';
import authRouter from './authentication/auth.routes.js';



export const bootstrap=(app)=>{
    app.use('/api/v1/categories',CategoryRouter)
    app.use('/api/v1/subcategories',subCategoryRouter)
    app.use('/api/v1/brands',brandRouter)
    app.use('/api/v1/products',productRouter)
    app.use('/api/v1/users',usersRouter)
    app.use('/api/v1/auth',authRouter)
}