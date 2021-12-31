import { CalendarToday, MailOutline, Publish } from "@material-ui/icons";
import { useContext, useState, useEffect,useCallback,useRef } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import "./user.css";
import { UserContext } from "../../context/userContext/UserContext";
import { updateUser } from "../../context/userContext/apiCalls";
import axios from "axios";

export default function User() {
  const location = useLocation();
  const user = location.user;
  // console.log(user);
  const history = useHistory();
  const id = location.pathname.split("/")[2];
  const [newUser, setUser] = useState(user);

  const { dispatch } = useContext(UserContext);

  useEffect(() => {
    const getUser = async () => {
      const res = await axios.get("/users/find/" + id);
      console.log(res.data);
      setUser(res.data);
    };
    getUser();
  }, [id]);

  function useDebounce(fn, delay, dep = []) {
    const { current } = useRef({ fn, timer: null });
    useEffect(function () {
      current.fn = fn;
    }, [fn]);
  
    return useCallback(function f(...args) {
      if (current.timer) {
        clearTimeout(current.timer);
      }
      current.timer = setTimeout(() => {
        current.fn(...args);
      }, delay);
    }, dep)
  }
  const handleChange=useDebounce(function(e){
    const value = e.target.value;
    setUser({ ...newUser, [e.target.name]: value });
  },1000)


  const handleUpdate = (e) => {
    e.preventDefault();
    updateUser(newUser, dispatch);
    history.push("/user/" + newUser._id);
  };
  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
        <Link to="/newUser">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src="http://localhost:8800/images/pexels-photo-1152994.jpeg"
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{newUser.username}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">createdAt</span>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">{newUser.createdAt}</span>
            </div>
            <span className="userShowTitle">Email</span>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{newUser.email}</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Username</label>
                <input
                  type="text"
                  placeholder={newUser.username}
                  className="userUpdateInput"
                  name="username"
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  placeholder={newUser.email}
                  className="userUpdateInput"
                  name="email"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  src="http://localhost:8800/images/pexels-photo-1152994.jpeg"
                  alt=""
                />
                <label htmlFor="file">
                  <Publish className="userUpdateIcon" />
                </label>
                <input type="file" id="file" style={{ display: "none" }} />
              </div>
              <button className="userUpdateButton" onClick={handleUpdate}>
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
