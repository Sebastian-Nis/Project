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
      <nav>
        <Link to="/" >
          My Awesome Site
        </Link>
        <ul >
          <li>
            <NavLink exact to="/" >
              HomePage
            </NavLink>
          </li>
          <li>
            <NavLink to="/planner" >
              Character builder
            </NavLink>
          </li>

          {/* <li>
            <NavLink to="/albums" >
              Albums
            </NavLink>
          </li> */}

          {!auth?.user && (
            <>
              <li >
                <NavLink to="/login" >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink to="/register" >
                  Register
                </NavLink>
              </li>
            </>
          )}

          {auth?.user && (
            <>
              <li>
                <NavLink to="/profile" >
                  My profile
                </NavLink>
              </li>

              <li >
                Welcome,{' '}
                <NavLink to="/profile" >
                  {auth.user.email}
                </NavLink>
              </li>
              <li>
                <a href="/" onClick={handleLogout}>
                  Logout
                </a>
              </li>
            </>
          )}
        </ul>
      </nav>
  );
}