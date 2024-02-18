import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

import {
  useRegisterMutation,
  useIsEmailAvailableQuery,
} from "../../services/api";
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

function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>();
  const [
    registerUser,
    {
      isLoading: isRegistering,
      isError: registerError,
      error: registerErrorMessage,
      data: registerData,
    },
  ] = useRegisterMutation();
  const [skip, setSkip] = useState(true);
  const [email, setEmail] = useState('');
  const { data: emailData, refetch: recheckEmail } = useIsEmailAvailableQuery(email, {skip});

  useEffect(() => {
    const fetchData = async () => {
      await recheckEmail();
    };
    if (email !== '') {
      fetchData();
    }
  }, [email, recheckEmail]);
  
  // submitter
  const onSubmit = async (formData: LoginFormValues) => {
    if (isRegistering) return;

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    setEmail(formData.email); 
    setSkip(false);
    console.log("EMAIL:",emailData !== null,emailData);
    if (emailData && emailData.isAvailable){
      alert("Email is already registered");
      return;
    }else{
      await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        avatar: "https://api.lorem.space/image/face?w=150&h=220"
      });
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <FormTitle variant="h6"> Sign Up</FormTitle>

      <InputField
        label="Name"
        type="text"
        {...register('name', { required: true })}
        error={!!errors.name}
        helperText={errors.name ? 'Name is required' : ''}
      />

      <InputField
        label="Email"
        type="email"
        {...register('email', { required: true })}
        error={!!errors.email}
        helperText={errors.email ? 'Email is required' : ''}
      />

      <InputField
        label="Password"
        type="password"
        {...register('password', { required: true })}
        error={!!errors.password}
        helperText={errors.password ? 'Password is required' : ''}
      />

      <InputField
        label="Confirm Password"
        type="password"
        {...register('confirmPassword', { required: true })}
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword ? 'Confirm Password is required' : ''}
      />

      <SubmitButton type="submit" variant="contained" disabled={isSubmitting}>
        {isRegistering ? 'Processing...' : 'Sign Up'}
      </SubmitButton>

      <Grid container>
        <Grid item>
          <Link href="/login">
            {"Already have an account? Sign in"}
          </Link>
        </Grid>
      </Grid>

      {registerError && <ErrorMessage>Registration Error: {JSON.stringify(registerErrorMessage)}</ErrorMessage>}
      {registerData && (
        <SuccessMessage>
          Registration Successful for {registerData.addUser.name}
        </SuccessMessage>
      )}
    </FormContainer>
  );
}

export default RegisterForm;
