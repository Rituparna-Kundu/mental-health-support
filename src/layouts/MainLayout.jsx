import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { Home, MessageCircle, BookHeart, Wind, Heart, Anchor } from 'lucide-react';
import leafLogo from '../assets/leaf_logo.png';
import './MainLayout.css'; // We'll create this for specific layout styles

const MainLayout = () => {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="container">
          <h1 className="logo">
            <img src={leafLogo} alt="Relief Logo" style={{ height: '65px', width: 'auto' }} />
            Relief
          </h1>
        </div>
      </header>

      <main className="app-main page-enter">
        <Outlet />
      </main>

      <nav className="bottom-nav">
        <div className="container nav-content">
          <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <Home size={24} />
            <span>Home</span>
          </NavLink>

          <NavLink to="/chat" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <MessageCircle size={24} />
            <span>Chat</span>
          </NavLink>

          <NavLink to="/journal" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <BookHeart size={24} />
            <span>Journal</span>
          </NavLink>

          <NavLink to="/exercises" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <Wind size={24} />
            <span>Breath</span>
          </NavLink>

          <NavLink to="/grounding" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <Anchor size={24} />
            <span>Focus</span>
          </NavLink>

          <NavLink to="/resources" className={({ isActive }) => `nav-item alert ${isActive ? 'active' : ''}`}>
            <Heart size={24} />
            <span>Help</span>
          </NavLink>
        </div>
      </nav>
    </div>
  );
};


export default MainLayout;
