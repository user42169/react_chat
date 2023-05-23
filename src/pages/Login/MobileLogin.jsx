import React, { useState, useContext } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { ThemeContext } from "../../processes/user/context/ThemeContext";
import SwitchButton from "../../widgets/user/changeTheme/buttonThemeSwitcher/buttonThemeSwitcher";
import "./login-styles/mobile-login-styles-white.scss";
import "./login-styles/mobile-login-styles-dark.scss";
import "./login-styles/desktop-login-styles-white.scss";
import "./login-styles/desktop-login-styles-dark.scss";


import DarkHorse from "../../shared/logo/dark-pink-horse.png";
import WhiteHorse from "../../shared/logo/white-pink-horse.png";

const MobileLogin = () => {

  // theme switcher
  const theme = useContext(ThemeContext);
  const whiteTheme = theme.state.whiteTheme;

  // error handling
  const [err, setErr] = useState(false);

  //navigation
  const navigate = useNavigate();

  const handleSubmit = async (e) => {

    e.preventDefault()
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home")
    } catch (err) {
      setErr(true)
    }
  };

  return (
    <div className={whiteTheme ? "login-form-container-mobile-white" : "login-form-container-mobile-dark"}>

      <div className={whiteTheme ? "formWrapper-white" : "formWrapper-dark"}>

        <img className="horse" src={ whiteTheme ? WhiteHorse : DarkHorse } />
        <span className="logo">ROYALGRAM</span>
        <span className="title">Log In</span>

        <form onSubmit={handleSubmit} >
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          <button>Sign in</button>

          {err && <span>Something went wrong</span>}
        </form>
        <p>You don't have an account? <Link to="/register">Register</Link></p>
        <SwitchButton />
      </div>
    </div>
  )
};

export default MobileLogin;