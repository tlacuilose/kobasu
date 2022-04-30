import React from "react";
import { Button, FormControl, Grid, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, Slider, Stack, TextField, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";

const PassengerMakeBid = () => {
  const { tripId } = useParams();
  return (
    <React.Fragment>
      <Typography variant="h4" component="div">
        Make bid to trip: { tripId }
      </Typography>
      <form>
        <Grid container spacing={2} sx={{ marginTop: "16px "}}>
          <Grid item md={10} xs={12}>
            <Stack spacing={2}>
              <FormControl fullWidth>
                <InputLabel htmlFor="offer-bid">Bid</InputLabel>
                <OutlinedInput
                  id="offer-bid"
                  value="250"
                  /*value={values.amount}*/
                  /*onChange={handleChange('amount')}*/
                  startAdornment={<InputAdornment position="start">$</InputAdornment>}
                  label="Bid"
                />
              </FormControl>
            </Stack>
          </Grid>
          <Grid item md={2} xs={12}>
            <FormControl fullWidth>
              <Link to="/passenger/trip">
                <Button variant="outlined">Make bid</Button>
              </Link>
            </FormControl>
          </Grid>
        </Grid>
      </form>
    </React.Fragment>
  );
}

export default PassengerMakeBid;