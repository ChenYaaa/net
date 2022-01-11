import { useEffect } from "react";

import "./favourList.scss";
import FavourListItem from "../favourListItem/FavourListItem";
// import axios from "axios";

const FavourList = ({ username, favour, search }) => {
  console.log(username);
  useEffect(() => {}, []);
  return (
    <div className="favourList">
      {search === true ? (
        <>
          <div className="movieBox">
            {favour.map((item, i) => (
              <FavourListItem item={item} key={i} username={username} />
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="movieBox">
            {favour.map((item, i) => (
              <FavourListItem item={item} key={i} username={username} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default FavourList;
