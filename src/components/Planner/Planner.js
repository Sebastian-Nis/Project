import { useEffect, useState } from 'react';
import { GunCard } from '../Gun/GunCard';
import './Planner.css';

export function Planner() {
  const [guns, setGuns] = useState(null);
  const [type, setType] = useState("All")
  const [caliber, setCaliber] = useState("All")
  const [search, setSearch] = useState('');
  const [types, setTypes] = useState(null)
  const [calibers, setCalibers] = useState(null)

  function extractFilters(data){
    let gunTypes = []
    let gunCalibers = []
    let result = {}
    // console.log("res")
    console.log(data)
    
    for (const i in data){
      gunTypes.push(data[i].type)
      gunCalibers.push(data[i].caliber)
    }
    gunTypes = gunTypes.filter(onlyUnique)
    gunCalibers = gunCalibers.filter(onlyUnique)
    setTypes(gunTypes)
    setCalibers(gunCalibers)
  }

  useEffect(() => {
    fetch(`http://localhost:3001/guns`, {
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then((res) => {return res.json();})
      .then((data) => {setGuns(data); extractFilters(data)});
      
  },[])

  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  function changeCaliber(e) {
    let {name, value} = e.target
    setCaliber(value)
  }
  function changeType(e) {
    let {name, value} = e.target
    setType(value)
  }

  return(
    <>
      
      <select name="" onChange={changeType}>
        <option value="All">--All--</option>
        {Array.isArray(types) &&
          types.map(type =>
          <option value={type}>{type}</option>)
        }
      </select>
      <select name="" onChange={changeCaliber}>
      <option value="All">--All--</option>
        {Array.isArray(calibers) &&
          calibers.map(caliber =>
          <option value={caliber}>{caliber}</option>)
        }
      </select>
      <input value={search} onInput={e => setSearch(e.target.value)}/>
      <div className="cardlist">
        {Array.isArray(guns) &&
          guns.filter(function (gun) {
            // console.log(type)
            // console.log(gun)
            if (type === "All"){
              if (caliber === "All")
                return true;
              else
                return gun.caliber === caliber
            }
            if (caliber === "All")
              return gun.type === type
            return gun.type === type && gun.caliber === caliber
          }).filter(function (gun) {
            console.log(gun)
            console.log(search)
            return search==='' ? true : gun.name.toLowerCase().includes(search.toLowerCase())
          }).map((gun) => (
            <GunCard
              key={gun.id}
              gunId={gun.id}
              gunName={gun.name}
              gunIMG={gun.image}
              gunType={gun.type}
            />
          ))}
      </div>
    </>
  )
}