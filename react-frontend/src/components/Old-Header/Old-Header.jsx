import { NavLink, useNavigate } from 'react-router-dom';

function OldHeader() {
  const navigate = useNavigate();

  return (
    <>
      <header>
        <nav>
          <ul>
            <li>
              <NavLink
                to="/sign-in"
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                Sign In
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/sign-up"
                className={({ isActive }) => (isActive ? 'active' : '')}
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

export default OldHeader;
