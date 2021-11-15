import { useEffect, useState } from 'react';
import React from 'react';
export function Leaderboard() {
    const [users, setUsers] = useState(null);

    const useSortableData = (items, config = null) => {
        
        const [sortConfig, setSortConfig] = React.useState(config);
        
        const sortedItems = React.useMemo(() => {
            if (items){
          let sortableItems = [...items];
          if (sortConfig !== null) {
            sortableItems.sort((a, b) => {
              if (a[sortConfig.key] < b[sortConfig.key]) {
                return sortConfig.direction === 'ascending' ? -1 : 1;
              }
              if (a[sortConfig.key] > b[sortConfig.key]) {
                return sortConfig.direction === 'ascending' ? 1 : -1;
              }
              return 0;
            });
          }
          return sortableItems;
        }
        }, [items, sortConfig]);
      
        const requestSort = key => {
          let direction = 'ascending';
          if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
          }
          setSortConfig({ key, direction });
        }
      
        return { items: sortedItems, requestSort };
      }

    const { items, requestSort, sortConfig } = useSortableData(users);
  
    useEffect(() => {
        console.log(items)
    },[items])

    const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

    useEffect(() => {
      fetch(`http://localhost:3001/userDetails`, {
        headers: {
          'Content-type': 'application/json'
        },
      })
        .then((res) => {return res.json();})
        .then((data) => {setUsers(data)});
    },[])

    
    
    return(
      <>
        <div>
          <table>
            <thead>
              <tr>
                <th>
                  <button type="button" onClick={() => requestSort('nickname')} className={getClassNamesFor('nickname')}>
                    Character Name
                  </button>
                </th>
                <th>
                  <button type="button" onClick={() => requestSort('level')} className={getClassNamesFor('level')}>
                    Level
                  </button>
                </th>
                <th>
                  <button type="button" onClick={() => requestSort('location')} className={getClassNamesFor('location')}>
                      Location
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
            {Array.isArray(items) &&
            items.map((user) => (
              <tr key={user.id}>
                <td>{user.nickname}</td> 
                <td>{user.level}</td> 
                <td>{user.location}</td>
              </tr>
            ))} 
            </tbody>
          </table>
        </div>
      </>
    ) 
}