import { ArrowBackOutlined } from "@material-ui/icons";
import { Link, useLocation } from "react-router-dom";
// import videojs from "video.js";
import { useRef, useEffect } from "react";
// import "video.js/dist/video-js.css";
import "./watch.scss";

export default function Watch() {
  const location = useLocation();
  const movie = location.movie;
  const video = useRef(null);
  useEffect(() => {
    
  });
let getTime=()=>{
 alert( video)
 console.log( video.current.currentTime)
}
  return (
    <div className="watch">
      <Link to="/">
        <div className="back">
          <ArrowBackOutlined />
          Home
        </div>
      </Link>
      <video
        ref={video}
        poster={movie.img}
        className="video"
        progress="true"
        controls
        src={movie.video}
      ></video>
      <button onClick={getTime}>click</button>
    </div>
  );
}
