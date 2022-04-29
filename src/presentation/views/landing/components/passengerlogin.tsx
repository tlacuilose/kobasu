import { Button, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const PassengerLogin = () => {
    return (
      <Stack spacing={2}>
        <Typography variant="h1" component="div">
          Join as a passenger
        </Typography>
        <Link to="/passenger">
          <Button variant="contained">Join</Button>
        </Link>
      </Stack>
    );
}

export default PassengerLogin;