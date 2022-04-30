import { Paper, Typography } from "@mui/material";

const TripStatus = (props: { status: "Waiting for acceptance" | "Accepted" | "Started"}) => {
  return (
    <Paper variant="outlined" sx={{ padding: "8px" }}>
      <Typography variant="h5" component="div" align="center">
        { props.status }
      </Typography>
    </Paper>
  );
}

export default TripStatus;