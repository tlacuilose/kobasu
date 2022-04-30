import { CssBaseline, Grid } from "@mui/material";
import React from "react";
import { ReactComponent as DriverHello } from "../../assets/driverhello.svg";
import { ReactComponent as PassengerHello } from "../../assets/passengerhello.svg";
import LoginSection from "./components/loginsection";

const LandingView = () => {
  return (
    <React.Fragment>
      <CssBaseline />
      <Grid container>
        <Grid item md={6} xs={12}>
          <LoginSection icon={DriverHello} callToAction="Join as a driver." linkRoute="/driver"/>
        </Grid>
        <Grid item md={6} xs={12}>
          <LoginSection icon={PassengerHello} callToAction="Join as a passenger." linkRoute="/passenger"/>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default LandingView;