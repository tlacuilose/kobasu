import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

import {
  getAvailableOffers,
  subscribeCancelledTrip,
  subscribeNewTripOffer,
  subscribeStartedTrip,
} from '../../../../../data/web3/nekobasu';
import { initDapp } from '../../../../../data/web3/web3';

const PassengerOffersList = () => {
  const navigate = useNavigate();
  const [offers, setOffers] = useState<any[]>([]);

  const goToMakeBid = (tripId: string) => {
    navigate('/passenger/bid/' + tripId);
  };

  useEffect(() => {
    const getOffers = async () => {
      try {
        await initDapp();
        let result = await getAvailableOffers();
        setOffers(result);
        subscribeNewTripOffer(
          (event) => {
            if (event.returnValues) {
              setOffers([...offers, event.returnValues]);
            }
          },
          (error) => {
            console.log(error);
            alert(error);
          },
        );

        subscribeStartedTrip(
          (event) => {
            if (event.returnValues) {
              let removedOffers = offers.filter(
                (it) => it.tripId !== event.returnValues.tripId,
              );
              setOffers(removedOffers);
            }
          },
          (error) => {
            console.log(error);
            alert(error);
          },
        );

        subscribeCancelledTrip(
          (event) => {
            if (event.returnValues) {
              let removedOffers = offers.filter(
                (it) => it.tripId !== event.returnValues.tripId,
              );
              setOffers(removedOffers);
            }
          },
          (error) => {
            console.log(error);
            alert(error);
          },
        );
      } catch (err: any) {
        console.log(err);
        alert('Could not get any offers.');
      }
    };

    getOffers();
  }, [offers]);

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
            <TableCell align='center'>Info</TableCell>
            <TableCell align='center'>Meeting Time</TableCell>
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
                <TableCell align='right'>{offer.trip.info}</TableCell>
                <TableCell align='right'>{offer.trip.meetingtime}</TableCell>
                <TableCell align='right'>
                  <Button onClick={() => goToMakeBid(offer.tripId)}>
                    Make bid
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PassengerOffersList;
