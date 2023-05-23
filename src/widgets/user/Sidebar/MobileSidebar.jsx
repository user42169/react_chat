import React, { useContext } from "react";
import MobileNavbar from "./Navbar/MobileNavbar";
import MobileSearch from "./Search/MobileSearch";
import MobileChats from "../../../pages/Chats/MobileChats";
import { ThemeContext } from "../../../processes/user/context/ThemeContext";
import "./sidebar-styles/mobile-sidebar-styles-dark.scss";
import "./sidebar-styles/mobile-sidebar-styles-white.scss";
import "./sidebar-styles/desktop-sidebar-styles-dark.scss";
import "./sidebar-styles/desktop-sidebar-styles-white.scss";

const MobileSidebar = () => {

    // theme switcher
    const theme = useContext(ThemeContext);
    const whiteTheme = theme.state.whiteTheme;
    
    return (
        <div className={whiteTheme ? "sidebar-mobile-white" : "sidebar-mobile-dark"}>
            <MobileNavbar />
            <MobileSearch />
            <MobileChats />
        </div>
    )
};

export default MobileSidebar;