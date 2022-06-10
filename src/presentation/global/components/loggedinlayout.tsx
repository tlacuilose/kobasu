import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Button, Container } from '@mui/material';
import { Box } from '@mui/system';
import { createTheme } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

import TopBar from './topBar';
import { ThemeProvider } from '@emotion/react';

const logoutButtonTheme = createTheme({
  palette: {
    primary: {
      main: grey[50],
    },
  },
});

const LoggedInLayout = (props: { user: string; opposing: string }) => {
  const navigate = useNavigate();

  const goToLogin = () => navigate('/');

  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1 }}>
        <TopBar text={`| ${props.user}`}>
          <ThemeProvider theme={logoutButtonTheme}>
            <Button variant='outlined' color='primary' onClick={goToLogin}>
              Switch to {props.opposing}
            </Button>
          </ThemeProvider>
        </TopBar>
      </Box>
      <Container maxWidth='md' sx={{ marginTop: '16px' }}>
        <Outlet />
      </Container>
    </React.Fragment>
  );
};

export default LoggedInLayout;
