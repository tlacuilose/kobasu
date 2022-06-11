import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { getAcceptedBids } from '../../../../../data/web3/nekobasu';
import { initDapp } from '../../../../../data/web3/web3';

const AcceptedBidsList = (props: { tripId: Number }) => {
  const [bids, setBids] = useState<any[]>([]);

  const getBids = async () => {
    try {
      await initDapp();
      let results = await getAcceptedBids(props.tripId);
      setBids(results);
    } catch (err: any) {
      console.log(err);
      alert('Could not get pending bids');
    }
  };

  useEffect(() => {
    getBids();
  }, []);

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
