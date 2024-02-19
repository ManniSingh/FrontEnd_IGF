import { AppBar, Button, Typography } from '@mui/material';
import { styled } from '@mui/system';

interface AppBarProps {
  backgroundColor?: string;
}

export const RootAppBar = styled(AppBar)<AppBarProps>`
  background-color: ${(props) => props.backgroundColor || 'blue'};
`;

export const RootTypography = styled(Typography)`
  flex-grow: 1;
`;

export const RootLinkButton = styled(Button)`
  && {
    color: white;
    margin-left: 10px;
  }
`;

