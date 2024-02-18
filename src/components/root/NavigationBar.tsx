import { Toolbar } from "@mui/material";
import { Link } from "react-router-dom";
import { RootAppBar, RootTypography, RootLinkButton } from "../../styles/root";

export function NavigationBar() {
    return (
      <RootAppBar>
        <Toolbar>
          <RootTypography>
            APP
          </RootTypography>
          <Link to="/login">
            <RootLinkButton>Login</RootLinkButton>
          </Link>
          <Link to="/">
            <RootLinkButton>Products</RootLinkButton>
          </Link>
        </Toolbar>
      </RootAppBar>
    );
  }