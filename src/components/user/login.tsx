import { useForm } from "react-hook-form";
import { Grid, LinearProgress, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { useGetUserProfileQuery, useLoginMutation } from "../../services/api";
import {
  FormContainer,
  FormTitle,
  InputField,
  SubmitButton,
  ErrorMessage,
} from "../../styles/login";
import { LoginFormValues } from "../../types/userTypes";
import { setUser } from "../../redux/slices/userSlice";
import ErrorComp from "../root/ErrorComp";
import { useEffect, useState } from "react";

function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();
  const [login, { isLoading, isError, error }] = useLoginMutation();
  const {
    data: userData,
    isLoading: isUserLoading,
    isError: isLoginError,
    error: profileError,
  } = useGetUserProfileQuery({},{ skip: localStorage.getItem("access_token")?false:true });

  const onSubmit = async (formData: LoginFormValues) => {
    const response = await login(formData);
    if ("data" in response && "login" in response.data) {
      localStorage.setItem("access_token", response.data.login.access_token);
      localStorage.setItem("refresh_token", response.data.login.refresh_token);
    }
  };

  useEffect(() => {
    if (userData) {
      dispatch(setUser(userData.myProfile));
      navigate("/");
    }
  }, [userData]);

  if (isError) {
    console.log("Login error");
    return <ErrorComp error={JSON.stringify(error)} />;
  }
  if (isLoginError) {
    return <ErrorComp error={JSON.stringify(profileError)} />;
  }

  if (isLoading || isUserLoading) {
    return <LinearProgress />;
  }

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <FormTitle variant="h6">Login</FormTitle>

      <InputField
        label="Email"
        type="email"
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Please enter a valid email address",
          },
        })}
        error={!!errors.email}
        helperText={errors.email ? errors.email.message : ""}
      />

      <InputField
        label="Password"
        type="password"
        {...register("password", { required: true })}
        error={!!errors.password}
        helperText={errors.password ? "Password is required" : ""}
      />

      <SubmitButton type="submit" variant="contained" disabled={isLoading}>
        {isLoading ? "Logging in..." : "Login"}
      </SubmitButton>

      <Grid container>
        <Grid item>
          <Link href="/register">{"Don't have an account? Sign Up"}</Link>
        </Grid>
      </Grid>

      {isError && <ErrorMessage>Error: {JSON.stringify(error)}</ErrorMessage>}
    </FormContainer>
  );
}

export default LoginForm;
