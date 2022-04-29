import React from "react";
import { CssBaseline, Grid } from "@mui/material";

import DriverLogin from "./components/driverlogin";
import PageHalf from "./components/pagehalf";
import PassengerLogin from "./components/passengerlogin";


const LandingView = () => {
  return (
    <React.Fragment>
      <CssBaseline />
      <Grid container>
        <PageHalf>
          <DriverLogin />
        </PageHalf>
        <PageHalf>
          <PassengerLogin />
        </PageHalf>
      </Grid>
    </React.Fragment>
  );
}

export default LandingView;