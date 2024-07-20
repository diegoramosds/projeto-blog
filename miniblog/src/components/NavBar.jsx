import styles from "./NavBar.module.css"

import { NavLink } from "react-router-dom"

import { useAuthentication } from "../hooks/useAuthentication";

import { useAuthValue } from "../context/AuthContext";

import { FaBars, FaTimes } from 'react-icons/fa';
import { useEffect, useState } from "react";

const NavBar = () => {
  const { user } = useAuthValue();
  const {logout} = useAuthentication();
  const [menuOpen, setMenuOpen] = useState(false);


  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const closeMenu = () => {
    setMenuOpen(false);
    document.body.style.overflow = 'auto'; // Restaurar rolagem
  };

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'; // Remover rolagem
    } else {
      document.body.style.overflow = 'auto'; // Restaurar rolagem
    }
  }, [menuOpen]);

    

  return (
    <nav className={styles.navbar}>
    <NavLink to="/" className={styles.brand}>
      Mini <span>Blog</span>
    </NavLink>
    
    <div className={styles.hamburger} onClick={toggleMenu}>
      {menuOpen ? <FaTimes /> : <FaBars />}
    </div>
    <div className={`${styles.overlay} ${menuOpen ? styles.open  : ''}`} onClick={closeMenu}>
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
    </div>
  </nav>
  )
}
export default NavBar;