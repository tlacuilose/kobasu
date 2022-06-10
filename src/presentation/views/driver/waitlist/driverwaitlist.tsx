import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Stack, Typography } from '@mui/material';

import AcceptedBidsList from './components/acceptedbidslist';
import PendingBidsList from './components/pendingbidslist';
import TitleWithLeftItem from '../../../global/components/titlewithleftitem';
import { cancelTrip, startTrip } from '../../../../data/web3/nekobasu';

const DriverWaitListView = () => {
  const navigate = useNavigate();

  const callCancelTrip = async () => {
    try {
      await cancelTrip();
      navigate('/driver');
    } catch (err: any) {
      alert(err);
    }
  };

  const callStartTrip = async () => {
    try {
      await startTrip();
      navigate('/driver/trip');
    } catch (err: any) {
      alert(err);
    }
  };

  return (
    <React.Fragment>
      <Stack spacing={4} sx={{ marginY: '16px' }}>
        <Typography variant='h4' component='div'>
          Waitlist for trip: 0x4338498934433823238
        </Typography>
        <Stack spacing={2} sx={{ marginTop: '16px' }}>
          <TitleWithLeftItem titleVariant='h5' title='Received bids.'>
            <Button onClick={callCancelTrip}>Revoke offer</Button>
          </TitleWithLeftItem>
          <PendingBidsList />
        </Stack>
        <Stack spacing={2} sx={{ marginTop: '16px' }}>
          <TitleWithLeftItem titleVariant='h5' title='Accepted bids.'>
            <Button onClick={callStartTrip}>Start trip</Button>
          </TitleWithLeftItem>
          <AcceptedBidsList />
        </Stack>
      </Stack>
    </React.Fragment>
  );
};

export default DriverWaitListView;
