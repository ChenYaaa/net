import React, { useState, useEffect } from "react";
import "./favourListItem.scss";

const FavourListItem = ({ item }) => {
  // console.log(item)
  const [date, setDate] = useState("");
  function rTime(date) {
    var json_date = new Date(date).toJSON();
    let newdate = new Date(new Date(json_date) + 8 * 3600 * 1000)
      .toISOString()
      .replace(/T/g, " ")
      .replace(/\.[\d]{3}Z/, "");
    setDate(newdate);
  }
  useEffect(() => {
    rTime(item.postTime);
  }, [item.postTime]);
  return (
    <div className="favourListItem">
      <div className="imgItem">
        <img alt="complex" src={item.img} />
        <div className="imgDes">
          <h4>{item.imgTitle}</h4>
          <p>{item.desc}</p>
          <p>add time：{date}</p>
        </div>
      </div>
    </div>
  );
};

export default FavourListItem;
