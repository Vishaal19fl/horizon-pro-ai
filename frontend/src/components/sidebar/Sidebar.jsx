import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.scss';

const Sidebar = ({ onToggle }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  // Determine active item based on current path
  const getActiveItem = (path) => {

    if (path === '/dashboard') return 'dashboard';
    if (path === '/patient-analysis') return 'patient-analysis';
    return 'parse'; // default
  };
  
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeItem, setActiveItem] = useState(getActiveItem(currentPath));

  const toggleSidebar = () => {
    const newState = !isExpanded;
    setIsExpanded(newState);
    if (onToggle) {
      onToggle(newState);
    }
  };

  useEffect(() => {
    if (onToggle) {
      onToggle(isExpanded);
    }
  }, []);

  useEffect(() => {
    setActiveItem(getActiveItem(currentPath));
  }, [currentPath]);

  const menuItems = [
   
    {
      id: 'dashboard',
      icon: <img src="https://cdn-icons-png.flaticon.com/512/1828/1828673.png" alt="Dashboard" className="nav-icon-img" />,
      title: 'Dashboard',
      path: '/dashboard'
    },
    {
      id: 'patient-analysis',
      icon: <img src="https://cdn-icons-png.flaticon.com/512/2966/2966327.png" alt="Patient Analysis" className="nav-icon-img" />,
      title: 'Patient Analysis',
      path: '/patient-analysis'
    }
  ];

  return (
    <aside className={`sidebar ${isExpanded ? 'expanded' : 'collapsed'}`}>
      {/* <div className="sidebar-header">
      </div> */}

      <nav className="sidebar-nav">
        <ul className="nav-list">
          {menuItems.map((item) => (
            <li key={item.id} className="nav-item">
              <Link
                to={item.path}
                className={`nav-link ${activeItem === item.id ? 'active' : ''}`}
                onClick={() => setActiveItem(item.id)}
                title={!isExpanded ? item.title : ''}
              >
                <span className="nav-icon">{item.icon}</span>
                {isExpanded && <span className="nav-title">{item.title}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <button 
          className="sidebar-toggle footer-toggle"
          onClick={toggleSidebar}
        >
          <span className={`toggle-icon ${isExpanded ? 'expanded' : ''}`}>
            <img 
              src="https://cdn.ucraft.com/fs/user_files/15696/media/images/sketch-based-layouts-icon.webp" 
              alt="Toggle sidebar" 
              className="toggle-icon-img"
            />
          </span>
          {isExpanded && <span className="toggle-title">Collapse</span>}
        </button>
        
        <div className="footer-item">
          <span className="footer-icon">
            <img 
              src="https://cdn-icons-png.flaticon.com/512/1/1475.png" 
              alt="Settings" 
              className="footer-icon-img"
            />
          </span>
          {isExpanded && <span className="footer-title">Settings</span>}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
