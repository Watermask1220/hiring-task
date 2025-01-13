import React, { useState, } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '../../setupAxios';

import { useAuth } from '../../hooks/useAuth';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    try {
      const response = await apiClient.post('/auth/login', {
        email,
        password,
      });
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('authUser', response.data.username);

      setAuth(response.data.username);
      navigate('/todos');

    } catch (error: any) {
      if (error.response) {
        setError(error.response.data.message || 'Login failed. Please try again.');
      } else {
        setError('An unexpected error occurred.');
      }
    }
  };

  return (
    
    <div>
      <form style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}} onSubmit={handleSubmit}>
        <h2 style={{marginBottom: 5}}>Login</h2>
        <div style={{display: 'flex', flexDirection: 'column', gap: 20}}>
          <input type="email" style={{width: 400, height: 50}} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
          <input type="password" style={{width: 400, height: 50}} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
          <button style={{margin: 0}} type="submit">Login</button>
        </div>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Login;
