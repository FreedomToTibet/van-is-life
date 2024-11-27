import {Link, NavLink, useNavigate} from 'react-router-dom';
import loginIcon from '/avatar-icon.png';

const Header = () => {
  const navigate = useNavigate();

  const fakeLogOut = () => {
    localStorage.removeItem('loggedin');
    navigate('/');
  };

  return (
    <header>
      <Link className="site-logo" to="/">
        #VANISLIFE
      </Link>
      <nav>
        <NavLink to="/host" className={({isActive}) => (isActive ? 'active-link' : null)}>
          Host
        </NavLink>
        <NavLink
          to="/about"
          className={({isActive}) => (isActive ? 'active-link' : null)}
        >
          About
        </NavLink>
        <NavLink to="/vans" className={({isActive}) => (isActive ? 'active-link' : null)}>
          Vans
        </NavLink>
      </nav>
      <div className="header-right">
        {!localStorage.getItem('loggedin') && <Link to="login" className="login-link">
          <img src={loginIcon} className="login-icon" alt="Login" />
        </Link>}
        {localStorage.getItem('loggedin') && <button onClick={fakeLogOut} className="logout-button">
          Log Out
        </button>}
			</div>
    </header>
  );
};

export default Header;
