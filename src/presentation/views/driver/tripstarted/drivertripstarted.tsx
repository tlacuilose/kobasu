import { Button, Stack, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import TitleWithLeftItem from "../../../global/components/titlewithleftitem";
import AcceptedBidsList from "../waitlist/components/acceptedbidslist";

const DriverTripStartedView = () => {
  return (
    <Stack spacing={2} sx={{ marginTop: "16px"}}>
      <Typography variant="h4" component="div">
        Trip 0x4338498934433823238 has started.
      </Typography>
      <TitleWithLeftItem titleVariant="h5" title="Passengers:">
        <Link to="/driver">
          <Button>Finish</Button>
        </Link>
      </TitleWithLeftItem>
      <AcceptedBidsList />
    </Stack>
  );
}

export default DriverTripStartedView;