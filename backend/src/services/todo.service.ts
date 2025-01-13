import { AppDataSouce } from "../db/db.setup";
import { TodoEntity } from "../entities/todo.entity";

export const TodoRepository = AppDataSouce.getRepository(TodoEntity);

export const createTodo = async (todoData: Partial<TodoEntity>) => {
  const todo = TodoRepository.create(todoData);
  return await TodoRepository.save(todo);
};

export const getTodosByUserId = async (userId: string) => {
  return await TodoRepository.find({ where: { userId } });
};

export const updateTodo = async (uuid: string, todoData: Partial<TodoEntity>) => {
  await TodoRepository.update({ uuid }, todoData);
  return await TodoRepository.findOneBy({ uuid });
};

export const deleteTodo = async (uuid: string) => {
  await TodoRepository.delete({ uuid });
};
