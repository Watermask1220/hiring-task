import React, { useContext, useEffect, useState} from 'react';
import { TodoContext } from '../../context/TodoContext';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
import { Navigate } from 'react-router-dom';
import { apiClient } from '../../setupAxios';

const TodoList: React.FC = () => {
  const { todos, setTodos } = useContext(TodoContext)!;
  const authToken = localStorage.getItem('authToken');
  const username = localStorage.getItem('authUser');
  const [error, setError] = useState<string | null>(null);

  if(!authToken) {
    return <Navigate to="/"/>
  }
  
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await apiClient.get('/todos');
        setTodos(response.data);
      } catch (error : any) {
        setError(error.response.message);
      }
    };
    
    fetchTodos();
  }, [authToken, setTodos]);

  const handleDelete = async (uuid: string) => {
    try {
      await apiClient.delete(`/todos/${uuid}`);
      setTodos((prev) => prev.filter((todo) => todo.uuid !== uuid));
    } catch (error : any) {
      setError(error.response.message);
    }
  };

  const handleUpdate = async (
    uuid: string,
    updatedTodo: Partial<{ title: string; description: string; dueDate: string; status: boolean }>
  ) => {
    try {
      const response = await apiClient.put(`/todos/${uuid}`, updatedTodo);
      setTodos((prev) => prev.map((todo) => (todo.uuid === uuid ? response.data : todo)));
    } catch (error : any) {
      setError(error.response.message);
    }
  };

  
  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <h2>{username ? `${username}\'s` : 'Your'} {'Todos'}</h2>
      <TodoForm />
      {todos.map((todo) => (
        <TodoItem
          key={todo.uuid}
          todo={todo}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      ))}
    </div>
  );
};

export default TodoList;