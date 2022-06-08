import React from 'react';
import { Stack, Typography } from '@mui/material';

import PassengerOffersList from './components/passengerofferslist';

const PassengerHomeView = () => (
  <React.Fragment>
    <Stack spacing={2}>
      <Typography variant='h4' component='div'>
        Available trips
      </Typography>
      <PassengerOffersList />
    </Stack>
  </React.Fragment>
);

export default PassengerHomeView;
