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
          document.body.style.overflow = 'hidden';
        } else {
          resetBodyStyles();
        }
        return newMenuOpen;
      });
    };
  
    const resetBodyStyles = () => {
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.overflow = 'auto';
    };

    const handleMenuItemClick = () => {
      if (menuOpen) {
        setMenuOpen(false);
        resetBodyStyles();
      }
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
          <NavLink to="/" onClick={handleMenuItemClick} className={({ isActive }) => (isActive ? styles.active : "")}>Home</NavLink>
        </li>
        {!user && (
          <>
            <li>
              <NavLink to="/login" onClick={handleMenuItemClick} className={({ isActive }) => (isActive ? styles.active : "")}>Entrar</NavLink>
            </li>
            <li>
              <NavLink to="/register" onClick={handleMenuItemClick} className={({ isActive }) => (isActive ? styles.active : "")}>Cadastrar</NavLink>
            </li>
          </>
        )}
        {user && (
          <>
            <li>
              <NavLink to="/posts/create" onClick={handleMenuItemClick} className={({ isActive }) => (isActive ? styles.active : "")}>Novo Post</NavLink>
            </li>
            <li>
              <NavLink to="/dashboard" onClick={handleMenuItemClick} className={({ isActive }) => (isActive ? styles.active : "")}>Gerenciar</NavLink>
            </li>
          </>
        )}
        <li>
          <NavLink to="/about" onClick={handleMenuItemClick} className={({ isActive }) => (isActive ? styles.active : "")}>Sobre</NavLink>
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