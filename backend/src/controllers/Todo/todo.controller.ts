import { Request, Response } from "express";
import { AppDataSouce } from "../../db/db.setup";
import { TodoEntity } from "../../entities/todo.entity";

const todoRepository = AppDataSouce.getRepository(TodoEntity);

export const getTodos = async (req: Request, res: Response) => {
  try {
    const userId = req.user.uuid;
    const todos = await todoRepository.find({ where: { userId } });
    res.status(200).json(todos);
  } catch (error) {
    console.error("Error fetching todos:", error);
    res.status(500).json({ message: "Failed to fetch todos" });
  }
};

export const createTodo = async (req: Request, res: Response) => {
  try {
    const { title, description, dueDate } = req.body;
    const userId = req.user.uuid;

    const newTodo = todoRepository.create({
      title,
      description,
      dueDate,
      userId,
    });

    const savedTodo = await todoRepository.save(newTodo);
    res.status(201).json(savedTodo);
  } catch (error) {
    console.error("Error creating todo:", error);
    res.status(500).json({ message: "Failed to create todo" });
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedFields = req.body;

    const todo = await todoRepository.findOne({ where: { uuid: id } });
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    Object.assign(todo, updatedFields);
    const updatedTodo = await todoRepository.save(todo);

    res.status(200).json(updatedTodo);
  } catch (error) {
    console.error("Error updating todo:", error);
    res.status(500).json({ message: "Failed to update todo" });
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const todo = await todoRepository.findOne({ where: { uuid: id } });
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    await todoRepository.remove(todo);
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting todo:", error);
    res.status(500).json({ message: "Failed to delete todo" });
  }
};
