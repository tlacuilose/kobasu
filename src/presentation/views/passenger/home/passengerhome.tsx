import React, { useEffect } from 'react';
import { Stack, Typography } from '@mui/material';

import PassengerOffersList from './components/passengerofferslist';
import PassengerHomeViewModel from './viewmodel';

const PassengerHomeView = () => {
  const { checkIfPassengerHasBid } = PassengerHomeViewModel();

  useEffect(() => {
    checkIfPassengerHasBid();
  }, [checkIfPassengerHasBid]);

  return (
    <React.Fragment>
      <Stack spacing={2}>
        <Typography variant='h4' component='div'>
          Available trips
        </Typography>
        <PassengerOffersList />
      </Stack>
    </React.Fragment>
  );
};

export default PassengerHomeView;
