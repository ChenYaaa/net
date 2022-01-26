import { ArrowBackOutlined } from "@material-ui/icons";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../authContext/AuthContext";
import { useEffect, useState, useContext, useMemo } from "react";
import { postRecord } from "../../api/user";
import "./watch.scss";

export default function Watch() {
  const location = useLocation();
  const movie = location.movie;
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [username, setUsername] = useState("");
  const { user } = useContext(AuthContext);

  const getTime = (target) => {
    target.addEventListener(
      "timeupdate",
      () => {
        setTime(target.currentTime);
      },
      false
    );
  };

  const getDuration = (target) => {
    setDuration(target.duration);
  };

  const postData = useMemo(() => {
    const data = {
      username: username,
      _id: movie._id,
      watchTime: parseFloat(time),
      title: movie.title,
      imgTitle: movie.imgTitle,
      img: movie.img,
      trailer: movie.trailer,
      video: movie.video,
      episode: movie.episode,
      desc: movie.desc,
      duration: parseFloat(duration),
    };
    return data;
  }, [
    username,
    movie._id,
    time,
    movie.title,
    movie.imgTitle,
    movie.img,
    movie.trailer,
    movie.video,
    movie.desc,
    duration,
    movie.episode,
  ]);
  const handlePost = (postData) => {
    postRecord(postData);
  };

  useEffect(() => {
    if (user) {
      setUsername(user.username);
    } else {
      console.error();
    }
    let video = document.getElementById("video");
    // video.currentTime = movie.watchTime;
    // video.currentTime = movie.watchTime;
    getTime(video);
    if (video.paused) {
      handlePost(postData);
    }
    // video.addEventListener("loadedmetadata", function () {
    //   if (movie.watchTime) {
    //     video.currentTime = movie.watchTime;
    //   }
    // });
    getDuration(video);
  }, [user, postData, movie.watchTime]);
  console.log(time);
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
      {/* <div className="kk">kkkkkkk</div> */}
      {/* <button onClick={() => handlePost(postData)}>click</button> */}
    </div>
  );
}
