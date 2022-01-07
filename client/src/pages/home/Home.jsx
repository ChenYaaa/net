import Navbar from "../../components/navbar/Navbar";
import Featured from "../../components/featured/Featured";
import "./home.scss";
import List from "../../components/list/List";
import { useEffect, useState, useContext } from "react";
// import 'antd/dist/antd.css'
import { AuthContext } from "../../authContext/AuthContext";
import axios from "axios";

const Home = ({ type }) => {
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);
  const { user } = useContext(AuthContext);
  const [username, setUsername] = useState("");

  useEffect(() => {
    let mounted = true;
    if (user) {
      const user = JSON.parse(localStorage.getItem("user"));
      setUsername(user.username);
    } else {
      console.error();
    }

    const getRandomLists = async () => {
      try {
        const res = await axios.get(
          `lists${type ? "?type=" + type : ""}${genre ? "&genre=" + genre : ""}`
        );
        if (mounted) {
          setLists(res.data);
        }
        console.log(res.data[0]);
      } catch (err) {
        console.log(err);
      }
    };
    getRandomLists();
    return () => (mounted = false);
  }, [type, genre, user]);
  // console.log(username);
  console.log(lists);
  return (
    <div className="home">
      <Navbar />
      <Featured type={type} setGenre={setGenre} />
      {lists.length > 0 ? lists.map((list, el) => (
        <List list={list} key={el} username={username} />
      )) : ""}
    </div>
  );
};

export default Home;
