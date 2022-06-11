import React, { useEffect } from 'react';
import {
  Button,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Slider,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import DriverHomeViewModel from './viewmodel';

const DriverHomeView = () => {
  const {
    from,
    to,
    seats,
    cost,
    onChangeInput,
    onChangeSlider,
    callOfferTrip,
    checkIfDriverHasTrip,
  } = DriverHomeViewModel();

  useEffect(() => {
    checkIfDriverHasTrip();
  });

  return (
    <React.Fragment>
      <Typography variant='h4' component='div'>
        Offer a trip
      </Typography>
      <form>
        <Grid container spacing={2} sx={{ marginTop: '16px ' }}>
          <Grid item md={10} xs={12}>
            <Stack spacing={2}>
              <FormControl fullWidth>
                <InputLabel htmlFor='offer-from'>From:</InputLabel>
                <Select
                  labelId='offer-from'
                  id='offer-from'
                  value={from}
                  label='From'
                  onChange={onChangeInput}
                  name='from'
                >
                  <MenuItem value={''}>Select a city</MenuItem>
                  <MenuItem value={'Mexico City'}>Mexico City</MenuItem>
                  <MenuItem value={'Puebla'}>Puebla</MenuItem>
                  <MenuItem value={'Queretaro'}>Queretaro</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel htmlFor='offer-to'>To:</InputLabel>
                <Select
                  labelId='offer-to'
                  id='offer-to'
                  value={to}
                  label='To'
                  onChange={onChangeInput}
                  name='to'
                >
                  <MenuItem value={''}>Select a city</MenuItem>
                  <MenuItem value={'Mexico City'}>Mexico City</MenuItem>
                  <MenuItem value={'Puebla'}>Puebla</MenuItem>
                  <MenuItem value={'Queretaro'}>Queretaro</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <TextField
                  label='Appointment time'
                  type='datetime-local'
                  defaultValue='2017-05-24T10:30'
                  /* better use: https://mui.com/x/react-date-pickers/getting-started/ */
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </FormControl>
              <FormControl fullWidth sx={{ m: 1 }}>
                <Typography gutterBottom>Available seats</Typography>
                <Slider
                  id='offer-seats'
                  aria-label='Available seats'
                  valueLabelDisplay='auto'
                  defaultValue={4}
                  step={1}
                  min={1}
                  max={20}
                  marks
                  value={seats}
                  onChange={onChangeSlider}
                  name='seats'
                />
              </FormControl>
              <FormControl fullWidth>
                <InputLabel htmlFor='offer-cost'>Cost</InputLabel>
                <OutlinedInput
                  id='offer-cost'
                  value={cost}
                  onChange={onChangeInput}
                  name='cost'
                  startAdornment={
                    <InputAdornment position='start'>$</InputAdornment>
                  }
                  label='Cost'
                />
              </FormControl>
            </Stack>
          </Grid>
          <Grid item md={2} xs={12}>
            <FormControl fullWidth>
              {/* <Link to='/driver/waitlist'> */}
              <Button variant='outlined' onClick={callOfferTrip}>
                Make offer
              </Button>
              {/* </Link> */}
            </FormControl>
          </Grid>
        </Grid>
      </form>
    </React.Fragment>
  );
};

export default DriverHomeView;
