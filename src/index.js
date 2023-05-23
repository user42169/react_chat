import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import "./index.css";
import reportWebVitals from './reportWebVitals';
import { AuthContextProvider } from "./processes/user/context/AuthContext";
import { ChatContextProvider } from "./processes/user/context/ChatContext";
import { ThemeProvider } from "./processes/user/context/ThemeContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthContextProvider>
        <ChatContextProvider>
            <ThemeProvider>
                <React.StrictMode>
                    <App />
                </React.StrictMode>
            </ThemeProvider>
        </ChatContextProvider>
    </AuthContextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
