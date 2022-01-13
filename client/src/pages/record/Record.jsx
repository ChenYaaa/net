import React, { useEffect, useContext, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import RecordList from "../../components/recordList/RecordList";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import { AuthContext } from "../../authContext/AuthContext";
import "./record.scss";
import axios from "axios";

const Record = () => {
  const { user } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [record, setRecord] = useState([]);
  const [keyWord, setkeyWord] = useState("");
  const [search, setSearch] = useState(false);
  const [searchRecord, setSearchRecord] = useState([]);

  const getAllRecord = async (username) => {
    if (username === "") {
      return;
    }
    try {
      const res = await axios.get(
        `/users/allMovieRecord/?username=${username}`,
        {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        }
      );
      console.log(res.data[0].record);
      setRecord(res.data[0].record);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (user) {
      setUsername(user.username);
    } else {
      console.error();
    }
    getAllRecord(username);
  }, [user, username]);

  const keydownSearch = (e) => {
    if (e.keyCode === 13) {
      setSearch(true);
      setSearchRecord(
        record.filter(function (product) {
          return Object.keys(product).some(function (key) {
            return String(product[key]).toLowerCase().indexOf(keyWord) > -1;
          });
        })
      );
    }
  };

  const handelSearch = (e) => {
    e.preventDefault();
    setSearch(true);
    setSearchRecord(
      record.filter(function (product) {
        return Object.keys(product).some(function (key) {
          return String(product[key]).toLowerCase().indexOf(keyWord) > -1;
        });
      })
    );
  };

  return (
    <div className="record">
      <Sidebar />
      <div className="container">
        <div div className="left_container">
          <h2>history of watching</h2>
          <RecordList
            record={record}
            username={username}
            search={search}
            searchRecord={searchRecord}
          />
        </div>
        <div className="right_container">
          <div className="search_input">
            <TextField
              id="standard-basic"
              variant="standard"
              placeholder="search collection records....."
              value={keyWord}
              onKeyDown={keydownSearch}
              onChange={(e) => {
                setkeyWord(e.target.value);
              }}
            />
            <SearchIcon onClick={handelSearch} />
          </div>
          <div className="deleteAll">
            <DeleteIcon />
            <span>delete all the records</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Record;
