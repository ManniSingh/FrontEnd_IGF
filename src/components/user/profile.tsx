import { Avatar, Typography, Grid} from "@mui/material";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";

const UserProfilePage = () => {
  const userData = useSelector((state: RootState) => state.user.user);
  if(!userData) return(<p>User data doesn't exist</p>);
  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item xs={12} sm={6}>
        <Typography variant="h4" align="center" gutterBottom>
          User Profile
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          <Grid item>
            <Avatar alt="User Avatar" src={userData?.avatar} />
          </Grid>
          <Grid item>
            <Typography variant="h6">{userData?.name}</Typography>
            <Typography variant="body1">User ID: {userData?.id}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default UserProfilePage;
