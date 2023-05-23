import React, { useState } from "react";

const ChangeTheme = () => {
    // test dark mode
    const [whiteTheme, setTheme] = useState(true);

    const handleSelect = () => {
        if (whiteTheme) {

            setTheme(false);
        } else {

            setTheme(true);
        };
    };
};


export default ChangeTheme;