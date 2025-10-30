import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import './Sidebar.css';
export default function Sidebar({ open, setOpen }) {
  return (
    <>
      <motion.aside
        initial={false}
        animate={{ x: open ? 0 : -260 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="sidebar"
      >
        <div className="sidebar-top">
          <h2>💚 Finance</h2>
          <button className="close-btn" onClick={() => setOpen(false)}>✕</button>
        </div>

        <nav className="nav">
          <NavLink to="/" className={({isActive}) => "nav-item" + (isActive? " active":"")} onClick={()=>setOpen(false)}>AuthForm</NavLink>
          <NavLink to="/dashboard" className={({isActive}) => "nav-item" + (isActive? " active":"")} onClick={()=>setOpen(false)}>Dashboard</NavLink>
          <NavLink to="/income" className={({isActive}) => "nav-item" + (isActive? " active":"")} onClick={()=>setOpen(false)}>Income</NavLink>
          <NavLink to="/expenses" className={({isActive}) => "nav-item" + (isActive? " active":"")} onClick={()=>setOpen(false)}>Expenses</NavLink>
        </nav>

        <div className="sidebar-footer">
          <small>Dark Neon • v1</small>
        </div>
      </motion.aside>

      {/* overlay for small screens */}
      {open && <div className="overlay" onClick={() => setOpen(false)} />}
    </>
  );
}