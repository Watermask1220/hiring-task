import React from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';


const Navbar: React.FC = () => {
  const { auth } = useAuth();

  if (auth) return null;

  return (
    <nav style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20}}>
      <Link to="/">Login</Link>
      <Link to="/register">Register</Link>
    </nav>
  );
};

export default Navbar;
