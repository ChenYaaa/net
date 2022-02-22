import React from "react";
import "./searchList.scss";
import SearchListItem from "../searchListItem/SearchListItem";

const SearchList = ({ searchList }) => {
  return (
    <div className="searchList">
      <div className="movieBox">
        {searchList.map((item, i) => (
          <SearchListItem item={item} key={i} />
        ))}
      </div>
    </div>
  );
};

export default SearchList;
