import React from "react";
import { Grid, Paper } from "@mui/material";

export interface LayoutProps {
  children: React.ReactNode
}

const PageHalf = (props: LayoutProps) => {
  return (
    <Grid item sm={6} xs={12}>
      <Paper variant="outlined" square
        sx={{
          height: {
            xs: "50vh",
            sm: "100vh"
          }
        }}
      >
        { props.children }
      </Paper>
    </Grid>
  );
};

export default PageHalf;