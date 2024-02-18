import { useForm } from "react-hook-form";
import { useLoginMutation } from "../../services/api";
import {
  FormContainer,
  FormTitle,
  InputField,
  SubmitButton,
  ErrorMessage,
  SuccessMessage,
} from "../../styles/login";
import { LoginFormValues } from "../../types/userTypes";
import { Grid, Link } from "@mui/material";

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();
  const [login, { isLoading, isError, error, data }] = useLoginMutation();

  const onSubmit = async (formData: LoginFormValues) => {
    await login(formData);
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
      {data && (
        <SuccessMessage>
          Access Token: {data.login.access_token}
          <br />
          Refresh Token: {data.login.refresh_token}
        </SuccessMessage>
      )}
    </FormContainer>
  );
}

export default LoginForm;
