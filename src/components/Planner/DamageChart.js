import { useEffect, useState } from 'react';
import './Ammo.css'
export function DamageChart() {
  const [ammo, setAmmo] = useState(null);
  function dmg (a,x){
    const f = parseInt(a.frag, 10)
    const p = parseInt(a.pen_class, 10)
    if (x===1) {                        /* Light Armor */
      if (a.pen_class<2 )
        {return(f+100)}
      else 
        if (a.pen_class===2 || a.pen_class===3)
          {return(p*10+f)}
        else
          {return(f+100)+p*10}
    } else 
      if (x===2) {
        if (p<2 )  /* Medium Armor */
          {return((f+100)/2)}
        else 
          if ((p===2) || (p===3))
            {return(f*10+p*10)}
          else
            {return((f*10)/5)}
    } else {                          /* Heavy Armor */
      if (p<2 )
        {return(p*10)}
      else 
        if (p===2 || p===3)
          {return(f+100)}
        else
        {return(f+100)}

    }
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
      <div className="container">
        
          <table className="containertable">
            <thead>
              <tr>
                <th>Caliber Type</th>
                <th>Name</th>
                <th>Penetration</th>
                <th>Fragmentation</th>
                <th>Velocity</th>
                <th>Damage (vs Light Armor)</th>
                <th>Damage (vs Medium Armor)</th>
                <th>Damage (vs Heavy Armor)</th>
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
                  <td>{Math.round(dmg(amm,1))}</td>
                  <td>{Math.round(dmg(amm,2))}</td>
                  <td>{Math.round(dmg(amm,3))}</td>
                  </tr>
                  )
                )
                }
            </tbody>
          </table>
      </div>
    );



}

