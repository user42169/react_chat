import React from "react";
import Sidebar from "../../widgets/user/sidebar/Sidebar";
import Chat from "../../widgets/user/chat/Chat";
import "./home-styles/dark-home-styles.scss";

const Home = () => {
    return (
        <div className="home">
            <div className="container">
                <Sidebar />
                <Chat />
            </div>
        </div>
    )
};

export default Home;