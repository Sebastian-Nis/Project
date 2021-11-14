export function AmmoClass({ key, name, penetration, fragmentation, velocity}) {
  return (
    <table>
      <tbody>
        <tr>
          <th>Name</th>
          <th>Penetration class: </th>
          <th>Fragmentation (%): </th>
          <th>Velocity(m/s)</th>
        </tr>
        <tr>
          <td> {name} </td>
          <td> {penetration} </td>
          <td> {fragmentation} </td>
          <td> {velocity} </td>
        </tr>
      </tbody>
    </table>
  );
  }