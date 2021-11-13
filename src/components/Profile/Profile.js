import { useEffect, useState } from 'react';
import { useAuth } from '../Auth/Auth.context';

export function Profile() {
  const [users_details, setUsers_details] = useState(null);
  const { auth, logout } = useAuth();
  
  useEffect(() => {
    console.log("here")
    console.log(auth?.user.id)
    fetch(`http://localhost:3001/usersDetails?userId=${auth?.user.id}`, {
      headers: {
        Authorization: `Bearer ${auth?.accessToken}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          if (res.status === 401) {
            logout();
            throw new Error('Token expired!');
          }
          throw new Error(
            'Fetching data failed with status code: ',
            res.status
          );
        }

        return res.json();
      })
      .then((data) => {setUsers_details(data[0])});
      
  }, [auth, logout]);

  useEffect(() => {
    console.log(users_details)
}, [users_details]);

    return (
      <>
        <p>My profile</p>
        <div className="userprofile">
          <p>User Type: {auth?.user.type}</p>
          <p>Character Name: {users_details?.nickname}</p>
          <p>Level:{users_details?.level} </p>
          <p>Location: {users_details?.location}</p>
          <ul>
            <li>Main gun: {users_details?.guns[0]}</li>
            <li>Side gun: {users_details?.guns[1]}</li>
          </ul>
        </div>
      </>
    );
  }