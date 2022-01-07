import { useEffect } from "react";

import "./favourList.scss";
import FavourListItem from "../favourListItem/FavourListItem";
// import axios from "axios";

const FavourList = ({ favour }) => {

  // console.log(favour)
  useEffect(() => {}, []);
  return (
    <div className="favourList">
      <div className="movieBox">
        {favour.map((item, i) => (
          <FavourListItem item={item} key={i} />
        ))}
      </div>
    </div>
  );
};

export default FavourList;
