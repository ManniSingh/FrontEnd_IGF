import React from "react";
import { IconButton } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

interface HomeIconButtonProps {
  goHome: () => void;
}

const HomeButton: React.FC<HomeIconButtonProps> = ({ goHome }) => {
  return (
    <IconButton size="large" onClick={goHome}>
      <HomeIcon color="primary" />
    </IconButton>
  );
};

export default HomeButton;