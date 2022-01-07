// import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import FavourList from "../../components/favourList/favourList";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../authContext/AuthContext";
import "./addList.scss";

const AddList = () => {
  const [favour, setFavour] = useState([]);
  const [username, setUsername] = useState("chen");
  const { user } = useContext(AuthContext);
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
  useEffect(() => {
    if (user) {
      const user = JSON.parse(localStorage.getItem("user"));
      setUsername(user.username);
    } else {
      console.error();
    }
    getAll(username);
  }, [user, username]);

  console.log(username);
  console.log(favour);
  return (
    <div className="addList">
      {/* <Navbar /> */}
      <Sidebar />
      {favour.length !== 0 ? (
        <>
          <FavourList favour={favour} />
        </>
      ) : (
        <>
          <div className="noFavour">
            You haven't added the video yet, go ahead and add it
          </div>
        </>
      )}
    </div>
  );
};

export default AddList;
