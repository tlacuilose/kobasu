import React from "react";
import { Button, Grid, Stack, Typography } from "@mui/material";

import AcceptedBidsList from "./components/acceptedbidslist";
import PendingBidsList from "./components/pendingbidslist";
import { Link } from "react-router-dom";
import TitleWithLeftItem from "../../../global/components/titlewithleftitem";

const DriverWaitListView = () => {
  return (
    <React.Fragment>
      <Stack spacing={4} sx={{ marginTop: "16px"}}>
        <Typography variant="h4" component="div">
          Waitlist for trip: 0x4338498934433823238
        </Typography>
        <Stack spacing={2} sx={{ marginTop: "16px"}}>
          <TitleWithLeftItem titleVariant="h5" title="Received bids.">
            <Link to="/driver">
              <Button>Revoke offer</Button>
            </Link>
          </TitleWithLeftItem>
          <PendingBidsList />
        </Stack>
        <Stack spacing={2} sx={{ marginTop: "16px"}}>
          <TitleWithLeftItem titleVariant="h5" title="Accepted bids.">
            <Link to="/driver/trip">
              <Button>Start trip</Button>
            </Link>
          </TitleWithLeftItem>
          <AcceptedBidsList />
        </Stack>
      </Stack>
    </React.Fragment>
  );
}

export default DriverWaitListView;
