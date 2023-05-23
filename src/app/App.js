import React, { useContext } from "react";
import { ThemeContext } from "../processes/user/context/ThemeContext";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "../processes/user/context/AuthContext";
import MobileRegister from "../pages/Register/MobileRegister";
import MobileLogin from "../pages/Login/MobileLogin";
import MobileHome from "../pages/Home/MobileHome";
import MobileChat from "../pages/Chats/Chat/MobileChat";
import Calculator from "../pages/calculator/Calculator";

function App() {
    const { currentUser } = useContext(AuthContext);

    // variable that passing variable
    const theme = useContext(ThemeContext);
    const darkMode = theme.state.darkMode;

    const ProtectedRouteCalculator = ({ children }) => {
        if (!currentUser) {
            return <Navigate to="/login" />
        } else if (currentUser === true) {
            return <Navigate to="/home" />
        };

        return children;
    };

    const ProtectedRouteHome = ({ children }) => {
        if (!currentUser) {
            return <Navigate to="/login" />
        } else if (currentUser === true) {
            return <Navigate to="/home" />
        };

        return children;
    };

    const ProtectedChat = ({ children }) => {
        if (!currentUser) {
            return <Navigate to="/login" />
        } else if (currentUser === true) {
            return <Navigate to="/chat" />
        };

        return children;
    };

    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={
                    <Calculator />
                } />
                <Route path="/home" index element={
                    <ProtectedRouteHome>
                        <MobileHome />
                    </ProtectedRouteHome>
                } />
                <Route path="/chat" index element={
                    <ProtectedChat>
                        <MobileChat />
                    </ProtectedChat>
                } />
                <Route path="/login" element={<MobileLogin />} />
                <Route path="/register" element={<MobileRegister />} />

            </Routes>
        </BrowserRouter>
    );
}

export default App;