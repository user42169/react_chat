import React, { useContext, useState } from "react";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../../firebase";
import { AuthContext } from "../../../../processes/user/context/AuthContext";
import { ThemeContext } from "../../../../processes/user/context/ThemeContext";
import BackWhite from "../../../../shared/user/img/chat/back-white.png";
import BackDark from "../../../../shared/user/img/chat/back-dark.png";
import SwitchThemeButton from "../../changeTheme/buttonThemeSwitcher/buttonThemeSwitcher";
import MenuWhite from "../../../../shared/user/img/home/menu-white.png";
import MenuDark from "../../../../shared/user/img/home/menu-dark.png";
import ExitWhite from "../../../../shared/user/img/home/exit-pink-white.png";
import ExitDark from "../../../../shared/user/img/home/exit-pink-dark.png";

import "./navbar-styles/mobile-navbar-styles-dark.scss";
import "./navbar-styles/mobile-navbar-styles-white.scss";
import "./navbar-styles/desktop-navbar-styles-dark.scss";
import "./navbar-styles/desktop-navbar-styles-white.scss";


import HorseDark from "../../../../shared/logo/dark-pink-horse.png";
import HorseWhite from "../../../../shared/logo/white-pink-horse.png";


const MobileNavbar = () => {
    const { currentUser } = useContext(AuthContext)
    const navigate = useNavigate();

    const [collapsed, setCollapsed] = useState(false)

    const handleBack = () => {
        navigate("/")
    }

    // theme switcher
    const theme = useContext(ThemeContext);
    const whiteTheme = theme.state.whiteTheme;

    return (
        <div className={whiteTheme ? "navbar-mobile-white" : "navbar-mobile-dark"} >
            <span className="logo">
                <SwitchThemeButton />
                <img src={ whiteTheme ? BackWhite : BackDark } onClick={handleBack} />
            </span>
            <img className="horse" src={ whiteTheme ? HorseWhite : HorseDark } />
            <div className="user-images">
                <div className={!collapsed ? "collaps_elem" : ""}>
                    <img src={currentUser.photoURL} alt="" />
                    <img src={whiteTheme ? MenuWhite : MenuDark} alt="" className="menu" onClick={setCollapsed} />
                    
                    <img className="exit-btn" src={whiteTheme ? ExitWhite : ExitDark } onClick={() => { signOut(auth); navigate("/login") }} />
                </div>
            </div>
        </div >
    )
};

export default MobileNavbar;