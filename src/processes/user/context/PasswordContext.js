import React, { createContext, useReducer } from "react";

export const PasswordContext = createContext();

const initialState = {
    whiteTheme: window.localStorage.setItem("password", JSON.stringify(false)),
};

const themeReducer = (state, action) => {
    switch (action.type) {
        case "true":
            window.localStorage.setItem("whiteTheme", JSON.stringify(true));
            return { whiteTheme: true };
        case "false":
            window.localStorage.setItem("whiteTheme", JSON.stringify(false));
            return { whiteTheme: false };
    };
};

export function ThemeProvider(props) {
    const [state, dispatch] = useReducer(themeReducer, initialState);

    return <PasswordContext.Provider value={{ state, dispatch }}>{props.children}</PasswordContext.Provider>;
};
