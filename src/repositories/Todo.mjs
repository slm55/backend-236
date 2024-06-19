import pool from "../database.mjs";

class TodoRepository {
    static async getTodos(user) {
        const response = await pool.query("SELECT * FROM todos WHERE user_id = $1", [user.id]);

        if (!response.rows.length) {
            return [];
        }

        return response.rows;
    }

    static async getTodoById(id, user) {
        const response = await pool.query("SELECT * FROM todos WHERE id = $1 AND user_id = $2", [id, user.id]);

        if (!response.rows.length) {
            return null;
        }

        return response.rows[0];
    }

    static async addTodo(todo, user) {
        const response = await pool.query("INSERT INTO todos (title, status, user_id) VALUES ($1, $2, $3) RETURNING *", [todo.title, todo.status, user.id]);

        return response.rows[0];
    }

    static async updateTodo(todo, user) {
        const response = await pool.query("UPDATE todos SET title = $1, status = $2 WHERE id = $3 AND user_id = $4 RETURNING *", [todo.title, todo.status, todo.id, user.id]);

        return response.rows[0];
    }

    static async deleteTodo(id, user) {
        const response = await pool.query("DELETE FROM todos WHERE id = $1 AND user_id = $2 RETURNING *", [id, user.id]);

        return response.rows[0];
    }

    static async deleteAllTodos(user) {
        const response = await pool.query("DELETE FROM todos WHERE user_id = $1 RETURNING *", [user.id]);

        return response.rows;
    }
}

export default TodoRepository;
