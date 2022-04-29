import React from "react";
import { CssBaseline, Grid, Paper} from "@mui/material";

import DriverLogin from "./components/driverlogin";
import PassengerLogin from "./components/passengerlogin";
import PageHalf from "./components/pagehalf";

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