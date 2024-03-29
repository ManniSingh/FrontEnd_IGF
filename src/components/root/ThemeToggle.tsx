import React, { useContext, useState } from "react";
import { Switch, FormControlLabel } from "@mui/material";
import ThemeContext from "./ThemeContext"; 

interface ThemeToggleProps { }

const ThemeToggle: React.FC<ThemeToggleProps> = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const [isDarkTheme, setIsDarkTheme] = useState(theme === "dark");

  const handleThemeChange = () => {
    const newTheme = isDarkTheme ? "light" : "dark";
    setIsDarkTheme(!isDarkTheme);
    setTheme(newTheme);
  };  

  return (
    <FormControlLabel
      control={<Switch checked={isDarkTheme} onChange={handleThemeChange} />}
      label=""
    />
  );
};

export default ThemeToggle;
