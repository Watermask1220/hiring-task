import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '../../setupAxios';

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      await apiClient.post('/auth/register', {
        username,
        email,
        password,
      });
      
      alert('Registration successful! You can now log in.');
      navigate('/');
    } catch (error: any) {
        setError(error.response.data.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <form style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}} onSubmit={handleSubmit}>
        <h2 style={{marginBottom: 5}}>Register</h2>
        <div style={{display: 'flex', flexDirection: 'column', gap: 20}}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            style={{width: 400, height: 50}}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            style={{width: 400, height: 50}}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            style={{width: 400, height: 50}}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            style={{
              width: '100%',
              height: '3rem',
              margin: 0,
              color: '#fff',
              borderRadius: 4,
              cursor: 'pointer',
            }}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Registering...' : 'Register'}
          </button>
        </div>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Register;
