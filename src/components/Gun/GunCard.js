import { Link } from 'react-router-dom';
export function GunCard({ gunId,gunName,gunIMG}) {
    return (
        <Link to={`/gunDetails/${gunId}`}>
      <div>
          <img src={gunIMG} alt="Gun no img"></img>
          <p>{gunName}</p>
      </div>
      </Link>
    );
  }