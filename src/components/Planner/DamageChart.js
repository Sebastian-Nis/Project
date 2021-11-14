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

  function pen (c){
    if (c === '7')
    return 1
    else
    return 0
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
          <table>
            <th>Caliber Type</th>
            <th>Name</th>
            <th>Penetration</th>
            <th>Fragmentation</th>
            <th>Velocity</th>
            <th>Total Damage</th>
            {Array.isArray(ammo) &&
              ammo.map((amm) => (
                <tr>
                <td>{amm.caliber}</td> 
                <td>{amm.name}</td> 
                <td>{amm.pen_class}</td> 
                <td>{amm.frag}</td>
                <td>{amm.speed}</td>
                <td>{(amm.speed *0.5 + amm.frag*0.3) * (pen(amm.pen_class))}</td>
                </tr>
                )
              )
              }
          </table>
      </div>
    );



}

