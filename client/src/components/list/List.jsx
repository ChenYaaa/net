import {
  ArrowBackIosOutlined,
  ArrowForwardIosOutlined,
} from "@material-ui/icons";
import {  useRef, useState,useEffect } from "react";
import ListItem from "../listItem/ListItem";
import "./list.scss";

export default function List({ list,username }) {
  const [isMoved, setIsMoved] = useState(false);
  const [slideNumber, setSlideNumber] = useState(0);
  // const [username, setUsername] = useState("");

  // const [clickLimit, setClickLimit] = useState(window.innerWidth / 230);
  const listRef = useRef();

  const handleClick = (direction) => {
    setIsMoved(true);
    // setClickLimit();
    let distance = listRef.current.getBoundingClientRect().x - 50;
    if (direction === "left" && slideNumber > 0) {
      setSlideNumber(slideNumber - 1);
      listRef.current.style.transform = `translateX(${230 + distance}px)`;
    }
    if (direction === "right" && slideNumber < 10 - (window.innerWidth / 230)) {
      setSlideNumber(slideNumber + 1);
      // setClickLimit(window.innerWidth / 230);
      listRef.current.style.transform = `translateX(${-230 + distance}px)`;
    }
  };

  useEffect(()=>{
    if(username){
      return true;
    }
    
  },[username])
  // console.log(username)
  // console.log(list)
  return (
    <div className="list">
      <span className="listTitle">{list.title}</span>
      <div className="wrapper">
        <ArrowBackIosOutlined
          className="sliderArrow left"
          onClick={() => handleClick("left")}
          style={{ display: !isMoved && "none" }}
        />
        <div className="container" ref={listRef}>
          {list.content.map((item, i) => (
            <ListItem index={i} item={item} key={i} username={username}/>
          ))}
        </div>
        <ArrowForwardIosOutlined
          className="sliderArrow right"
          onClick={() => handleClick("right")}
        />
      </div>
    </div>
  );
}
