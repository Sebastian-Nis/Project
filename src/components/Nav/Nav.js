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
      <nav className="navbar">
          <Link to="/">
              HomePage
          </Link>
          <Link to="/profile">
              Profile
          </Link>
          <span className="navauth">
            <Link to="/login">
                Login
            </Link>
            <Link to="/register">
                Register
            </Link>
          </span>
      </nav>
//     <nav className={styles.nav}>
//       <Link to="/" className={styles.logo}>
//         My Awesome Site
//       </Link>
//       <ul className={styles['main-menu']}>
//         <li>
//           <NavLink exact to="/" activeClassName={styles.active}>
//             Home
//           </NavLink>
//         </li>
//         <li>
//           <NavLink to="/communication" activeClassName={styles.active}>
//             Communication
//           </NavLink>
//         </li>

//         <li>
//           <NavLink to="/albums" activeClassName={styles.active}>
//             Albums
//           </NavLink>
//         </li>

//         {!auth?.user && (
//           <>
//             <li className={styles['push-right']}>
//               <NavLink to="/login" activeClassName={styles.active}>
//                 Login
//               </NavLink>
//             </li>
//             <li>
//               <NavLink to="/register" activeClassName={styles.active}>
//                 Register
//               </NavLink>
//             </li>
//           </>
//         )}

//         {auth?.user && (
//           <>
//             <li>
//               <NavLink to="/todos" activeClassName={styles.active}>
//                 Todos
//               </NavLink>
//             </li>

//             <li className={styles['push-right']}>
//               Welcome,{' '}
//               <NavLink to="/profile" activeClassName={styles.active}>
//                 {auth.user.email}
//               </NavLink>
//             </li>
//             <li>
//               <a href="/" onClick={handleLogout}>
//                 Logout
//               </a>
//             </li>
//           </>
//         )}
//       </ul>
//     </nav>
  );
}