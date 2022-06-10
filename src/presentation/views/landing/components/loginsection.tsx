import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Grid, Paper, SvgIcon, Typography } from '@mui/material';

import { ethRequestConnection } from '../../../../data/web3/web3';

export interface LoginSectionProps {
  icon: React.ElementType<any>;
  callToAction: string;
  linkRoute: string;
}

const LoginSection = (props: LoginSectionProps) => {
  const navigate = useNavigate();

  const goToApp = () => navigate(props.linkRoute);

  const login = async () => {
    await ethRequestConnection(goToApp);
  };

  return (
    <Paper
      variant='outlined'
      square
      sx={{
        height: {
          md: '100vh',
        },
        padding: {
          md: '50px',
          xs: '32px',
        },
      }}
    >
      <Grid
        container
        spacing={4}
        direction='column'
        alignItems='center'
        justifyItems='center'
      >
        <Grid item xs={3}>
          <SvgIcon
            component={props.icon}
            inheritViewBox
            sx={{ fontSize: '40vh' }}
          />
        </Grid>
        <Grid item xs={3}>
          <Typography variant='h3' component='div' align='center'>
            {props.callToAction}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Button variant='contained' onClick={login}>
            Join
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default LoginSection;
