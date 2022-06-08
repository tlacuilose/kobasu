import { Link } from 'react-router-dom';
import { Button, Stack, Typography } from '@mui/material';

import TitleWithLeftItem from '../../../global/components/titlewithleftitem';
import AcceptedBidsList from '../waitlist/components/acceptedbidslist';

const DriverTripView = () => (
  <Stack spacing={2} sx={{ marginY: '16px' }}>
    <Typography variant='h4' component='div'>
      Trip 0x4338498934433823238 has started.
    </Typography>
    <TitleWithLeftItem titleVariant='h5' title='Passengers:'>
      <Link to='/driver'>
        <Button>Finish</Button>
      </Link>
    </TitleWithLeftItem>
    <AcceptedBidsList />
  </Stack>
);

export default DriverTripView;
