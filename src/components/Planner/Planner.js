import { useEffect, useState } from 'react';
import { GunCard } from '../Gun/GunCard';

export function Planner() {
  const [guns, setGuns] = useState(null);
  
  useEffect(() => {
    fetch(`http://localhost:3001/guns`, {
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then((res) => {return res.json();})
      .then((data) => {setGuns(data)});
      
  },[])

  useEffect(() => {
    console.log(guns)
  },[guns])

  return(
    <>
      {Array.isArray(guns) &&
        guns.map((gun) => (
          <GunCard
            key={gun.id}
            gunId={gun.id}
            gunName={gun.name}
            gunIMG={gun.image}
          />
        ))}
    </>
  )
}