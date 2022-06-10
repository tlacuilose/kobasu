import { Link } from 'react-router-dom';
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { getAvailableOffers } from '../../../../../data/web3/nekobasu';
import { initDapp } from '../../../../../data/web3/web3';

const PassengerOffersList = () => {
  const [offers, setOffers] = useState<any[]>([]);
  const getOffers = async () => {
    try {
      await initDapp();
      let result = await getAvailableOffers();
      console.log(result);
      setOffers(result);
    } catch (err: any) {
      console.log(err);
      alert('Could not get any offers.');
    }
  };

  useEffect(() => {
    getOffers();
  }, []);
  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ minWidth: '350px' }}
        aria-label='Offers available to a passenger'
      >
        <TableHead>
          <TableRow>
            <TableCell>Trip id</TableCell>
            <TableCell align='center'>Driver</TableCell>
            <TableCell align='center'>Seats</TableCell>
            <TableCell align='center'>Cost</TableCell>
            <TableCell align='center'>Appointment Time</TableCell>
            <TableCell align='center'>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {offers.length > 0 &&
            offers.map((offer) => (
              <TableRow
                key={offer.tripId}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component='th' scope='row'>
                  {offer.tripId}
                </TableCell>
                <TableCell align='right'>{offer.driver}</TableCell>
                <TableCell align='right'>{offer.trip.seats}</TableCell>
                <TableCell align='right'>{offer.cost}</TableCell>
                <TableCell align='right'>{offer.appointmentTime}</TableCell>
                <TableCell align='right'>
                  <Link to={`/passenger/bid/${offer.tripId}`}>
                    <Button>Make bid</Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PassengerOffersList;
