
import { ProductsModel } from "../models/productsModel.js";

export default class ProductsController {
    getProducts(req, res) {
        let products = ProductsModel.get();
        res.render('products', { products: products, userEmail : req.session.userEmail })
    }

    getAddForm(req, res) {
        res.render('form', { errorMessage: null, userEmail: req.session.userEmail });
    }

    addNewProduct(req, res) {
        // get data from form
        const { name, description, price } = req.body;
        const imageURL = 'images/' + req.file.filename;


        // add Product to the products list
        // ProductsModel.add(productData);
        ProductsModel.add(name, description, price, imageURL);

        // render products
        let products = ProductsModel.get();
        // res.redirect('/products', { products, userEmail: req.session.userEmail })
        res.render('products', { products , userEmail : req.session.userEmail}) 
    }

    getUpdateProductView(req, res, next) {
        const id = req.params.id;
        const productFound = ProductsModel.getById(id);

        // check if product exists
        if (productFound) {
            return res.render('updateItem.ejs', { errorMessage: null, product: productFound });
        } else {
            // if product doesn't exist
            res.status(401).send('Product not found!')
        }
    }

    updateProduct(req, res) {
        const { name, description, price, id, imageURL } = req.body;
        // const imageURL = req.file.filename;
        ProductsModel.updateItem(name, description, price, imageURL, id);
        res.redirect('/')
    }

    deleteItem(req, res) {
        const id = req.params.id;
        const product = ProductsModel.getById(id);

        // check if product exists
        if (!product) {
            res.status(401).send('Product not found!');
        }

        let products = ProductsModel.get();
        ProductsModel.delete(id);
        res.render('products', { products })
    }

}