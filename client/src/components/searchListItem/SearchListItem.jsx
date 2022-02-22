import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./searchListItem.scss";

const SearchListItem = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="searchListItem">
      <div className="imgItem">
        <div
          className="img"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <img alt="complex" src={item.img} />
          {isHovered && (
            <>
              <Link
                to={{
                  pathname: `/video/${item._id}`,
                  movie: item,
                }}
              >
                <video src={item.trailer} autoPlay={true} loop muted />{" "}
              </Link>
            </>
          )}
        </div>

        <div className="imgDes">
          <h4>{item.title}</h4>
          <h4 className="episode">
            A total of {item.episode.length}{" "}
            {item.episode.length > 1 ? "episodes" : "episode"}
          </h4>
          {/* <h4>{item._id}</h4> 61bc4f523d93bb4aa03f5f85 */}
          <p>{item.desc}</p>
        </div>
      </div>
    </div>
  );
};

export default SearchListItem;
