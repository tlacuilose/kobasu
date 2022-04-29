import { Button, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const DriverLogin = () => {
    return (
      <Stack spacing={2}>
        <Typography variant="h1" component="div">
          Join as a driver
        </Typography>
        <Link to="/driver">
          <Button variant="contained">Join</Button>
        </Link>
      </Stack>
    );
}

export default DriverLogin;