import ProductRepository from "../repositories/Product.mjs";
import CartRepository from "../repositories/Cart.mjs";
import ProductController from "./Product.mjs";

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
        const { quantity = 1 } = req.body;
        console.log(quantity)
        const product = await ProductRepository.getProductById(id);
        if (req.user) {
            await CartRepository.addProductToCart(req.user, product, quantity);
            return res.send({...product, quantity});
        }
        const cart = req.session.cart || [];
        product.quantity = quantity;
        cart.push(product);
        req.session.cart = cart;
        res.send({...product, quantity});
    }

    async updateProductQuantity(req, res) {
        const { id } = req.params;
        const { quantity } = req.body;
        if (quantity <= 0) {
            res.sendStatus(400);
        }
        const product = await ProductRepository.getProductById(id);
        if (req.user) {
            await CartRepository.updateProductQuantity(req.user, product, quantity);
            return res.send({...product, quantity});
        }
        let cart = req.session.cart || [];
        cart = cart.map(p => {
            if (p.id == id) {
                p.quantity = quantity;
            }
            return p;
        })
        req.session.cart = cart;
        res.send({...product, quantity});
    }

    async deleteProductFromCart(req, res) {
        const { id } = req.params;
        const product = await ProductRepository.getProductById(id);
        if (req.user) {
            await CartRepository.deleteProductFromCart(req.user, product);
            return res.sendStatus(200);
        }
        let cart = req.session.cart || [];
        cart = cart.filter(p => p.id != id);
        req.session.cart = cart;
        res.sendStatus(200);
    }

    async clearCart(req, res) {
        if (req.user) {
            await CartRepository.clearCart(req.user);
            return res.sendStatus(200);
        }
        req.session.cart = [];
        res.sendStatus(200);
    }

    async checkout(req, res) {
        const cart = await CartRepository.getUserCart(req.user)
        if (req.user) {
            const order = await CartRepository.checkout(req.user, cart);
            await CartRepository.addOrderProducts(order, cart);
            await CartRepository.clearCart(req.user);
            return res.send(order);
        }
    }

    async getOrders(req, res) {
        if (req.user) {
            const orders = await CartRepository.getOrders(req.user);
            return res.send(orders);
        }
        return res.sendStatus(401);
    }

    async getOrderById(req, res) {
        const { id } = req.params;
        const orders = await CartRepository.getOrders(req.user);
        const order = orders.find(o => o.id == id);
        if (!order) {
            return res.status(400).send("Order not found");
        }
        if (req.user) {
            const orderDetails = await CartRepository.getOrderById(order, req.user);
            return res.send(orderDetails);
        }
        return res.sendStatus(401);
    }
}

export default CartController;
