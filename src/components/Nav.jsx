import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/gf-pika.webp'; 
import './Nav.css';

function Nav() {
  const location = useLocation();

  return (
    <nav>
      <img src={logo} alt="logo" />
      <div className="ligne"></div>
      <div className="navig">
        <ul>
          <li className={location.pathname === '/' ? 'active' : ''}>
            <Link to="/">Home</Link>
          </li>
          <li className={location.pathname === '/pokedex' ? 'active' : ''}>
            <Link to="/pokedex">Pokédex</Link>
          </li>
          <li className={location.pathname === '/search' ? 'active' : ''}>
            <Link to="/search">Search</Link>
          </li>
          <li className={location.pathname === '/quizz' ? 'active' : ''}>
            <Link to="/quizz">Quizz</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
