import React, { useState, useContext } from 'react';
import { TodoContext } from '../../context/TodoContext';
import { apiClient } from '../../setupAxios';

const TodoForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const { setTodos } = useContext(TodoContext)!;
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await apiClient.post(
        '/todos',
        {
          title,
          description,
          dueDate,
        },
      );
      setTodos((prev) => [...prev, response.data]);
      setTitle('');
      setDescription('');
      setDueDate('');
    } catch (error : any) {
      setError(error.response.data.message);
    }
  };

  return (
    <>
      <form style={{display: 'flex', flexDirection:'row', gap: 10, marginTop: 10}} onSubmit={handleSubmit}>
          <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
          />
          <textarea
              placeholder="Description"
              value={description}
              style={{color: 'white', background: 'none', borderColor: 'white', padding: 10, fontSize: 16, height: '3rem'}}
              onChange={(e) => setDescription(e.target.value)}
              required
          ></textarea>
          <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
          />
          <button type="submit">Add Todo</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </>
  );
};

export default TodoForm;
