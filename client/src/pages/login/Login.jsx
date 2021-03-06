import { useContext, useState } from "react";
import { login } from "../../authContext/apiCalls";
import { AuthContext } from "../../authContext/AuthContext";
import imageUrl from "../../images/logo2.png";
import { Link, useHistory } from "react-router-dom";
import "./login.scss";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { dispatch } = useContext(AuthContext);
  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();
    // if (!email || !password) {
    //   alert("email or password can not be empty");
    // }
    try {
      if (email === "" || password === "") {
        alert("email or password is error");
        history.push("/login");
      } else {
        await login({ email, password }, dispatch);
        history.push("/");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="login">
      <div className="top">
        <div className="wrapper">
          <img className="logo" src={imageUrl} alt="" />
        </div>
      </div>
      <div className="container">
        <form>
          <h1>Sign In</h1>
          <input
            type="email"
            placeholder="Email or phone number"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="loginButton" onClick={handleLogin}>
            Sign In
          </button>
          {/* {infoWar && (
            <>
              <Stack sx={{ width: "100%" }} spacing={2}>
                <Alert severity="warning">
                  <AlertTitle>Warning</AlertTitle>
                  email or password can not be empty  — <strong>please check it again!</strong>
                </Alert>
              </Stack>
            </>
          )} */}
          <span>
            New to NewFeel?{" "}
            <b>
              <Link to={{ pathname: "/register" }}>Sign up now.</Link>
            </b>
          </span>
          <small>
            This page is protected to ensure you're not a bot. <b>Learn more</b>
            .{/* by Google reCAPTCHA */}
          </small>
        </form>
      </div>
    </div>
  );
}
