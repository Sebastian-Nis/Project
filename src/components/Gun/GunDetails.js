import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export function GunDetails() {
    const { id } = useParams();
    const [gun, setGun] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3001/guns?id=${id}`, {
        headers: {
            'Content-type': 'application/json',
        },
        })
        .then((res) => {return res.json();})
        .then((data) => {setGun(data[0])});
        
    },[id])

    return (
       <div>
        <p>{id}</p>
          <img src={gun?.image} alt="Gun no img"></img>
          <p>{gun?.name}</p>
          <p>{gun?.type}</p>
          <p>{gun?.caliber}</p>
        </div>
    );
  }