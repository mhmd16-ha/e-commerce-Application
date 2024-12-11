import express from "express";
import { globalError } from './middleware/globalErrors.js';
import { ErrorApp } from './src/utils/ErrorApp.js';
import { bootstrap } from './src/modules/bootstrap.js';
import { dbconn } from "./database/dbConnection.js";
// import dotenv from 'dotenv'
// dotenv.config()
import 'dotenv/config'

const app = express();
const port = 3000;
app.use(express.json());
app.use('/uploads',express.static('uploads'))
bootstrap(app);
app.use("*", (req, res,next) => {
    next(new ErrorApp(`'${req.originalUrl}' Not Found`,404))
    });
app.use(globalError);


app.listen(port, () => console.log(`Example app listening on port ${port}!`));
