import styles from "./NavBar.module.css"

import { NavLink } from "react-router-dom"

import { useAuthentication } from "../hooks/useAuthentication";

import { useAuthValue } from "../context/AuthContext";

import { FaBars, FaTimes } from 'react-icons/fa';
import { useState } from "react";

const NavBar = () => {
  const { user } = useAuthValue();
  const {logout} = useAuthentication();
  const [menuOpen, setMenuOpen] = useState(false);


  
  const toggleMenu = () => {
    setMenuOpen(prevMenuOpen => {
      const newMenuOpen = !prevMenuOpen;
      if (newMenuOpen) {
          document.body.style.position = 'fixed';
          document.body.style.width = '100%';
      } else {
          document.body.style.position = '';
          document.body.style.width = '';
      }
      return newMenuOpen;
  });
  };
  

  return (
    <nav className={styles.navbar}>
      <NavLink to="/" className={styles.brand}>
        Mini <span>Blog</span>
      </NavLink>
      {menuOpen && <div className={`${styles.overlay} ${menuOpen ? styles.open : ''}`} onClick={toggleMenu}></div>}
      <div className={styles.hamburger} onClick={toggleMenu}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>
      <ul className={`${styles.links_list} ${menuOpen ? styles.open : ''}`}>
        <li>
          <NavLink to="/" onClick={toggleMenu} className={({ isActive }) => (isActive ? styles.active : "")}>Home</NavLink>
        </li>
        {!user && (
          <>
            <li>
              <NavLink to="/login" onClick={toggleMenu} className={({ isActive }) => (isActive ? styles.active : "")}>Entrar</NavLink>
            </li>
            <li>
              <NavLink to="/register" onClick={toggleMenu} className={({ isActive }) => (isActive ? styles.active : "")}>Cadastrar</NavLink>
            </li>
          </>
        )}
        {user && (
          <>
            <li>
              <NavLink to="/posts/create" onClick={toggleMenu} className={({ isActive }) => (isActive ? styles.active : "")}>Novo Post</NavLink>
            </li>
            <li>
              <NavLink to="/dashboard" onClick={toggleMenu} className={({ isActive }) => (isActive ? styles.active : "")}>Dashboard</NavLink>
            </li>
          </>
        )}
        <li>
          <NavLink to="/about" onClick={toggleMenu} className={({ isActive }) => (isActive ? styles.active : "")}>Sobre</NavLink>
        </li>
        {user && (
          <li>
            <button onClick={logout}>Sair</button>
          </li>
        )}
      </ul>
    </nav>
  )
}
export default NavBar;