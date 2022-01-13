import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LinearProgress from "@mui/material/LinearProgress";
import HighlightOffTwoToneIcon from "@mui/icons-material/HighlightOffTwoTone";
import "./recordListItem.scss";
import axios from "axios";

const RecordListItem = ({ item, username }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);
  const [date, setDate] = useState("");
  const [arr, setArr] = useState([]);
  const [watchTime, setWatchTime] = useState([]);
  function rTime(date) {
    var json_date = new Date(date).toJSON();
    let newdate = new Date(new Date(json_date) + 8 * 3600 * 1000)
      .toISOString()
      .replace(/T/g, " ")
      .replace(/\.[\d]{3}Z/, "");
    setDate(newdate);
  }

  const getRecord = async (username, id) => {
    if (username === "") {
      return;
    }
    try {
      const res = await axios.get(
        `/users/movieRecord/?username=${username}&_id=${id}`,
        {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        }
      );
      // let arr=res.data[0].record;
      setArr(res.data[0].record);
      console.log(res.data[0].record);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    rTime(item.postTime);
    getRecord(username, item._id);
    setProgress(100);
  }, [item.postTime, username, item._id]);

  return (
    <div className="recordListItem">
      <div className="imgItem">
        <div
          className="img"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <img alt="complex" src={item.img} />
          {isHovered && (
            <>
              <Link to={{ pathname: `/watch/${item._id}`, movie: item }}>
                <video src={item.trailer} autoPlay={true} loop muted />
              </Link>
            </>
          )}
          <LinearProgress variant="determinate" value={progress} />
        </div>

        <div className="imgDes">
          <h4>{item.title}</h4>
          {/* <h4>{item._id}</h4> */}
          <p>{item.desc}</p>
          <p>add time：{date}</p>
        </div>
        <HighlightOffTwoToneIcon />
      </div>
    </div>
  );
};

export default RecordListItem;
