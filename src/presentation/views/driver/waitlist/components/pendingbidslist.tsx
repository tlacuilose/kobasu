import { useEffect, useState } from 'react';
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
  acceptBid,
  getPendingBids,
  subscribeNewTripBid,
  subscribeSeatOccupied,
  subscribeWithdrawBid,
} from '../../../../../data/web3/nekobasu';
import { initDapp } from '../../../../../data/web3/web3';

const PendingBidsList = (props: { tripId: Number }) => {
  const [bids, setBids] = useState<any[]>([]);

  const getBids = async () => {
    try {
      await initDapp();
      let results = await getPendingBids(props.tripId);
      setBids(results);
      subscribeNewTripBid(
        (event) => {
          if (event.returnValues) {
            setBids([...bids, event.returnValues]);
          }
        },
        (error) => {
          console.log(error);
          alert(error);
        },
      );

      subscribeSeatOccupied(
        (event) => {
          if (event.returnValues) {
            let removedBid = bids.filter(
              (it) => it.bidId !== event.returnValues.bidId,
            );
            setBids(removedBid);
          }
        },
        (error) => {
          console.log(error);
          alert(error);
        },
      );

      subscribeWithdrawBid(
        (event) => {
          if (event.returnValues) {
            let removedBid = bids.filter(
              (it) => it.bidId !== event.returnValues.bidId,
            );
            setBids(removedBid);
          }
        },
        (error) => {
          console.log(error);
          alert(error);
        },
      );
    } catch (err: any) {
      console.log(err);
      alert('Could not get pending bids');
    }
  };

  const callAcceptBid = async (passenger: string) => {
    try {
      await acceptBid(passenger);
    } catch (err: any) {
      console.log(err);
      alert(err);
    }
  };

  useEffect(() => {
    getBids();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ minWidth: '350px' }}
        aria-label='Bids pending to be accepted by the driver.'
      >
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell align='left'>Passenger</TableCell>
            <TableCell align='left'>Amount</TableCell>
            <TableCell align='left'>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bids.map((bid) => (
            <TableRow
              key={bid.bidId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component='th' scope='row'>
                {bid.bidId}
              </TableCell>
              <TableCell align='left'>{bid.passenger}</TableCell>
              <TableCell align='left'>{bid.bid.amount}</TableCell>
              <TableCell align='left'>
                <Button onClick={() => callAcceptBid(bid.passenger)}>
                  Accept
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PendingBidsList;
