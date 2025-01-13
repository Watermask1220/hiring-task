import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import TodoList from './components/Todo/TodoList';
import Navbar from './components/Navbar';
import { TodoProvider } from './context/TodoContext';
import { AuthProvider } from './hooks/useAuth';
import './App.css';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <TodoProvider>
        <Router>
          <Navbar/>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/todos" element={<TodoList />} />
          </Routes>
        </Router>
      </TodoProvider>
    </AuthProvider>
  );
};

export default App;
