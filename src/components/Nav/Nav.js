import { Link, NavLink, useHistory } from 'react-router-dom';
import { useAuth } from '../Auth/Auth.context';
import './Nav.css';

export function Nav() {
  const { auth, logout } = useAuth();

  const history = useHistory();

  function handleLogout(e) {
    e.preventDefault();
    logout();
    history.push('/login');
  }

  return (
//       <nav className="navbar">
//           <Link to="/">
//               HomePage
//           </Link>
//           <Link to="/profile">
//               Profile
//           </Link>
//           <Link to="/planner">
//               Character Builder
//           </Link>
//           {!auth?.user && (
//             <>
//               <li className={styles['push-right']}>
//                 <NavLink to="/login" >
//                   Login
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink to="/register" >
//                   Register
//                 </NavLink>
//               </li>
//             </>
// //         )}
//       </nav>
      <nav className="navbar">
        <img className="rifle" src="https://images.gamebanana.com/img/ico/ModCategory/m4a1.png" alt="M4A1 icon"/>
        <Link to="/" className="homebtn">
          Guns for hire
        </Link>
        <img className="ak" src="https://images.gamebanana.com/img/ico/ModCategory/55df458b63dce.png" alt="Rifles icon"/>
        <Link to="/planner" className="navlink">
          Character builder
        </Link>
        <Link to="/damagechart" >
          Damage chart
        </Link>
        <Link  to="/leaderboard" className="navlink" >
          Leaderboard
        </Link>
          {!auth?.user && (
            <div className="dropdown">
              <div className="">
                <li>
                    <NavLink to="/login" >
                      Login
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/register" >
                      Register
                    </NavLink>
                </li>
              </div>
            </div>
          )}

          {auth?.user && (
            <>
                <NavLink to="/profile" className="navlink" >
                  My profile
                </NavLink>
                <a href="/" onClick={handleLogout}>
                  Logout
                </a>
            </>
          )}
      </nav>
  );
}