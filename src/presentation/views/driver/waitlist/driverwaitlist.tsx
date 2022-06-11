import React, { useEffect } from 'react';
import { Button, Stack, Typography } from '@mui/material';

import AcceptedBidsList from './components/acceptedbidslist';
import PendingBidsList from './components/pendingbidslist';
import TitleWithLeftItem from '../../../global/components/titlewithleftitem';
import DriverWaitListViewModel from './viewmodel';

const DriverWaitListView = () => {
  const { tripId, trip, callCancelTrip, callStartTrip, checkIfDriverHasTrip } =
    DriverWaitListViewModel();

  useEffect(() => {
    checkIfDriverHasTrip();
  }, []);

  const tripTitle = 'Waitlist for trip: ' + tripId;

  return (
    <React.Fragment>
      {!trip ? (
        <Typography variant='h4' component='div'>
          Driver has no trip to wait for.
        </Typography>
      ) : (
        <Stack spacing={4} sx={{ marginY: '16px' }}>
          <Typography variant='h4' component='div'>
            {tripTitle}
          </Typography>
          <Typography variant='h6' component='div'>
            {trip.info}
          </Typography>
          <Stack spacing={2} sx={{ marginTop: '16px' }}>
            <TitleWithLeftItem titleVariant='h5' title='Received bids.'>
              <Button onClick={callCancelTrip}>Revoke offer</Button>
            </TitleWithLeftItem>
            <PendingBidsList tripId={tripId} />
          </Stack>
          <Stack spacing={2} sx={{ marginTop: '16px' }}>
            <TitleWithLeftItem titleVariant='h5' title='Accepted bids.'>
              <Button onClick={callStartTrip}>Start trip</Button>
            </TitleWithLeftItem>
            <AcceptedBidsList tripId={tripId} />
          </Stack>
        </Stack>
      )}
    </React.Fragment>
  );
};

export default DriverWaitListView;
