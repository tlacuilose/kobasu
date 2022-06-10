import { Paper, Typography } from '@mui/material';

interface TripStatusProps {
  status: 'Waiting for acceptance' | 'Accepted' | 'Started';
}

const TripStatus = (props: TripStatusProps) => (
  <Paper variant='outlined' sx={{ padding: '8px' }}>
    <Typography variant='h5' component='div' align='center'>
      {props.status}
    </Typography>
  </Paper>
);

export default TripStatus;
