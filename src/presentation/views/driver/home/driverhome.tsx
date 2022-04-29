import React from "react";
import { Button, FormControl, Grid, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, Slider, Stack, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const DriverHomeView = () => {
  return (
    <React.Fragment>
      <Typography variant="h4" component="div">
        Driver home
      </Typography>
      <form>
        <Grid container spacing={2} sx={{ marginTop: "16px "}}>
          <Grid item md={8} xs={12}>
            <Stack spacing={2}>
              <FormControl fullWidth>
                <InputLabel htmlFor="offer-from">From:</InputLabel>
                <Select
                  labelId="offer-from"
                  id="offer-from"
                  value="10"
                  /*value={age}*/
                  label="Age"
                  /* onChange={handleChange} */
                >
                  <MenuItem value={10}>Mexico City</MenuItem>
                  <MenuItem value={20}>Puebla</MenuItem>
                  <MenuItem value={30}>Queretaro</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel htmlFor="offer-to">To:</InputLabel>
                <Select
                  labelId="offer-to"
                  id="offer-to"
                  value="10"
                  /*value={age}*/
                  label="Age"
                  /* onChange={handleChange} */
                >
                  <MenuItem value={10}>Mexico City</MenuItem>
                  <MenuItem value={20}>Puebla</MenuItem>
                  <MenuItem value={30}>Queretaro</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <TextField
                  label="Appointment time"
                  type="datetime-local"
                  defaultValue="2017-05-24T10:30"
                  /* better use: https://mui.com/x/react-date-pickers/getting-started/ */
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </FormControl>
              <FormControl fullWidth sx={{ m: 1 }}>
                <Typography gutterBottom>Available seats</Typography>
                <Slider
                  id="offer-seats"
                  aria-label="Available seats"
                  valueLabelDisplay="auto"
                  defaultValue={4}
                  step={1}
                  min={1}
                  max={20}
                  marks
                />
              </FormControl>
              <FormControl fullWidth>
                <InputLabel htmlFor="offer-cost">Cost</InputLabel>
                <OutlinedInput
                  id="offer-cost"
                  value="0"
                  /*value={values.amount}*/
                  /*onChange={handleChange('amount')}*/
                  startAdornment={<InputAdornment position="start">$</InputAdornment>}
                  label="Cost"
                />
              </FormControl>
            </Stack>
          </Grid>
          <Grid item md={4} xs={12}>
            <FormControl fullWidth>
              <Link to="/driver/waitlist">
                <Button variant="outlined">Make offer</Button>
              </Link>
            </FormControl>
          </Grid>
        </Grid>
      </form>
    </React.Fragment>
  )
}

export default DriverHomeView;