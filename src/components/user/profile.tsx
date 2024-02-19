import React, { useEffect } from "react";
import { Avatar, Typography, Grid, LinearProgress } from "@mui/material";
import { useGetUserProfileQuery } from "../../services/api";

const UserProfilePage = () => {
  const { data, isLoading, isError, refetch } = useGetUserProfileQuery({});

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (isLoading) {
    return <LinearProgress />;
  }

  if (isError) {
    return <div>Error fetching user profile data</div>;
  }

  const { id, name, avatar } = data.myProfile;

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item xs={12} sm={6}>
        <Typography variant="h4" align="center" gutterBottom>
          User Profile
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          <Grid item>
            <Avatar alt="User Avatar" src={avatar} />
          </Grid>
          <Grid item>
            <Typography variant="h6">{name}</Typography>
            <Typography variant="body1">User ID: {id}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default UserProfilePage;
