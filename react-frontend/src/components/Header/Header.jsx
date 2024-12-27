import { NavLink, useNavigate } from 'react-router-dom';
import classes from './Header.module.css';

function Header() {
  const navigate = useNavigate();

  return (
    <>
      <header>
        <nav>
          <ul>
            <li>
              <NavLink
                to="/sign-in"
                className={({ isActive }) => (isActive ? classes.active : '')}
              >
                Sign In
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/sign-up"
                className={({ isActive }) => (isActive ? classes.active : '')}
              >
                Sign Up
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <button onClick={() => navigate('/dashboard')}>Go to Dashboard</button>
    </>
  );
}

export default Header;
