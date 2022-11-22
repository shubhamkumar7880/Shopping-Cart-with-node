// const products = [];
const Product = require('../models/product');
const Cart = require('../models/cart');


exports.getProducts = (req, res, next) => {
    // console.log('shop.js',adminData.products);
    //   res.sendFile(path.join(rootDir, 'Views', 'shop.html'));
    Product.fetchAll((products) => {
        res.render("shop/product-list", {
            prods: products,
            pageTitle: 'All Products',
            path: '/products',
        });
    });
}

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId, product => {
        res.render('shop/product-detail', { product: product, pageTitle: product.title, path: '/products' });
    });

};

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId, (product) => {
        Cart.addProduct(prodId, product.price);
    })
    res.redirect('/cart');
};

exports.getIndex = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render("shop/index", {
            prods: products,
            pageTitle: 'Shop',
            path: '/',
            hasProducts: products.length > 0,
            activeShop: true,
            productCSS: true,
        });
    });
}

exports.getCart = (req, res, next) => {
    Cart.getCart(cart => {
        Product.fetchAll(products => {
            const cartProducts = [];
            for(product of products){
                const cartProductData = cart.products.find(prod => prod.id === product.id);
                if(cartProductData){
                    cartProducts.push({productData: product, qty: cartProductData.qty });
                }
            }
            res.render("shop/cart", {
                pageTitle: 'Your Cart',
                path: '/cart',
                products: cartProducts
            });
        });
    });
}

exports.postCartDeleteProduct = (req, res, next) => {
const prodId = req.body.productId;
Product.findById(prodId, product => {
    Cart.deleteProduct(prodId, product.price);
    res.redirect('/cart');
})
};

exports.getOrders = (req, res, next) => {
    res.render("shop/orders", {
        pageTitle: 'Your Orders',
        path: '/orders',
    });
}
exports.getCheckout = (req, res, next) => {
    res.render("shop/checkout", {
        pageTitle: 'Checkout',
        path: '/checkout',
    });
}