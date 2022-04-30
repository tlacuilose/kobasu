import { Stack, Typography } from "@mui/material";
import React from "react";
import PassengerOffersList from "./components/passengerofferslist";

const PassengerHomeView = () => {
  return (
    <React.Fragment>
      <Stack spacing={2}>
        <Typography variant="h4" component="div">
          Passenger home.
        </Typography>
        <PassengerOffersList />
      </Stack>
    </React.Fragment>
  )
}

export default PassengerHomeView;