import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const Test = () => {
  const [searchList, setSearchList] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const getSearch = async (searchValue) => {
    try {
      let res = await axios.post("/movies/like_movie_search/", {
        searchValue: searchValue,
      });
      console.log(res.data);
      setSearchList(res.data.searchMovie);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    // getSearch(searchValue);
  }, [searchValue]);

  console.log(searchValue);
  console.log(searchList);

  return (
    <div>
      <input type="text" onChange={(e) => setSearchValue(e.target.value)} />
      <button
        onClick={() => {
          getSearch(searchValue);
        }}
      >
        search
      </button>
    </div>
  );
};

export default Test;
