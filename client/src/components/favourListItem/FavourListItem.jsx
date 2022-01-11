import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LinearProgress from "@mui/material/LinearProgress";
// import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import HighlightOffTwoToneIcon from "@mui/icons-material/HighlightOffTwoTone";
import { deleteFavour } from "../../api/userFavour";
import "./favourListItem.scss";

const FavourListItem = ({ item, username }) => {
  // console.log(item)
  const [isHovered, setIsHovered] = useState(false);
  const [date, setDate] = useState("");
  const [progress, setProgress] = useState(0);
  function rTime(date) {
    var json_date = new Date(date).toJSON();
    let newdate = new Date(new Date(json_date) + 8 * 3600 * 1000)
      .toISOString()
      .replace(/T/g, " ")
      .replace(/\.[\d]{3}Z/, "");
    setDate(newdate);
  }
  const handleDelete = (e,id, username) => {
    e.preventDefault();
    deleteFavour(id, username);
  };

  useEffect(() => {
    rTime(item.postTime);
    setProgress(100);
  }, [item.postTime]);
  return (
    <div className="favourListItem">
      <div className="imgItem">
        <div
          className="img"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <img alt="complex" src={item.img} />
          {isHovered && (
            <>
              <Link to={{ pathname: "/watch", movie: item }}>
                <video src={item.trailer} autoPlay={true} loop muted />{" "}
              </Link>
            </>
          )}
          <LinearProgress variant="determinate" value={progress} />
        </div>

        <div className="imgDes">
          <h4>{item.title}</h4>
          <h4>{item._id}</h4>
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

export default FavourListItem;
