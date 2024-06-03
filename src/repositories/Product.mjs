import pool from "../database.mjs";

class ProductRepository {
    static async getProducts() {
        const response = await pool.query("SELECT * FROM products");

        if (!response.rows.length) {
            return [];
        }

        return response.rows;
    }

    static async getProductById(id) {
        const response = await pool.query("SELECT * FROM products WHERE id = $1", [id]);

        if (!response.rows.length) {
            return null;
        }

        return response.rows[0];
    }

    static async addProduct(product) {
        // const response = await pool.query("INSERT INTO products (title, price, ... ) VALUES ($1, $2, ...)", [product.title, product.price, ...]);

        return response.rows[0];
    }

    static async deleteProduct(id) {
        const response = await pool.query("DELETE FROM products WHERE id = $1 RETURNING *", [id]);

        return response.rows[0];
    }

    static async updateProduct(product) {
        const response = await pool.query("UPDATE products SET title = $1, price = $2, ... WHERE id = $3 RETURNING *", [product.title, product.price, product.id]);

        return response.rows[0];
    }
}

export default ProductRepository;