import { useEffect, useState } from 'react';
// import { AmmoClass } from './AmmoClass';
export function DamageChart() {
  const [ammo, setAmmo] = useState(null);
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
      .then((data) => {setAmmo(data)});

    },[])
    return (
      <div>
          <table>
            <thead>
              <tr>
                <th>Caliber Type</th>
                <th>Name</th>
                <th>Penetration</th>
                <th>Fragmentation</th>
                <th>Velocity</th>
                <th>Total Damage</th>
              </tr>
            </thead>
            <tbody>     
              {Array.isArray(ammo) &&
                ammo.map((amm) => (
                  <tr key={amm.id}>
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
            </tbody>
          </table>
      </div>
    );



}

