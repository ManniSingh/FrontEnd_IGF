import styled from 'styled-components';
import { Typography, TypographyProps, Button as MuiButton, TextField as MuiTextField } from '@mui/material';

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const FormTitle = styled(Typography).attrs(
  (props: TypographyProps) => ({
    variant: props.variant || "h6",
  })
)<TypographyProps>`
  margin-bottom: 20px;
`;

export const InputField = styled(MuiTextField)`
  margin-bottom: 20px;
`;

export const SubmitButton = styled(MuiButton)`
  && {
    margin-top: 20px;
  }
`;

export const ErrorMessage = styled(Typography)`
  margin-top: 10px;
`;

export const SuccessMessage = styled.div`
  margin-top: 20px;
  background-color: #d4edda;
  color: #155724;
  padding: 10px;
  border-radius: 5px;
`;
