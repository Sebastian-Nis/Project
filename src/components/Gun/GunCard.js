import { Link } from 'react-router-dom';
import './GunCard.css';
export function GunCard({ gunId,gunName,gunIMG,gunType}) {
    return (
      <div className="card">
        <Link to={`/gunDetails/${gunId}`}>
        { (gunType==="pistol" || gunType==="revolver" || gunType==="submachine gun") &&
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
        </Link>
      </div>
    );
  }