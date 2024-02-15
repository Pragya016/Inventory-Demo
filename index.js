import express from "express";
import path from "path";
import ProductsController from "./src/controllers/productsController.js";
import expressEjsLayouts from "express-ejs-layouts";
import { validateFormData } from "./src/middlewares/validateFormData.js";

const Controller = new ProductsController();
const app = express();

// setup view engine setting
app.set('view engine', 'ejs');
app.set('views', path.join(path.resolve(), 'src', 'views'));

app.use(expressEjsLayouts);
app.use(express.static('public'))
app.use(express.static('src/views'));

// set up body data parser
app.use(express.urlencoded({ extended: true }));

// displal products
app.get('/', Controller.getProducts);

// display form
app.get('/new', Controller.getAddForm);

// add new product
app.post('/', validateFormData, Controller.addNewProduct);

// udpate existing product
app.get('/update-item/:id', Controller.getUpdateProductView);
app.post('/update-product', Controller.updateProduct)

// delete the product
app.post('/delete-item/:id' ,Controller.deleteItem);

// create server for controller
app.listen(5500);
console.log('app is listening...');