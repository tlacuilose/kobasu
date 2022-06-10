import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Button, Container } from '@mui/material';
import { Box } from '@mui/system';
import TopBar from './topBar';

const LoggedInLayout = (props: { user: string }) => (
  <React.Fragment>
    <Box sx={{ flexGrow: 1 }}>
      <TopBar text={`| ${props.user}`}>
        <Link to='/'>
          <Button sx={{ color: 'white' }}>Logout</Button>
        </Link>
      </TopBar>
    </Box>
    <Container maxWidth='md' sx={{ marginTop: '16px' }}>
      <Outlet />
    </Container>
  </React.Fragment>
);

export default LoggedInLayout;
