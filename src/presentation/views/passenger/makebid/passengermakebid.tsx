import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Button,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
} from '@mui/material';

import PassengerMakeBidViewModel from './viewmodel';

const PassengerMakeBid = () => {
  const { tripId } = useParams();
  const { amount, getTripInfo, onChange, callMakeBid, checkIfPassengerHasBid } =
    PassengerMakeBidViewModel();

  useEffect(() => {
    checkIfPassengerHasBid();
    getTripInfo(Number(tripId));
  }, []);

  return (
    <React.Fragment>
      <Typography variant='h4' component='div'>
        Make bid to trip: {tripId}
      </Typography>
      <form>
        <Grid container spacing={2} sx={{ marginTop: '16px ' }}>
          <Grid item md={10} xs={12}>
            <Stack spacing={2}>
              <FormControl fullWidth>
                <InputLabel htmlFor='offer-bid'>Bid</InputLabel>
                <OutlinedInput
                  id='offer-bid'
                  value={amount}
                  onChange={onChange}
                  startAdornment={
                    <InputAdornment position='start'>$</InputAdornment>
                  }
                  label='Bid'
                />
              </FormControl>
            </Stack>
          </Grid>
          <Grid item md={2} xs={12}>
            <FormControl fullWidth>
              <Button variant='outlined' onClick={callMakeBid}>
                Make bid
              </Button>
            </FormControl>
          </Grid>
        </Grid>
      </form>
    </React.Fragment>
  );
};

export default PassengerMakeBid;
