import { Link } from 'react-router-dom';
import { Button, Stack } from '@mui/material';

import TitleWithLeftItem from '../../../global/components/titlewithleftitem';
import TripStatus from './components/tripstatus';

const PassengerTripView = () => (
  <Stack spacing={2}>
    <TitleWithLeftItem titleVariant='h4' title='Your trip 0x03423942839 is:'>
      <Link to='/passenger'>
        <Button>Finish</Button>
      </Link>
    </TitleWithLeftItem>
    <TripStatus status='Waiting for acceptance' />
    <TripStatus status='Accepted' />
    <TripStatus status='Started' />
  </Stack>
);

export default PassengerTripView;
