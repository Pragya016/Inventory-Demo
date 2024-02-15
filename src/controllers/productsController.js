import path from "path";
import { ProductsModel } from "../models/productsModel.js";

export default class ProductsController {
    getProducts(req, res) {
        let products = ProductsModel.get();
        res.render('products', { products: products })
    }

    getAddForm(req, res) {
        res.render('form', { errorMessage: null });
    }

    addNewProduct(req, res) {
        // get data from form
        const productData = req.body;

        // add Product to the products list
        ProductsModel.add(productData);

        // render products
        let products = ProductsModel.get();
        res.render('products', { products: products })
    }

    getUpdateProductView(req, res, next) {
        const id = req.params.id;
        const product = ProductsModel.getById(id);

        // check if product exists
        if (product) {
            return res.render('updateItem.ejs', { errorMessage: null, product });
        }

        // if product doesn't exist
        return res.status(401).send('Product not found!')
    }

    updateProduct(req, res) {
        ProductsModel.updateItem(req.body);
        const products = ProductsModel.get();
        res.render('products', { products })
    }

    deleteItem(req, res) {
        const id = req.params.id;
        const product = ProductsModel.getById(id);

        // check if product exists
        if (!product) {
            return res.status(401).send('Product not found!')
        }

        let products = ProductsModel.get();
        ProductsModel.delete(id);
        res.render('products', { products })
    }

}