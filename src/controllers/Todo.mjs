import TodoRepository from "../repositories/Todo.mjs";

class TodoController {
    async getTodos(req, res) {
        if (req.user) {
            const todos = await TodoRepository.getTodos(req.user);
            return res.send(todos);
        }
        res.sendStatus(401);
    }

    async getTodoById(req, res) {
        if (req.user) {
            const todo = await TodoRepository.getTodoById(req.params.id, req.user);
            return res.send(todo);
        }
        res.sendStatus(401);
    }

    async addTodo(req, res) {
        if (req.user) {
            const todo = await TodoRepository.addTodo(req.body, req.user);
            return res.send(todo);
        }
        res.sendStatus(401);
    }

    async updateTodo(req, res) {
        if (req.user) {
            const todo = await TodoRepository.updateTodo(req.body, req.user);
            return res.send(todo);
        }
        res.sendStatus(401);
    }

    async removeTodo(req, res) {
        if (req.user) {
            const todo = await TodoRepository.deleteTodo(req.params.id, req.user);
            return res.send(todo);
        }
        res.sendStatus(401);
    }

    async clearTodos(req, res) {
        if (req.user) {
            const todo = await TodoRepository.deleteAllTodos(req.user);
            return res.send(todo);
        }
        res.sendStatus(401);
    }
}

export default TodoController;