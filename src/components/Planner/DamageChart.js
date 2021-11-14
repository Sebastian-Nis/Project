import { useEffect, useState } from 'react';
import { AmmoClass } from './AmmoClass';
export function DamageChart() {
  const [ammo, setAmmo] = useState(null);
  const [calibers, setCalibers] = useState(null)
  const [caliber, setCaliber] = useState("All")

  function extractFilters(data){
    let gunCalibers = []
    let result = {}
    // console.log("res")
    // console.log(data)
    
    for (const i in data){
      gunCalibers.push(data[i].caliber)
    }
    gunCalibers = gunCalibers.filter(onlyUnique)
    setCalibers(gunCalibers)
  }
  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  useEffect(() => {
    fetch(`http://localhost:3001/ammo`, {
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then((res) => {return res.json();})
      .then((data) => {setAmmo(data); extractFilters(data)});

    },[])
    return (
      <div>
        {Array.isArray(calibers) &&
          calibers.map(caliber =>
          <table>
            <th>{caliber}</th>
            <tr>Name</tr>
            <tr>Penetration</tr>
            <tr>Fragmentation</tr>
            <tr>Velocity</tr>
            {Array.isArray(ammo) &&
              ammo.map((ammo) => (
                <>
                <td>{ammo.name}</td> 
                <td>{ammo.caliber}</td> 
                <td>{ammo.pen_class}</td> 
                <td>{ammo.frag}</td>
                <td>{ammo.speed}</td>
                </>
                )
              )
              }
          </table>
          )}
      </div>
    );



}

