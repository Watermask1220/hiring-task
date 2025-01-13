import React, { useState } from 'react';

interface TodoItemProps {
  todo: {
    uuid: string;
    title: string;
    description: string;
    dueDate: string;
    status: boolean;
  };
  onDelete: (uuid: string) => void;
  onUpdate: (
    uuid: string,
    updatedTodo: Partial<{ title: string; description: string; dueDate: string; status: boolean }>
  ) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);
  const [dueDate, setDueDate] = useState(todo.dueDate);
  const [status, setStatus] = useState(todo.status);

  const handleSave = () => {
    onUpdate(todo.uuid, { title, description, dueDate, status });
    setIsEditing(false);
  };

  return (
    <div style={{border: '1px solid #ddd', padding: '10px', margin: '10px 0' }}>
      {isEditing ? (
        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 5}}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            value={description}
            style={{color: 'white', background: 'none', borderColor: 'white', padding: 10, fontSize: 16, height: '3rem'}}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          <label style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            Completed:
            <input
              type="checkbox"
              checked={status}
              style={{marginLeft: 5}}
              onChange={(e) => setStatus(e.target.checked)}
            />
          </label>
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          <h3>{todo.title}</h3>
          <p>{todo.description}</p>
          <p>Due Date: {new Date(todo.dueDate).toLocaleDateString()}</p>
          <p>Status: {todo.status ? 'Completed' : 'Incomplete'}</p>
          <div style={{display: 'flex', justifyContent: 'flex-end'}}>
            <button style={{marginRight: 10}} onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={() => onDelete(todo.uuid)}>Delete</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoItem;
