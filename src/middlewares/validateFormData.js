import { body, validationResult } from "express-validator";

export async function validateFormData(req, res, next) {

    // 1. setup rules for validation
    const rules = [
        body('name').notEmpty().withMessage('Name is required!'),
        body('price').isFloat({ gt: 0 }).withMessage('Price should be a positive value!'),
        body('imageURL').isURL().withMessage('URL is invalid!')
    ]

    // run those rules
    await Promise.all(rules.map(rule => rule.run(req)));

    // check if there ara any errors after running those rules
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('form', { errorMessage: errors.array()[0].msg })
    }

    next();
}