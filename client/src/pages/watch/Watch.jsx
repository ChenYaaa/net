import { ArrowBackOutlined } from "@material-ui/icons";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../authContext/AuthContext";
import { useCallback, useEffect, useState, useContext } from "react";
import { postRecord } from "../../api/user";
import "./watch.scss";

export default function Watch() {
  const location = useLocation();
  const movie = location.movie;
  const [time, setTime] = useState(0);
  const [username, setUsername] = useState("");
  const { user } = useContext(AuthContext);

  let getTime = useCallback((target) => {
    target.addEventListener(
      "timeupdate",
      () => {
        setTime(target.currentTime);
      },
      false
    );
  }, []);

  useEffect(() => {
    if (user) {
      setUsername(user.username);
    } else {
      console.error();
    }
    let video = document.getElementById("video");
    getTime(video);
    // let play = true;
    // video.addEventListener('pause',handlePost(postData) );
  }, [getTime, user]);
  console.log(time);
  // let t = parseFloat(time);
  let postData = {
    username: username,
    _id: movie._id,
    watchTime: parseFloat(time),
    title: movie.title,
    imgTitle: movie.imgTitle,
    img: movie.img,
    trailer: movie.trailer,
    video: movie.video,
    desc: movie.desc,
  };
  const handlePost = (postData) => {
    postRecord(postData);
  };

  return (
    <div className="watch">
      <Link to="/">
        <div className="back">
          <ArrowBackOutlined />
          Home
        </div>
      </Link>
      <video
        id="video"
        poster={movie.img}
        className="video"
        progress="true"
        controls
        src={movie.video}
        autoPlay
      ></video>
      <button onClick={() => handlePost(postData)}>click</button>
    </div>
  );
}
