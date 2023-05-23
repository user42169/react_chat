import React, { useContext } from "react";
import { ThemeContext } from "../../../../processes/user/context/ThemeContext";
import DarkTheme from "../../../../shared/user/img/home/theme-dark.png";
import LightTheme from "../../../../shared/user/img/home/theme-light.png";

export default function SwitchButton() {
  const theme = useContext(ThemeContext);
  const whiteTheme = theme.state.whiteTheme;

  const onClick = () => {
    if (whiteTheme) {
      theme.dispatch({ type: "true" });
    } else {
      theme.dispatch({ type: "false" });
    }
  };

  return (
    <img src={whiteTheme ? LightTheme : DarkTheme} alt="" onClick={ onClick } />
  );
};