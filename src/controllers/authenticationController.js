import { AuthenticationModel } from "../models/authenticationModel.js";
import { ProductsModel } from "../models/productsModel.js";

export class AuthenticationController {
    displayRegistrationFrom(req, res) {
        res.render('register', { userExists: false });
    }

    displayLoginForm(req, res) {
        res.render('login', { error: null });
    }

    addUser(req, res) {
        const { name, email, password } = req.body;
        const userExists = AuthenticationModel.addUser(name, email, password);

        if (userExists) {
            return res.render('register', { userExists })
        }

        res.redirect('login');
    }

    varifyUser(req, res) {
        const { email, password } = req.body;
        const userDetails = AuthenticationModel.isValidUser(email, password);
        if (!userDetails) {
            return res.render('login', { error: "Email or password is incorrect!" });
        }

        req.session.userEmail = email;
        const products = ProductsModel.get();
        res.render('products', { products, userEmail: req.session.userEmail });

    }

    logout(req, res) {
        // destroy the session
        req.session.destroy((err) => {
            if (err) {
                console.log(err);
            } else {
                res.redirect('/login');   
            }
        })
    }
}