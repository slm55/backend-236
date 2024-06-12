import ProductRepository from "../repositories/Product.mjs";
import CartRepository from "../repositories/Cart.mjs";

class CartController {
    async getCart(req, res) {
        if (req.user) {
            const cart = await CartRepository.getUserCart(req.user);
            return res.send(cart);
        }
        const cart = req.session.cart || [];
        res.send(cart);
    }

    async addProductToCart(req, res) {
        const { id } = req.params;
        const { quantity } = req.body;
        const product = await ProductRepository.getProductById(id);
        if (req.user) {
            await CartRepository.addProductToCart(req.user, product, quantity);
            const cart = await CartRepository.getUserCart(req.user);
            return res.send(cart);
        }
        const cart = req.session.cart || [];
        product.quantity = quantity;
        cart.push(product);
        req.session.cart = cart;
        res.status(201).send(product);
    }

    async updateProductQuantity(req, res) {
        const { id } = req.params;
        const { quantity } = req.body;
        const product = await ProductRepository.getProductById(id);
        if (req.user) {
            await CartRepository.updateProductQuantity(req.user, product, quantity);
            const cart = await CartRepository.getUserCart(req.user);
            return res.send(cart);
        }
        let cart = req.session.cart || [];
        cart = cart.map(p => {
            if (p.id == id) {
                p.quantity = quantity;
            }
            return p;
        })
        req.session.cart = cart;
        res.send(cart);
    }

    async deleteProductFromCart(req, res) {
        const { id } = req.params;
        const product = await ProductRepository.getProductById(id);
        if (req.user) {
            await CartRepository.deleteProductFromCart(req.user, product);
            const cart = await CartRepository.getUserCart(req.user);
            return res.send(cart);
        }
        let cart = req.session.cart || [];
        cart = cart.filter(p => p.id != id);
        req.session.cart = cart;
        res.send(cart);
    }

    async clearCart(req, res) {
        if (req.user) {
            await CartRepository.clearCart(req.user);
            const cart = await CartRepository.getUserCart(req.user);
            return res.send(cart);
        }
        req.session.cart = [];
        res.send(req.session.cart);
    }
}

export default CartController;