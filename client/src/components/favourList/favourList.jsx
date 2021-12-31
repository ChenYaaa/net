import { useState, useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import "./favourList.scss";
import FavourListItem from "../favourListItem/FavourListItem";
// import axios from "axios";

const FavourList = ({ favour }) => {
  const [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };
  
  useEffect(() => {
  }, []);
  return (
    <div className="favourList">
      <div className="movieBox">
        {favour.map((item, i) => (
          <FavourListItem item={item} key={i} />
        ))}
      </div>
      <Stack spacing={2}>
        <Pagination
          count={10}
          page={page}
          color="secondary"
          onChange={handleChange}
        />
      </Stack>
    </div>
  );
};

export default FavourList;
