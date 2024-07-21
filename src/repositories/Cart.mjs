import pool from "../database.mjs";

class CartRepository {
    static async getUserCart(user) {
        const response = await pool.query("SELECT products.*, quantity FROM (carts INNER JOIN products ON carts.product_id = products.id) WHERE user_id = $1", [user.id]);

        return response.rows;
    }

    static async addProductToCart(user, product, quantity = 1) {
        const response = await pool.query("INSERT INTO carts (user_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *", [user.id, product.id, quantity]);

        return response.rows[0];
    }

    static async deleteProductFromCart(user, product) {
        const response = await pool.query("DELETE FROM carts WHERE user_id = $1 AND product_id = $2 RETURNING *", [user.id, product.id]);

        return response.rows[0];
    }

    static async updateProductQuantity(user, product, quantity) {
        const response = await pool.query("UPDATE carts SET quantity = $1 WHERE user_id = $2 AND product_id = $3 RETURNING *", [quantity, user.id, product.id]);

        return response.rows[0];
    }

    static async clearCart(user) {
        const response = await pool.query("DELETE FROM carts WHERE user_id = $1 RETURNING *", [user.id]);

        return response.rows[0];
    }

    static async checkout(user, products) {
        const totalPrice = products.reduce((prev, p) => prev + p.price * p.quantity, 0)
        const response = await pool.query("INSERT INTO orders (user_id, total) values ($1, $2) RETURNING *", [user.id, totalPrice]);

        return response.rows[0]
    }

    static async addOrderProducts(order, products) {
        for (const product of products) {
            await pool.query("INSERT INTO order_products (order_id, product_id, quantity) VALUES ($1, $2, $3)", [order.id, product.id, product.quantity]);
        }
    }

    static async getOrders(user) {
        const response = await pool.query("SELECT * FROM orders WHERE user_id = $1", [user.id]);

        return response.rows;
    }

    static async getOrderById(order, user) { 
        const orderResponse = await pool.query("SELECT * FROM orders WHERE id = $1 AND user_id = $2", [order.id, user.id]);

        const productsResponse = await pool.query("SELECT products.*, order_products.quantity from (products  inner join order_products on products.id = order_products.product_id) where order_id = $1", [order.id]);

        return {order: orderResponse.rows, products: productsResponse.rows};
    }
}

export default CartRepository;