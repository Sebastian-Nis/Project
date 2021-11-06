import { Link, NavLink, useHistory } from 'react-router-dom';
import { useAuth } from '../Auth/Auth.context';
// import styles from './Nav.module.css';

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
        <Link exact to="/" >
          HomePage
        </Link>
        <Link to="/planner" >
          Character builder
        </Link>
          {!auth?.user && (
            <>
                <NavLink to="/login" >
                  Login
                </NavLink>
                <NavLink to="/register" >
                  Register
                </NavLink>
            </>
          )}

          {auth?.user && (
            <>
                <NavLink to="/profile" >
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