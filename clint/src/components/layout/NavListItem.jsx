import { NavLink } from 'react-router-dom';

const NavListItem = ({ to, text }) => {
  return (
    <li className='nav-item'>
      <NavLink
        to={to}
        className={({ isActive }) => isActive ? 'active' : undefined}>
        {text}
      </NavLink>
    </li>
  );
};
export default NavListItem;