import './Home.css'
export function Home() {

  return (
    <>
    <div className="wholepage">
      <div className="grid-container">        
        {/* <img className="image topimg" src="https://wallpapercave.com/wp/wp3372267.jpg" alt="war" /> */}
        {/* <p className="banner" >Join private militias around the world, fight alongside and against grizzled veterans in your quest for money and glory. Partake in revolts and "holy" wars. Gather enough accomplishments and you may even leave your mark in the history books.</p> */}
        <img className="image" className="poster" src="./Images/War/wp9393529.jpg" alt="" srcSet="" />
        <div className="infodown">
          <p>Join many battlefronts worldwide for money and glory</p>
          <p>Open beta v1.4</p>
          <button>Play</button>
        </div>
      </div>
    </div>
    </>
  );
}