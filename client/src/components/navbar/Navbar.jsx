import { ArrowDropDown, Notifications, Search } from "@material-ui/icons";
import * as React from "react";
import { useContext, useState } from "react";
import "./navbar.scss";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Link } from "react-router-dom";
import { AuthContext } from "../../authContext/AuthContext";
import { logout } from "../../authContext/AuthActions";
import imageUrl from "../../images/logo2.png";

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

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const [isScrolled, setIsScrolled] = useState(false);
  const { dispatch } = useContext(AuthContext);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  let mounted = true;

  window.onscroll = () => {
    if (mounted) {
      setIsScrolled(window.pageYOffset === 0 ? false : true);
    }
    // return () => (window.onscroll = null);
    return () => {
      mounted = false;
      window.onscroll = null;
    };
  };
  return (
    <div className={isScrolled ? "navbar scrolled" : "navbar"}>
      <div className="container">
        <div className="left">
          <img
            className="imgLogo"
            // src={require('../../images/logo2.png')}
            src={imageUrl}
            alt=""
          />
          <Link to="/" className="link">
            <span>Homepage</span>
          </Link>
          <Link to="/series" className="link">
            <span className="navbarmainLinks">Series</span>
          </Link>
          <Link to="/movies" className="link">
            <span className="navbarmainLinks">Movies</span>
          </Link>
          <span>New and Popular</span>
          <Link to="/addList" className="link">
            <span>My List</span>
          </Link>
        </div>
        <div className="right">
          <Search className="icon" />
          <span>KID</span>
          <Notifications className="icon" />
          <img
            src="https://images.pexels.com/photos/6899260/pexels-photo-6899260.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
          />
          <div className="profile">
            <ArrowDropDown className="icon" />
            <div className="options">
              <span>Settings</span>
              <span onClick={() => dispatch(logout())}>Logout</span>
            </div>
          </div>
          {user ? (
            <>
              <Link
                className="play"
                to={{ pathname: "/" }}
                onClick={handleOpen}
              >
                sign in
              </Link>
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
                    Aready sigined in
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    you can enjoin now.
                  </Typography>
                </Box>
              </Modal>
            </>
          ) : (
            <>
              <Link className="play" to={{ pathname: "/login" }}>
                sigin in
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
