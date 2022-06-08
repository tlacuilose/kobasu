import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AppBar, Button, Container, Toolbar, Typography } from '@mui/material';
import { Box } from '@mui/system';

const LoggedInLayout = (props: { user: string }) => (
  <React.Fragment>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            Kobasu | {props.user}
          </Typography>
          <Link to='/'>
            <Button sx={{ color: 'white' }}>Logout</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
    <Container maxWidth='md' sx={{ marginTop: '16px' }}>
      <Outlet />
    </Container>
  </React.Fragment>
);

export default LoggedInLayout;
