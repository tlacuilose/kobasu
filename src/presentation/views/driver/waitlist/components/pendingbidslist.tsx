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

function createData(account: string, amount: number) {
  return { account, amount };
}

const bids = [
  createData('0x239809428390423', 200),
  createData('0x548978293798324', 300),
  createData('0x423875443433485', 250),
  createData('0x629738923782737', 500),
];

const PendingBidsList = () => (
  <TableContainer component={Paper}>
    <Table
      sx={{ minWidth: '350px' }}
      aria-label='Bids pending to be accepted by the driver.'
    >
      <TableHead>
        <TableRow>
          <TableCell>Account</TableCell>
          <TableCell align='right'>Bid amount</TableCell>
          <TableCell align='right'>Action</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {bids.map((bid) => (
          <TableRow
            key={bid.account}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component='th' scope='row'>
              {bid.account}
            </TableCell>
            <TableCell align='right'>{bid.amount}</TableCell>
            <TableCell align='right'>
              <Button>Accept</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default PendingBidsList;
