import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

export function GunDetails() {
    const { id } = useParams();
    const [gun, setGun] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3001/gun?id=${id}`, {
        headers: {
            'Content-type': 'application/json',
        },
        })
        .then((res) => {
          if (res.ok){
            NotificationManager.success('Gun loaded', 'SUCCESS');
            return res.json();
          }else{
            throw new Error(res.status)
          }
         
        })
        .then((data) => {setGun(data[0])})
        .catch((error) => {
          NotificationManager.error('API call failed with status code:"'+error+'" !', 'ERROR', 5000);
        });
        
    },[id])

    return (
    <>
       <div>
          <img src={gun?.image} alt="Gun no img"></img>
          <p>{gun?.name}</p>
          <p>{gun?.type}</p>
          <p>{gun?.caliber}</p>
        </div>
        <NotificationContainer/>
      </>
    );
  }