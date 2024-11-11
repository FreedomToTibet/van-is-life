import {Link, NavLink} from 'react-router-dom';
import loginIcon from '/avatar-icon.png';

const Header = () => {
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
      <Link to="login" className="login-link">
        <img src={loginIcon} className="login-icon" />
      </Link>
    </header>
  );
};

export default Header;
