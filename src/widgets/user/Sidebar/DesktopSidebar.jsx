import React from "react";
import Navbar from "../navbar/Navbar";
import Search from "../search/Search";
import Chats from "../chats/Chats";
import "./sidebar-styles/dark-sidebar-styles.scss";

const Sidebar = () => {
    return (
        <div className="sidebar">
            <Navbar />
            <Search />
            <Chats />
        </div>
    )
};

export default Sidebar;