import { Link, useNavigate } from 'react-router-dom';
import '../styles/navbar.css';

const Navbar = () => {  
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const nav = useNavigate();

  const logout = () => { localStorage.clear(); nav('/'); };
    return(
        <nav className="navbarContainer">
            <input type="checkbox" id="menuToggle" className="menuToggle" />
            <label htmlFor="menuToggle" className="menuIcon">&#9776;</label>
            
            <ul className="navbarMenu">
                <Link to="/user" className="navbarLink">Home</Link>
                {token && (
                  <> 
                    {role !== 'admin' && <Link className="navbarLink" to="/help">Help</Link> }
                    {role !== 'admin' && <Link className="navbarLink" to="/about-us">About us</Link>}
                    {role === 'admin' && <Link className="navbarLink" to="/admin">Dashboard</Link>}
                    <button className="buttonLogout" onClick={logout}>Logout</button>
                  </>
                )}
            </ul>
        </nav>
    )
}

export default Navbar