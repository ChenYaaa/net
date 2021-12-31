import React,{ useEffect,useContext } from "react";
import { useHistory } from "react-router-dom";
import "./topbar.css";
import { NotificationsNone, Language, Settings ,ArrowDropDown } from "@material-ui/icons";
import { AuthContext } from "../../context/authContext/AuthContext";
import {logout} from "../../context/authContext/AuthActions"
// import axios from "axios";

export default function Topbar() {
  const { dispatch } = useContext(AuthContext);
  const history = useHistory();
  useEffect(()=>{
    // const user=JSON.parse(localStorage.getItem("user"))
    // console.log(user)
  },[])
  const loginOut=()=>{
    dispatch(logout())
    history.push("/login");
  }
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">admin</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Settings />
          </div>
          <img src="https://pic1.zhimg.com/v2-f256406702414b2c8d8aa66f54643a6e_720w.jpg?so..." alt="" className="topAvatar" />
          <div className="profile">
            <ArrowDropDown className="icon" />
            <div className="options">
              <span>Settings</span>
              <span onClick={loginOut}>Logout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
