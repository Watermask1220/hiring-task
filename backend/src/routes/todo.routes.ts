import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { createTodo, getTodos, updateTodo, deleteTodo } from "../controllers/Todo/todo.controller";

const router = Router();

router.use(authMiddleware);

router.get("/", getTodos);
router.post("/", createTodo);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);

export default router;
