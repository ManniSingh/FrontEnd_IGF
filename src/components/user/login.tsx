import { useForm } from "react-hook-form";
import { Grid, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";


import { useLoginMutation } from "../../services/api";
import {
  FormContainer,
  FormTitle,
  InputField,
  SubmitButton,
  ErrorMessage,
} from "../../styles/login";
import { LoginFormValues } from "../../types/userTypes";



function LoginForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();
  const [login, { isLoading, isError, error}] = useLoginMutation();

  const onSubmit = async (formData: LoginFormValues) => {
    const response = await login(formData);
    if ("data" in response && "login" in response.data) {
      localStorage.setItem("access_token", response.data.login.access_token);
      localStorage.setItem("refresh_token", response.data.login.refresh_token);
      //console.log("token added");
      navigate("/");
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <FormTitle variant="h6">Login</FormTitle>

      <InputField
        label="Email"
        type="email"
        {...register("email", { required: true })}
        error={!!errors.email}
        helperText={errors.email ? "Email is required" : ""}
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
          <Link href="/register">
            {"Don't have an account? Sign Up"}
          </Link>
        </Grid>
      </Grid>

      {isError && <ErrorMessage>Error: {JSON.stringify(error)}</ErrorMessage>}
    </FormContainer>
  );
}

export default LoginForm;
