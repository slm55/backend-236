import { Router } from "express";
import TodoController from "../controllers/Todo.mjs";

const router = Router();
const controller = new TodoController();

router.get("/todos", controller.getTodos);
router.get("/todos/:id", controller.getTodoById);
router.post("/todos", controller.addTodo);
router.put("/todos", controller.updateTodo)
router.delete("/todos/:id", controller.removeTodo);
router.delete("/todos", controller.clearTodos);

export default router;