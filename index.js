import express from "express";
import path from "path";
import ProductsController from "./src/controllers/productsController.js";
import expressEjsLayouts from "express-ejs-layouts";
import { validateFormData } from "./src/middlewares/validateFormData.js";
import { uploadFile } from './src/middlewares/fileUploadMiddleware.js';
import { AuthenticationController } from "./src/controllers/authenticationController.js";
import session from "express-session";
import { auth } from "./src/middlewares/auth.js";
import cookieParser from "cookie-parser";
import { setLastVisit } from "./src/middlewares/visitMiddleware.js";

const authenticationController = new AuthenticationController();
const productsController = new ProductsController();
const app = express();

// setup view engine setting
app.set('view engine', 'ejs');
app.set('views', path.join(path.resolve(), 'src', 'views'));

app.use(expressEjsLayouts);
app.use(express.static('public'))
app.use(express.static('src/views'));

// create session
app.use(session({
    secret: 'session-key', //the key should always be unique, always use keyGenerator
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false
    }
}))

// set up body data parser
app.use(express.urlencoded({ extended: true }));

// set up cookie parser
app.use(cookieParser());
app.use(setLastVisit);

// login page
app.get('/register', authenticationController.displayRegistrationFrom)
app.get('/login', authenticationController.displayLoginForm)
app.post('/login', authenticationController.varifyUser)
app.post('/register', authenticationController.addUser);

// displal products
app.get('/', auth, productsController.getProducts);

// display form
app.get('/new', auth, productsController.getAddForm);

// add new product
app.post('/', auth, uploadFile.single('imageURL'), validateFormData, productsController.addNewProduct);

// udpate existing product
app.get('/update-item/:id', auth, productsController.getUpdateProductView);
app.post('/update-product', auth, uploadFile.single('imageURL'), productsController.updateProduct);

// delete the product
app.post('/delete-item/:id', auth, productsController.deleteItem);

// logout
app.get('/logout', authenticationController.logout);

// create server for controller
app.listen(5500);
console.log('app is listening...');