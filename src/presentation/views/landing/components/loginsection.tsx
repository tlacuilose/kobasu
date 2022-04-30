import React from "react";
import { Button, Grid, Paper, SvgIcon, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { padding } from "@mui/system";

export interface LoginSectionProps {
  icon: React.ElementType<any>,
  callToAction: string,
  linkRoute: string,
}

const LoginSection = (props: LoginSectionProps) => {
  return (
    <Paper variant="outlined" square
      sx={{
        height: {
          md: "100vh"
        },
        padding: {
          md: "50px",
          xs: "32px"
        }
      }}
    >
      <Grid
        container
        spacing={4}
        direction="column"
        alignItems="center"
        justifyItems="center"
      >
        <Grid item xs={3}>
          <SvgIcon component={props.icon} inheritViewBox sx={{ fontSize: "40vh" }} />
        </Grid>
        <Grid item xs={3}>
          <Typography variant="h3" component="div" align="center">
            { props.callToAction }
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Link to={ props.linkRoute }>
            <Button variant="contained">Join</Button>
          </Link>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default LoginSection;;;