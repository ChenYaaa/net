import React, {
  useEffect,
  // useRef,
  useState,
  useMemo,
  useCallback,
} from "react";
import { useLocation } from "react-router-dom";
import { postRecord } from "../../api/user";
import "./video.scss";

const Video = () => {
  const location = useLocation();
  const movie = location.movie;
  const username = location.username;
  // const player1 = useRef(null);
  const [episode, setEpisode] = useState([]);
  const [source, setSource] = useState(movie.video);
  const [duration, setDuration] = useState(0);
  const [time, setTime] = useState(0);
  const [ep, setEp] = useState(0);
  console.log(typeof movie.isSeries);

  const changeSource = (item, i, target) => {
    setSource(item);
    setEp(i + 1);
    target.load();
  };
  const chengStyle = () => {
    var ul = document.getElementById("ul");
    var arrImg = ul.getElementsByTagName("img");
    var svgPlay = ul.getElementsByClassName("svgPlay");
    for (let i = 0; i < arrImg.length; i++) {
      arrImg[0].className = "active";
      svgPlay[0].style.display = "block";
      arrImg[i].onclick = function () {
        for (let i = 0; i < arrImg.length; i++) {
          arrImg[i].className = "";
          svgPlay[i].style.display = "none";
        }
        this.className = "active";
        svgPlay[i].style.display = "block";
      };
    }
    // ul.onclick = function (e) {
    //   e = e || window.event;
    //   var target = e.target || e.srcElement;
    //   if (target.tagName.toLowerCase() === "img") {
    //     target.className = "active";
    //     // target.style.border = "1px solid red";
    //   }
    // };
  };
  const getTime = (target) => {
    target.addEventListener(
      "timeupdate",
      () => {
        setTime(target.currentTime);
      },
      false
    );
  };

  const handlePost = (postData) => {
    postRecord(postData);
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
      isSeries: movie.isSeries,
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
    movie.isSeries,
  ]);

  const Duration = useCallback(
    (target) => {
      try {
        if (movie.isSeries === false) {
          target.onloadedmetadata = function () {
            setDuration(target.duration);
          };
        } else {
          // setEp()
        }
      } catch (err) {
        console.log(err);
      }
    },
    [movie.isSeries]
  );

  console.log();
  // const Duration=function(){
  //   if(movie.isSeries==='false')
  // }

  // const setCurrentTime = (target) => {};
  useEffect(() => {
    let player = document.getElementById("player");
    setEpisode(movie.episode);
    // setCurrentTime(player1);
    Duration(player);
    chengStyle();
    getTime(player);

    if (player.paused) {
      handlePost(postData);
    }

    console.log(ep);
  }, [movie.episode, ep, Duration, duration, postData]);
  console.log(movie);
  return (
    <div className="video">
      <div className="mainLeft">
        <video
          id="player"
          // ref={player1}
          poster={movie.img}
          className="video"
          progress="true"
          controls
          src={source}
          autoPlay
        ></video>
      </div>
      <div className="mainRight">
        <ul className="imgList" id="ul">
          {/* <button onClick={() => handlePost(postData)}>postData</button> */}
          {episode.map((item, i) => (
            <li key={i}>
              <p className="episode">NO.{i + 1} episode</p>
              <div className="svgPlay">
                <svg
                  t="1642386843421"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="6980"
                  width="30"
                  height="30"
                >
                  <path
                    d="M332.8 21.504c-29.184 0-52.736 23.552-52.736 52.736v865.792c0 29.184 23.552 52.736 52.736 52.736s52.736-23.552 52.736-52.736V74.24C385.024 45.056 361.472 21.504 332.8 21.504zM633.856 336.384c-29.184 0-52.736 23.552-52.736 52.736v550.912c0 29.184 23.552 52.736 52.736 52.736s52.736-23.552 52.736-52.736V389.12c0-29.184-23.552-52.736-52.736-52.736zM962.56 126.464c-29.184 0-52.736 23.552-52.736 52.736v760.832c0 29.184 23.552 52.736 52.736 52.736s52.736-23.552 52.736-52.736V179.2c0-29.184-23.552-52.736-52.736-52.736zM58.88 599.04c-29.184 0-52.736 23.552-52.736 52.736v262.656c0 29.184 23.552 52.736 52.736 52.736s52.736-23.552 52.736-52.736v-262.656c0-29.184-23.552-52.736-52.736-52.736z"
                    p-id="6981"
                    fill="#ffffff"
                  ></path>
                </svg>
                <p>playing...</p>
              </div>

              <img
                src={movie.img}
                loading="lazy"
                alt=""
                onClick={() => {
                  changeSource(item, i);
                  setEp(i);
                }}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Video;
