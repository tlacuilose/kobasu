import React, { useEffect, useState } from 'react';
import { Button, CssBaseline, Grid, Typography } from '@mui/material';

import { ReactComponent as DriverHello } from '../../assets/driverhello.svg';
import { ReactComponent as PassengerHello } from '../../assets/passengerhello.svg';
import LoginSection from './components/loginsection';
import { ethRequestConnection, ethGetAccounts } from '../../../data/web3/web3';
import TopBar from '../../global/components/topBar';

const LandingView = () => {
  const [isNotConnected, setIsNotConnected] = useState(true);

  useEffect(() => {
    ethGetAccounts().then(
      (accounts) => {
        setIsNotConnected(accounts.length === 0);
      },
      () => setIsNotConnected(true),
    );
  });

  return (
    <React.Fragment>
      <CssBaseline />
      <Grid container>
        <Grid item md={6} xs={12}>
          <LoginSection
            icon={DriverHello}
            callToAction='Join as a driver.'
            linkRoute='/driver'
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <LoginSection
            icon={PassengerHello}
            callToAction='Join as a passenger.'
            linkRoute='/passenger'
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default LandingView;
