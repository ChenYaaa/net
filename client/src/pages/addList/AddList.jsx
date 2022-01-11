// import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import FavourList from "../../components/favourList/favourList";
import axios from "axios";
import { useEffect, useState } from "react";
// import { AuthContext } from "../../authContext/AuthContext";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteAllFavour } from "../../api/userFavour";
import "./addList.scss";

const AddList = ({ username }) => {
  const [favour, setFavour] = useState([]);
  // const [searchFavour, setSearchFavour] = useState([]);
  const [keyWord, setkeyWord] = useState("");

  useEffect(() => {
    const getAll = async (username) => {
      if (username === "") {
        return;
      }
      try {
        const res = await axios.get(`/users/favour/?username=${username}`, {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        setFavour(res.data[0].favour);
        // console.log(res.data[0].favour);
      } catch (err) {
        console.log(err);
      }
    };
    // let timer=setInterval(getAll(username),3000);
    getAll(username);
    // return ()=>clearInterval(timer)
  }, [username]);
  const handleDeleteAll = (e, username) => {
    e.preventDefault();
    deleteAllFavour(username);
  };

  let search = false;

  const keydownSearch = (e) => {
    if (e.keyCode === 13) {
      search = true;
      setFavour(
        favour.filter(function (product) {
          return Object.keys(product).some(function (key) {
            return String(product[key]).toLowerCase().indexOf(keyWord) > -1;
          });
        })
      );
    }
  };

  const handelSearch = (e) => {
    e.preventDefault();
    search = true;
    setFavour(
      favour.filter(function (product) {
        return Object.keys(product).some(function (key) {
          return String(product[key]).toLowerCase().indexOf(keyWord) > -1;
        });
      })
    );
  };
  console.log(username);
  console.log(favour);
  return (
    <div className="addList">
      {/* <Navbar /> kk*/}
      <Sidebar />
      <div className="container">
        <div className="left_container">
          {favour.length !== 0 ? (
            <>
              <h2>Collection of records</h2>
              <FavourList favour={favour} username={username} search={search} />
            </>
          ) : (
            <>
              <div className="noFavour">
                <p> You haven't added the video yet, go ahead and add it</p>
              </div>
            </>
          )}
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
            <DeleteIcon onClick={() => handleDeleteAll(username)} />
            <span>delete all the collections</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddList;
