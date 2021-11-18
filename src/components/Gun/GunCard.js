import { Link } from 'react-router-dom';
import './GunCard.css';
export function GunCard({ gunId,gunName,gunIMG,gunType}) {
    return (
      <div className="card">
        {/* <Link to={`/gunDetails/${gunId}`}> */}
        {(gunName==="MAC10") &&    
        <img className="mac10" src={gunIMG} alt="Gun no img"></img>}
        { (gunType==="pistol" || gunType==="revolver" || gunType==="submachine gun" && gunName!=="MAC10") &&
          <img className="cardimgsmall" src={gunIMG} alt="Gun no img"></img>
        }
        { (gunType!=="pistol" && gunType!=="revolver" && gunType!=="submachine gun") && 
          <img className="cardimg" src={gunIMG} alt="Gun no img"></img>
        }
        <table className="info">
          <tr>
            <th>{gunName}</th>
          </tr>
          <tr>{gunType}</tr>
        </table>
        {/* </Link> */}
      </div>
    );
  }