import React from 'react';
import { Link } from 'react-router-dom';
import { MenuItem, Typography } from '@mui/material';

interface NavigationMenuItemProps {
  page: string;
  path: string;
  handleCloseNavMenu: () => void;
}

const NavigationMenuItem: React.FC<NavigationMenuItemProps> = ({ page, path, handleCloseNavMenu }) => {
  return (
    <MenuItem key={page} onClick={handleCloseNavMenu}>
      <Link to={path} style={{ textDecoration: "none", color: "inherit" }}>
        <Typography variant="body1" textAlign="center">
          {page}
        </Typography>
      </Link>
    </MenuItem>
  );
};

export default NavigationMenuItem;
