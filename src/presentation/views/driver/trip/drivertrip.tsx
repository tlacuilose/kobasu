import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Stack, Typography } from '@mui/material';

import TitleWithLeftItem from '../../../global/components/titlewithleftitem';
import AcceptedBidsList from '../waitlist/components/acceptedbidslist';
import { useState } from 'react';
import {
  finishTrip,
  getActiveTrip,
  getTrip,
} from '../../../../data/web3/nekobasu';
import { initDapp } from '../../../../data/web3/web3';

const DriverTripView = () => {
  const navigate = useNavigate();
  const [trip, setTrip] = useState<any>(undefined);
  const [tripId, setTripId] = useState<Number>(0);

  const checkIfDriverHasTrip = async () => {
    try {
      await initDapp();
      let tripId = await getActiveTrip();
      if (tripId === 0) {
        navigate('/driver');
      } else {
        let trip = (await getTrip(tripId)) as any;
        if (!trip.started) {
          navigate('/driver/waitlist');
        } else {
          setTripId(tripId);
          setTrip(trip);
        }
      }
    } catch (err: any) {
      console.log(err);
      alert(err);
    }
  };

  const callFinishTrip = async () => {
    try {
      await finishTrip();
      navigate('/driver');
    } catch (err: any) {
      console.log(err);
      alert(err);
    }
  };

  useEffect(() => {
    checkIfDriverHasTrip();
  }, []);

  return (
    <React.Fragment>
      {!trip ? (
        <Typography variant='h4' component='div'>
          Driver has no trip to wait for.
        </Typography>
      ) : (
        <Stack spacing={2} sx={{ marginY: '16px' }}>
          <Typography variant='h4' component='div'>
            Trip 0x4338498934433823238 has started.
          </Typography>
          <TitleWithLeftItem titleVariant='h5' title='Passengers:'>
            <Button onClick={callFinishTrip}>Finish</Button>
          </TitleWithLeftItem>
          <AcceptedBidsList tripId={tripId} />
        </Stack>
      )}
    </React.Fragment>
  );
};

export default DriverTripView;
