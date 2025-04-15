import { NavLink } from 'react-router-dom';

function Menu() {
  return (
    <nav className="menu">
      <NavLink
        to="/sets"
        className={({ isActive }) => (isActive ? 'active' : '')}
      >
        Zestawy (sets)
      </NavLink>
      <NavLink
        to="/parts"
        className={({ isActive }) => (isActive ? 'active' : '')}
      >
        Części (parts)
      </NavLink>
      <NavLink
        to="/help"
        className={({ isActive }) => (isActive ? 'active' : '')}
      >
        Pomoc (help)
      </NavLink>
    </nav>
  );
}

export default Menu;