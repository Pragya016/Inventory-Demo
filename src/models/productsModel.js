export class ProductsModel {
    constructor (id, name, description, price, imageURL) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.imageURL = imageURL;
    }

    static get() {
        return products;
    }

    static add(product) {
        const newProduct = new ProductsModel(
            products.length + 1,
            product.name,
            product.description,
            product.price,
            product.imageURL
        )

        products.push(newProduct);
    }

    static getById(id) {
        // if product with the id exist
        return products.find((p) => p.id === id);
    }

    static updateItem(obj) {
        const idx = products.findIndex(p => p.id === obj.id);
        products[idx] = obj;
    }

    static delete(id) {
        const productTobeDeleted = products.findIndex(p => p.id === id);
        products.splice(productTobeDeleted,1);
    }
}

var products = [
    new ProductsModel(
        'product-1',
        'Book',
        'This is the first product.',
        'Rs. 399',
        'https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg'
    )
]