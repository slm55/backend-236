import pool from "../database.mjs";
import { hashPassword } from "../helpers/hash.mjs";

class UserRepository {
    static async getUsers() {
        const response = await pool.query("SELECT * FROM users");

        if (!response.rows.length) {
            return [];
        }

        return response.rows;
    }

    static async getUserById(id) {
        const response = await pool.query("SELECT * FROM users WHERE id = $1", [id]);

        if (!response.rows.length) {
            return null;
        }

        return response.rows[0];
    }

    static async getUserByEmail(email) {
        const response = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

        if (!response.rows.length) {
            return null;
        }

        return response.rows[0];
    }

    static async addUser(user) {
        const hash = await hashPassword(user.password)
        const response = await pool.query("INSERT INTO users (email, password, fullname) VALUES ($1, $2, $3) RETURNING *", [user.email, hash, user.fullname]);

        if (!response.rows.length) {
            return null;
        }

        return response.rows[0];
    }

    static async deleteUser(id) {
        const response = await pool.query("DELETE FROM users WHERE id = $1 RETURNING *", [id]);

        if (!response.rows.length) {
            return null;
        }

        return response.rows[0];
    }

    static async updatePassword(user, password) {
        const response = await pool.query("UPDATE users SET password = $1 WHERE id = $2 RETURNING *", [password, user.id]);

        if (!response.rows.length) {
            return null;
        }

        return response.rows[0];
    }
    static async updateFullname(user, fullname) {
        const response = await pool.query("UPDATE users SET fullname = $1 WHERE id = $2 RETURNING *", [fullname, user.id]);

        if (!response.rows.length) {
            return null;
        }

        return response.rows[0];
    }
}

export default UserRepository;