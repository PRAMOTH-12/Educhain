import React from 'react';
import { NavLink } from 'react-router-dom';
export default function Sidebar(){
  return (
    <aside className="sidebar">
      <h3>Employer</h3>
      <nav>
        <NavLink className="nav-link" to="/dashboard">Dashboard</NavLink>
        <NavLink className="nav-link" to="/request">Request Credential</NavLink>
        <NavLink className="nav-link" to="/verify">Verify Credential</NavLink>
        <NavLink className="nav-link" to="/history">History</NavLink>
        <NavLink className="nav-link" to="/profile">Profile</NavLink>
      </nav>
    </aside>
  );
}
