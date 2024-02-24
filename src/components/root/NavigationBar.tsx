import { Box, IconButton, Menu, Toolbar, Avatar, Tooltip } from "@mui/material";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { RootAppBar, RootTypography } from "../../styles/root";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import NavigationMenuItem from "./MenuItem";
import { setUser } from "../../redux/slices/userSlice";
import { sortProductsByPrice } from "../../redux/slices/productSlice";

export function NavigationBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state: RootState) => state.user.user);
  const sorted = useSelector((state: RootState) => state.product.sorted);
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

  const handleSort = () => {
    dispatch(sortProductsByPrice());
    navigate("/alt");
  };

  const handleLogout = () => {
    //console.log("storage cleared!");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    dispatch(setUser(null));
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
          <NavigationMenuItem
            page="Products"
            path="/"
            handleCloseNavMenu={handleCloseNavMenu}
          />
          {!userData && (
            <NavigationMenuItem
              page="Login"
              path="/login"
              handleCloseNavMenu={handleCloseNavMenu}
            />
          )}
        </Menu>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <RootTypography variant="h6" noWrap>
            LOGO
          </RootTypography>
        </Link>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton size="large" onClick={handleSort}>
          {sorted !== 1 ? <ArrowDownwardIcon color="primary"/> : <ArrowUpwardIcon color = "primary"/>}
        </IconButton>
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <NavigationMenuItem
            page="Products"
            path="/"
            handleCloseNavMenu={handleCloseNavMenu}
          />
          {!userData && (
            <NavigationMenuItem
              page="Login"
              path="/login"
              handleCloseNavMenu={handleCloseNavMenu}
            />
          )}
        </Box>
        {userData && (
          <Box>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={userData?.name} src={userData?.avatar} />
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
              <NavigationMenuItem
                page="Profile"
                path="/profile"
                handleCloseNavMenu={handleCloseUserMenu}
              />
              <NavigationMenuItem
                page="Logout"
                path="/"
                handleCloseNavMenu={handleLogout}
              />
            </Menu>
          </Box>
        )}
      </Toolbar>
    </RootAppBar>
  );
}
