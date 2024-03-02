import React, { createContext, useState } from "react";

interface Theme {
  theme: "light" | "dark";
  setTheme: (newTheme: Theme["theme"]) => void;
}

const ThemeContext = createContext<Theme>({
  theme: "light",
  setTheme: () => {},
});

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme["theme"]>("light");

  const changeTheme = (newTheme: Theme["theme"]) => setTheme(newTheme);

  const value = {
    theme,
    setTheme: changeTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
export { ThemeProvider };
