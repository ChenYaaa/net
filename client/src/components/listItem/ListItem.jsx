import * as React from "react";
import "./listItem.scss";
import {
  PlayArrow,
  Add,
  ThumbUpAltOutlined,
  ThumbDownOutlined,
} from "@material-ui/icons";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../authContext/AuthContext";
// import { useContext } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ListItem({ index, item, username }) {
  const { user } = useContext(AuthContext);
  const [isHovered, setIsHovered] = useState(false);
  const [movie, setMovie] = useState({});
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // const [username, setUsername] = useState("");
  const postFavour = async () => {
    try {
      await axios.post(
        "/users/favour/post/" + username,
        {
          username: username,
          _id: movie._id,
          title:movie.title,
          imgTitle: movie.imgTitle,
          img: movie.img,
          trailer:movie.trailer,
          video: movie.video,
          desc: movie.desc,
        },
        {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        }
      );
      alert("sucess");
    } catch (err) {
      throw err;
    }
  };
  useEffect(() => {
    let mounted = true;
    const getMovie = async () => {
      try {
        const res = await axios.get("/movies/find/" + item);
        if (mounted) {
          setMovie(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getMovie();
    return () => (mounted = false);
  }, [item]);
  // console.log(movie);
  // console.log(username);

  return (
    <div
      className="listItem"
      style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src={movie?.imgSm} alt="" />
      {isHovered && (
        <>
          <Link to={{ pathname: "/watch", movie: movie }}>
            <video src={movie.trailer} autoPlay={true} loop muted/>{" "}
          </Link>
          <div className="itemInfo">
            <div className="icons">
              <Link className="play" to={{ pathname: "/watch", movie: movie }}>
                <PlayArrow className="icon" />
              </Link>
              {user ? (
                <>
                  <Add className="icon" onClick={postFavour} />                </>
              ) : (
                <>
                  <Add className="icon" onClick={handleOpen} />
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
                      <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                      >
                        No Sign ？
                      </Typography>
                      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        click here to
                        <Link to={{ pathname: "/login" }}>sign in</Link>
                        {/* <Link to={{ pathname: "/addList"}}>
                          点击登录
                        </Link> */}
                      </Typography>
                    </Box>
                  </Modal>
                </>
              )}

              <ThumbUpAltOutlined className="icon" />
              <ThumbDownOutlined className="icon" />
            </div>
            <div className="itemInfoTop">
              <span>{movie.duration}</span>
              <span className="limit">+{movie.limit}</span>
              <span>{movie.year}</span>
            </div>
            <div className="desc">{movie.title}</div>
            <div className="desc">{movie.desc}</div>
            <div className="genre">{movie.genre}</div>
          </div>
        </>
      )}
    </div>
  );
}
