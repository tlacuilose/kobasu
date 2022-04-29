import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

function createData(
  account: string,
  amount: number,
) {
  return { account, amount };
}

const acceptedBids = [
  createData("0x939823823828823", 450),
  createData("0x877348473374747", 450),
  createData("0x812378264732666", 450),
]

const AcceptedBidsList = () => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: "350px" }} aria-label="List of bids accepted by the driver.">
        <TableHead>
          <TableRow>
            <TableCell>Account</TableCell>
            <TableCell align="right">Bid amount</TableCell>
            <TableCell align="right">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {acceptedBids.map((bid) => (
            <TableRow
              key={bid.account}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {bid.account}
              </TableCell>
              <TableCell align="right">{bid.amount}</TableCell>
              <TableCell align="right">Accepted</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default AcceptedBidsList;