import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  Avatar,
  Tooltip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { Link } from "react-router-dom";

import { RootAppBar, RootTypography } from "../../styles/root";

const pagePaths = {
  Products: "/",
  Login: "/login",
};
const settings = ["Profile", "Logout"];

export function NavigationBar() {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <RootAppBar position="static">
      <Toolbar disableGutters>
        <IconButton
          size="large"
          aria-label="menu"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenNavMenu}
          color="inherit"
          edge="start"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
        >
          {Object.entries(pagePaths).map(([page, path]) => (
            <MenuItem key={page} onClick={handleCloseNavMenu}>
              <Link
                to={path}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Typography variant="body1" textAlign="center">
                  {page}
                </Typography>
              </Link>
            </MenuItem>
          ))}
        </Menu>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <RootTypography variant="h6" noWrap>
            LOGO
          </RootTypography>
        </Link>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          {Object.entries(pagePaths).map(([page, path]) => (
            <MenuItem key={page} onClick={handleCloseNavMenu}>
              <Link
                to={path}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Typography variant="body1" textAlign="center">
                  {page}
                </Typography>
              </Link>
            </MenuItem>
          ))}
        </Box>
        <Box>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="User Avatar" src="/static/images/avatar/2.jpg" />
            </IconButton>
          </Tooltip>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <MenuItem key={setting} onClick={handleCloseUserMenu}>
                <Link
                  to={setting}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Typography variant="body1" textAlign="center">
                    {setting}
                  </Typography>
                </Link>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </RootAppBar>
  );
}
