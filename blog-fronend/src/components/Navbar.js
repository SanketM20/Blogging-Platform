import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">My Blog</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
            {token && <li className="nav-item"><Link className="nav-link" to="/create">New Post</Link></li>}
            {token && <li className="nav-item"><Link className="nav-link" to="/dashboard">My Posts</Link></li>}
          </ul>
          <ul className="navbar-nav ms-auto">
            {!token && <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>}
            {!token && <li className="nav-item"><Link className="nav-link" to="/signup">Signup</Link></li>}
            {token && <li className="nav-item"><button className="btn btn-link nav-link" onClick={handleLogout}>Logout</button></li>}
          </ul>
        </div>
      </div>
    </nav>
  );
}
