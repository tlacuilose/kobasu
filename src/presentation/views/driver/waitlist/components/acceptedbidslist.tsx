import { useEffect, useState } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

import {
  getAcceptedBids,
  subscribeSeatOccupied,
} from '../../../../../data/web3/nekobasu';
import { initDapp } from '../../../../../data/web3/web3';

const AcceptedBidsList = (props: { tripId: Number }) => {
  const [bids, setBids] = useState<any[]>([]);

  useEffect(() => {
    const getBids = async () => {
      try {
        await initDapp();
        let results = await getAcceptedBids(props.tripId);
        setBids(results);
        subscribeSeatOccupied(
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
      } catch (err: any) {
        console.log(err);
        alert('Could not get pending bids');
      }
    };

    getBids();
  }, [bids, props.tripId]);

  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ minWidth: '350px' }}
        aria-label='List of bids accepted by the driver.'
      >
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell align='left'>Passenger</TableCell>
            <TableCell align='left'>Amount</TableCell>
            <TableCell align='left'>Status</TableCell>
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
              <TableCell align='left'>{bid.bid.passenger}</TableCell>
              <TableCell align='left'>{bid.bid.amount}</TableCell>
              <TableCell align='left'>Accepted</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AcceptedBidsList;
