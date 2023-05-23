import React, { useContext } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase";
import { AuthContext } from "../../../processes/user/context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./navbar-styles/dark-navbar-styles.scss";

const Navbar = () => {
    const { currentUser } = useContext(AuthContext)
    const navigate = useNavigate();
    
    return (
        <div className="navbar">
            <span className="logo">Chat</span>
            <div className="user">
                <img src={ currentUser.photoURL } alt="" />
                <span>{ currentUser.displayName }</span>
                <button className="button" onClick={ ()=> { signOut(auth); navigate("/login") } }>Logout</button>
            </div>
        </div>
    )
};

export default Navbar;