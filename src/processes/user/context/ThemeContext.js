import React, { createContext, useReducer } from "react";

export const ThemeContext = createContext();

const initialState = {
    whiteTheme: window.localStorage.setItem("whiteTheme", JSON.stringify(true)),
};

const themeReducer = (state, action) => {
    switch (action.type) {
        case "false":
            window.localStorage.setItem("whiteTheme", JSON.stringify(true));
            return { whiteTheme: true };
        case "true":
            window.localStorage.setItem("whiteTheme", JSON.stringify(false));
            return { whiteTheme: false };

    };
};

export function ThemeProvider(props) {
    const [state, dispatch] = useReducer(themeReducer, initialState);

    return <ThemeContext.Provider value={{ state, dispatch }}>{ props.children }</ThemeContext.Provider>;
};
