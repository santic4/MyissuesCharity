import { Link, useNavigate } from 'react-router-dom';
import '../styles/navbar.css';
import { useState } from 'react';

const Navbar = () => {  
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const nav = useNavigate();
  const [open, setOpen] = useState(false);

  const logout = () => { 
    localStorage.clear(); 
    nav('/');
  };

  const handleLinkClick = () => {
    setOpen(false);
  };

  return(
    <nav className="navbarContainer">
      <div className="navbarInner">
        <div className="navbarBrand">
          <Link to="/user" onClick={handleLinkClick} className="navbarLogo">
            <img src='./myissuescharity-logo-transparent.png' alt='MyissuesCharity' className='main-logo'></img>
          </Link>
        </div>
        <button className={`menuIcon ${open ? 'active' : ''}`} onClick={() => setOpen(!open)} aria-label="Toggle menu">
          <span />
          <span />
          <span />
        </button>
        <ul className={`navbarMenu ${open ? 'open' : ''}`}>              
          <li><Link to="/user" className="navbarLink" onClick={handleLinkClick}>Home</Link></li>
          {token && (
            <> 
              {role !== 'admin' && <li><Link className="navbarLink" to="/help" onClick={handleLinkClick}>Help</Link></li> }
              {role !== 'admin' && <li><Link className="navbarLink" to="/about-us" onClick={handleLinkClick}>About us</Link></li>}
              {role === 'admin' && <li><Link className="navbarLink" to="/admin" onClick={handleLinkClick}>Dashboard</Link></li>}
              <li><button className="buttonLogout" onClick={() => { logout(); handleLinkClick(); }}>Logout</button></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;