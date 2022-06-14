import React, { useEffect } from 'react';
import { Button, Stack, Typography } from '@mui/material';

import TitleWithLeftItem from '../../../global/components/titlewithleftitem';
import TripStatus from './components/tripstatus';
import PassengerTripViewModel from './viewmodel';

const PassengerTripView = () => {
  const { bid, trip, checkIfPassengerHasBid, callWithdrawBid, callFinishBid } =
    PassengerTripViewModel();

  useEffect(() => {
    checkIfPassengerHasBid();
  }, [checkIfPassengerHasBid]);

  const viewBidTitle = bid && trip ? 'Your bid on trip' + bid.tripId : '';
  const viewTripTitle = bid && trip ? 'Your trip' + bid.tripId + ' status' : '';

  return (
    <React.Fragment>
      {bid && trip ? (
        <Stack spacing={2}>
          <Typography variant='h4' component='div'>
            Status report
          </Typography>
          <TitleWithLeftItem titleVariant='h5' title={viewBidTitle}>
            {bid.accepted ? (
              <Button onClick={callFinishBid}>Finish trip</Button>
            ) : (
              <Button onClick={callWithdrawBid}>Withdraw bid</Button>
            )}
          </TitleWithLeftItem>
          <Typography variant='h6' component='div'>
            {bid.amount}
          </Typography>
          <TripStatus
            status={bid.accepted ? 'Accepted' : 'Waiting for acceptance'}
          />
          <Typography variant='h5' component='div'>
            {viewTripTitle}
          </Typography>
          <Typography variant='h6' component='div'>
            {trip.info}
          </Typography>
          <TripStatus status={trip.started ? 'Started' : 'Waiting for bids'} />
        </Stack>
      ) : (
        <Typography variant='h4' component='div'>
          Passenger has no bid
        </Typography>
      )}
    </React.Fragment>
  );
};

export default PassengerTripView;
