import Navbar from "../../components/navbar/Navbar";
import SearchList from "../../components/searchList/SearchList";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import "./search.scss";
import Link from "@mui/material/Link";
import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Search = () => {
  const [isUp, setIsUp] = useState(true);
  const [searchList, setSearchList] = useState([]);
  const filterBox = useRef();
  const location = useLocation();
  const value = location.value;

  // console.log(value);

  const getSearchResult = async () => {
    try {
      const res = await axios.post("/movies/like_movie_search/", {
        searchValue: value,
      });
      console.log(res.data.searchMovie);
      setSearchList(res.data.searchMovie);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getSearchResult();
  });
  // console.log(searchList);

  const IsUp = function (isUp) {
    if (isUp === false) {
      setIsUp(true);
      filterBox.current.style.display = "none";
    } else {
      setIsUp(false);
      filterBox.current.style.display = "block";
    }
  };

  return (
    <div className="searchDiv">
      <Navbar />
      <div className="container">
        <div className="container_left">
          <div className="left-l">
            <div className="navBox">
              <Link href="#" underline="none">
                {"Relevance "}
              </Link>
              <Link
                href="#"
                underline="none"
                onClick={() => {
                  IsUp(isUp);
                }}
              >
                {"filter"}
                <span>
                  {isUp === true ? (
                    <>
                      <KeyboardArrowUpIcon className="icon" />
                    </>
                  ) : (
                    <>
                      <KeyboardArrowDownIcon />
                    </>
                  )}
                </span>
              </Link>
            </div>
            <div
              className="filterBox"
              style={{ display: "none" }}
              ref={filterBox}
            >
              <ul>
                <span>channel:</span>
                <li>
                  <Link href="#" underline="none">
                    {"series "}
                  </Link>
                </li>
                <li>
                  <Link href="#" underline="none">
                    {"movies "}
                  </Link>
                </li>
              </ul>
              <ul>
                <span>duration:</span>
                <li>
                  <Link href="#" underline="none">
                    {"0-10 "}
                  </Link>
                </li>
                <li>
                  <Link href="#" underline="none">
                    {"10-30 "}
                  </Link>
                </li>
                <li>
                  <Link href="#" underline="none">
                    {"30-60 "}
                  </Link>
                </li>
              </ul>
              <ul>
                <span>publish Date:</span>
                <li>
                  <Link href="#" underline="none">
                    {"2022 "}
                  </Link>
                </li>
                <li>
                  <Link href="#" underline="none">
                    {"2019 "}
                  </Link>
                </li>
                <li>
                  <Link href="#" underline="none">
                    {"2000-2018 "}
                  </Link>
                </li>
              </ul>
            </div>
            <SearchList searchList={searchList} />
          </div>
          <div className="right-r"></div>
        </div>
      </div>
    </div>
  );
};

export default Search;
