import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LinearProgress from "@mui/material/LinearProgress";
import HighlightOffTwoToneIcon from "@mui/icons-material/HighlightOffTwoTone";
import "./recordListItem.scss";
import { deleteRecord } from "../../api/user";
// import axios from "axios";

const RecordListItem = ({ item, username }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);
  const [date, setDate] = useState("");
  function rTime(date) {
    var json_date = new Date(date).toJSON();
    let newdate = new Date(new Date(json_date) + 8 * 3600 * 1000)
      .toISOString()
      .replace(/T/g, " ")
      .replace(/\.[\d]{3}Z/, "");
    setDate(newdate);
  }
  const handleDelete = (id, username) => {
    // e.preventDefault();
    deleteRecord(id, username);
  };

  useEffect(() => {
    rTime(item.postTime);
    setProgress(
      Math.round((Math.round(item.watchTime) * 100) / Math.round(item.duration))
    );
  }, [item.postTime, username, item._id, item.watchTime, item.duration]);

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
              <Link to={{ pathname: `/video/${item._id}`, movie: item }}>
                <video src={item.trailer} autoPlay={true} loop muted />
              </Link>
            </>
          )}
          {progress === 0 ? (
            <>
              <LinearProgress
                variant="determinate"
                value={progress}
                style={{ display: "none" }}
              />
            </>
          ) : (
            <>
              <LinearProgress variant="determinate" value={progress} />
            </>
          )}
        </div>

        <div className="imgDes">
          <h4>{item.title}</h4>
          <h4 className="episode">
            A total of {item.episode.length}{" "}
            {item.episode.length > 1 ? "episodes" : "episode"}
          </h4>
          {/* <h4>{item._id}</h4> */}
          <p>{item.desc}</p>
          <p>add time：{date}</p>
        </div>
        <HighlightOffTwoToneIcon
          onClick={() => handleDelete(item._id, username)}
        />
      </div>
    </div>
  );
};

export default RecordListItem;
