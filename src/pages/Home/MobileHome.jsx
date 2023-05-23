import React, { useContext } from "react";
import MobileSidebar from "../../widgets/user/Sidebar/MobileSidebar";
// import MobileChat from "../../widgets/user/Chats/Chats1";
import { ThemeContext } from "../../processes/user/context/ThemeContext";
import "./home-styles/mobile-home-styles-dark.scss";
import "./home-styles/mobile-home-styles-white.scss";
import "./home-styles/desktop-home-styles-dark.scss";
import "./home-styles/desktop-home-styles-white.scss";

const MobileHome = () => {

    // theme switcher
    const theme = useContext(ThemeContext);
    const whiteTheme = theme.state.whiteTheme;

    return (
        <div className={whiteTheme ? "home-mobile-white" : "home-mobile-dark"}>
            <div className="container">
                <MobileSidebar />
                {/* <MobileChat /> */}
            </div>
        </div>
    )
};

export default MobileHome;