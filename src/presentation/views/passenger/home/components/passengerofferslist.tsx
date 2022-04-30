import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Link } from "react-router-dom";

function createData(
  tripId: string,
  cost: number,
  appointmentTime: string
) {
  return { tripId, cost, appointmentTime };
}

const offers = [
  createData("0x239809428390423", 200, new Date().toLocaleString()),
  createData("0x548978293798324", 300, new Date().toLocaleString()),
  createData("0x423875443433485", 250, new Date().toLocaleString()),
  createData("0x629738923782737", 500, new Date().toLocaleString()),
];

const PassengerOffersList = () => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: "350px" }} aria-label="Offers available to a passenger">
        <TableHead>
          <TableRow>
            <TableCell>Trip id</TableCell>
            <TableCell align="right">Cost</TableCell>
            <TableCell align="right">Appointment Time</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {offers.map((offer) => (
            <TableRow
              key={offer.tripId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {offer.tripId}
              </TableCell>
              <TableCell align="right">{offer.cost}</TableCell>
              <TableCell align="right">{offer.appointmentTime}</TableCell>
              <TableCell align="right">
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
}

export default PassengerOffersList;
