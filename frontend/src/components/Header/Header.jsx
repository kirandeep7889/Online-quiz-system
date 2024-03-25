import { NavLink } from 'react-router-dom';
import "./Header.css"

const Header = () => {
  return (
    <div className="Header">
      <div className="Header-left">
        <img  alt="logo" src="https://cdn.iconscout.com/icon/premium/png-512-thumb/quiz-1428698-1209568.png?f=webp&w=256" width={"70px"} height={"70px"}/>
      </div>
      <div className="Header-center">
        <h2>QUIZ COMPETITION</h2>
      </div>
      <div className="Header-right">
        <ul>
          <li><NavLink exact to="/" activeClassName="active">Home</NavLink></li>
          <li><NavLink to="/signup" activeClassName="active">Signup</NavLink></li>
          <li><NavLink to="/login" activeClassName="active">Login</NavLink></li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
